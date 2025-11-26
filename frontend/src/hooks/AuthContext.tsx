import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { setClientAccessToken } from "../api/client";
import {
  getRefreshToken,
  deleteRefreshToken,
  saveRefreshToken,
} from "../services/tokenStorage";
import { UserDto, LoginResponseDto, ApiResponse } from "../types/dto";
import apiClient from "../api/client";

interface AuthContextType {
  token: string | null;
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  // Function to set token in state and in Axios client
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    setClientAccessToken(newToken);
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    setToken(null);
    await deleteRefreshToken();
  };

  // Run checkAuthStatus on component mount with cleanup to prevent memory leaks
  useEffect(() => {
    let mounted = true;

    const checkAuthStatus = async () => {
      try {
        const storedRefreshToken = await getRefreshToken();
        if (storedRefreshToken) {
          // Attempt to refresh token
          const response = await apiClient.post<ApiResponse<LoginResponseDto>>(
            "/auth/refresh",
            {
              refreshToken: storedRefreshToken,
            }
          );
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.data;

          if (!mounted) return;
          setToken(newAccessToken);
          await saveRefreshToken(newRefreshToken);

          // Fetch user profile after successful refresh
          const profileResponse =
            await apiClient.get<ApiResponse<UserDto>>("/user");
          if (!mounted) return;
          setUser(profileResponse.data.data);
        }
      } catch (error) {
        console.error(
          "Failed to refresh token or fetch profile on startup:",
          error
        );
        if (mounted) {
          logout(); // Clear any stale tokens
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuthStatus();

    return () => {
      mounted = false;
    };
  }, []);

  const value = {
    token,
    setToken,
    user,
    setUser,
    logout,
    isLoading, // Provide isLoading through context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

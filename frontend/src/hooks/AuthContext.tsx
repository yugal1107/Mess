import React, { createContext, useState, useContext, ReactNode } from "react";
import { setClientAccessToken } from "../api/client";
import { deleteRefreshToken } from "../services/tokenStorage";
import { UserDto } from "../types/dto"; // Import UserDto

interface AuthContextType {
  token: string | null;
  user: UserDto | null; // Use UserDto here
  setUser: (user: UserDto | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserDto | null>(null); // Use UserDto here

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    setClientAccessToken(newToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      await deleteRefreshToken();
    } catch (error) {
      console.error("Failed to delete refresh token:", error);
      // Token deletion failed, but user is already logged out locally
      // Consider whether to notify the user or retry
    }
  };

  const value = {
    token,
    setToken,
    user,
    setUser,
    logout,
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

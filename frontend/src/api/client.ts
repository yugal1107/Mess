import axios from "axios";
import {
  getRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
} from "../services/tokenStorage";

// --- Axios Instance ---
const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Token Management ---
// This is a simple in-memory store for the accessToken.
// In a real app, you might use a state management library, but for this,
// a simple variable is fine since it's managed by the AuthContext.
let accessToken: string | null = null;

export const setClientAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// --- Forbidden Handler ---
// Registered by AuthContext so the client can trigger logout on 403 responses.
let forbiddenHandler: (() => void) | null = null;

export const setForbiddenHandler = (handler: () => void) => {
  forbiddenHandler = handler;
};

// --- Interceptors ---

// 1. Request Interceptor to add the token to every request
apiClient.interceptors.request.use(
  (config) => {
    if (accessToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// A flag to prevent multiple token refresh requests
let isRefreshing = false;
// A queue to hold requests that failed while the token was being refreshed
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. Response Interceptor to handle 401 errors and refresh the token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we are already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        // No refresh token, logout user
        // This part will be handled by navigating to login in the UI
        return Promise.reject(error);
      }

      try {
        // Send refresh token in request body for mobile compatibility
        const refreshResponse = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );

        // Backend wraps response in ApiResponse { data: { id, accessToken, refreshToken } }
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data.data;

        // Save new tokens
        await saveRefreshToken(newRefreshToken);
        setClientAccessToken(newAccessToken);

        // Update the header of the original request and retry it
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        await deleteRefreshToken();
        setClientAccessToken(null);
        processQueue(refreshError, null);
        // This part will be handled by navigating to login in the UI
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle 403 Forbidden - user doesn't have permission (wrong role)
    if (error.response?.status === 403) {
      await deleteRefreshToken();
      setClientAccessToken(null);
      forbiddenHandler?.();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

import apiClient from "./client";
import {
  UserDto,
  UserListDto,
  SubscriptionDto,
  SubscriptionStatus,
  SubscriptionType,
} from "../types/dto";

// Fetch all users with optional subscription status and type filters
export const fetchAllUsers = async (
  status?: SubscriptionStatus,
  type?: SubscriptionType
): Promise<UserListDto> => {
  const params: Record<string, string> = {};
  if (status) params.status = status;
  if (type) params.type = type;
  const response = await apiClient.get("/user/all", { params });
  return response.data.data;
};

// Search users by name
export const searchUsersByName = async (name: string): Promise<UserListDto> => {
  const response = await apiClient.get(`/user/search/${encodeURIComponent(name)}`);
  return response.data.data;
};

export const fetchUserById = async (userId: string): Promise<UserDto> => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data.data;
};

export const fetchUserSubscription = async (
  userId: string
): Promise<SubscriptionDto | null> => {
  try {
    const response = await apiClient.get(`/subscription/${userId}`);
    return response.data.data;
  } catch (error: any) {
    // User might not have a subscription
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

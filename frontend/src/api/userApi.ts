import apiClient from "./client";
import {
  UserDto,
  UserListDto,
  SubscriptionDto,
  SubscriptionStatus,
} from "../types/dto";

// Fetch all users with optional subscription status filter
export const fetchAllUsers = async (
  status?: SubscriptionStatus
): Promise<UserListDto> => {
  const params = status ? { status } : {};
  const response = await apiClient.get("/user/all", { params });
  console.log("Fetched users:", response.data);
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

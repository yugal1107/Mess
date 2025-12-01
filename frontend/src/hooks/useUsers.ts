// src/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import {
  UserDto,
  UserListDto,
  SubscriptionDto,
  SubscriptionStatus,
} from "../types/dto";

// --- API Functions ---

// Fetch all users with optional subscription status filter
const fetchAllUsers = async (
  status?: SubscriptionStatus
): Promise<UserListDto> => {
  const params = status ? { status } : {};
  const response = await apiClient.get("/user/all", { params });
  console.log("Fetched users:", response.data);
  return response.data.data;
};

const fetchUserById = async (userId: string): Promise<UserDto> => {
  const response = await apiClient.get(`/user/${userId}`);
  return response.data.data;
};

const fetchUserSubscription = async (
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

// --- Custom Hooks ---

/**
 * Fetch all users with optional subscription status filter
 * @param status - Optional filter: "ACTIVE" | "INACTIVE" | "REQUESTED"
 */
export const useUsers = (status?: SubscriptionStatus) => {
  return useQuery({
    queryKey: ["users", status],
    queryFn: () => fetchAllUsers(status),
  });
};

/**
 * Fetch users with REQUESTED subscription status (for admin approval)
 */
export const useSubscriptionRequests = () => {
  return useUsers("REQUESTED");
};

export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  });
};

export const useUserSubscription = (userId: string) => {
  return useQuery({
    queryKey: ["userSubscription", userId],
    queryFn: () => fetchUserSubscription(userId),
    enabled: !!userId,
  });
};

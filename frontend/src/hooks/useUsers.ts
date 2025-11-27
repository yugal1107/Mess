// src/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";
import { UserDto, SubscriptionDto } from "../types/dto";

// --- API Functions ---
const fetchAllUsers = async (): Promise<UserDto[]> => {
  const response = await apiClient.get("/user/all");
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
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
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

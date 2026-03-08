// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as UserApi from "../api/userApi";
import * as SubscriptionApi from "../api/subscriptionApi";
import { SubscriptionStatus, UpdateMealCountRequestDto } from "../types/dto";

// --- Custom Hooks ---

/**
 * Fetch all users with optional subscription status filter
 * @param status - Optional filter: "ACTIVE" | "INACTIVE" | "REQUESTED"
 */
export const useUsers = (status?: SubscriptionStatus) => {
  return useQuery({
    queryKey: ["users", status],
    queryFn: () => UserApi.fetchAllUsers(status),
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
    queryFn: () => UserApi.fetchUserById(userId),
    enabled: !!userId,
  });
};

export const useUserSubscription = (userId: string) => {
  return useQuery({
    queryKey: ["userSubscription", userId],
    queryFn: () => UserApi.fetchUserSubscription(userId),
    enabled: !!userId,
  });
};

export const useUpdateSubscription = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMealCountRequestDto) =>
      SubscriptionApi.updateSubscriptionByUserId(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSubscription", userId] });
    },
  });
};

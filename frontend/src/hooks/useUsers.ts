// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as UserApi from "../api/userApi";
import * as SubscriptionApi from "../api/subscriptionApi";
import { SubscriptionStatus, SubscriptionType, UpdateMealCountRequestDto } from "../types/dto";

// --- Custom Hooks ---

/**
 * Fetch all users with optional subscription status and type filters.
 * Note: type filter only applies server-side when status is ACTIVE.
 */
export const useUsers = (status?: SubscriptionStatus, type?: SubscriptionType) => {
  return useQuery({
    queryKey: ["users", status, type],
    queryFn: () => UserApi.fetchAllUsers(status, type),
  });
};

/**
 * Search users by name using the backend search endpoint.
 * Only fires when name is non-empty.
 */
export const useSearchUsers = (name: string) => {
  return useQuery({
    queryKey: ["usersSearch", name],
    queryFn: () => UserApi.searchUsersByName(name),
    enabled: name.trim().length > 0,
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

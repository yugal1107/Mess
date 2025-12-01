// src/hooks/useSubscription.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import apiClient from "../api/client";
import { SubscriptionDto } from "../types/dto";

// --- API Functions ---
const fetchSubscriptionDetails = async (): Promise<SubscriptionDto | null> => {
  try {
    const response = await apiClient.get("/subscription");
    return response.data.data;
  } catch (error) {
    // It's common for a user to not have a subscription, so we handle this gracefully
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error; // Re-throw other errors
  }
};

const requestNewSubscription = (type: string) => {
  return apiClient.post(`/subscription/request-new-subscription/${type}`);
};

const acceptSubscriptionRequest = (userId: string) => {
  return apiClient.post(`/subscription/requests/${userId}`);
};

// --- Custom Hooks ---
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptionDetails,
  });
};

export const useRequestSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestNewSubscription,
    onSuccess: () => {
      // When a new subscription is requested, invalidate the main subscription query
      // to refetch the status (which should now be 'REQUESTED').
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
};

export const useAcceptSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptSubscriptionRequest,
    onSuccess: () => {
      // After accepting a request, invalidate users list with REQUESTED filter
      // so the approved user is removed from the list.
      queryClient.invalidateQueries({ queryKey: ["users", "REQUESTED"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// src/hooks/useSubscription.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as SubscriptionApi from "../api/subscriptionApi";

// --- Custom Hooks ---
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: SubscriptionApi.fetchSubscriptionDetails,
  });
};

export const useRequestSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SubscriptionApi.requestNewSubscription,
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
    mutationFn: SubscriptionApi.acceptSubscriptionRequest,
    onSuccess: () => {
      // After accepting a request, invalidate users list with REQUESTED filter
      // so the approved user is removed from the list.
      queryClient.invalidateQueries({ queryKey: ["users", "REQUESTED"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

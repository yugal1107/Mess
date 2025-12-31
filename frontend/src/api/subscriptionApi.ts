import { isAxiosError } from "axios";
import apiClient from "./client";
import { SubscriptionDto } from "../types/dto";

export const fetchSubscriptionDetails =
  async (): Promise<SubscriptionDto | null> => {
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

export const requestNewSubscription = (type: string) => {
  return apiClient.post(`/subscription/request-new-subscription/${type}`);
};

export const acceptSubscriptionRequest = (userId: string) => {
  return apiClient.post(`/subscription/requests/${userId}`);
};

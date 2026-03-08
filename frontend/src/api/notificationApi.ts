import apiClient from "./client";
import { NotificationDto, NotificationType } from "../types/dto";

export const fetchNotifications = async (
  type?: NotificationType
): Promise<NotificationDto[]> => {
  const response = await apiClient.get("/notification", {
    params: type ? { type } : undefined,
  });
  return response.data.data;
};

import apiClient from "./client";
import { NotificationDto } from "../types/dto";

export const fetchNotifications = async (): Promise<NotificationDto[]> => {
  const response = await apiClient.get("/notification");
  return response.data.data;
};

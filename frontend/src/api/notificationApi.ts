import apiClient from "./client";
import { NotificationDto, NotificationType, AnnouncementDto } from "../types/dto";

export const fetchNotifications = async (
  type?: NotificationType
): Promise<NotificationDto[]> => {
  const response = await apiClient.get("/notification", {
    params: type ? { type } : undefined,
  });
  return response.data.data;
};

export const createAnnouncement = async (dto: AnnouncementDto) => {
  const response = await apiClient.post("/notification/announcement", dto);
  return response.data;
};

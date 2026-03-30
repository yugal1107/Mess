// src/hooks/useNotifications.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as NotificationApi from "../api/notificationApi";
import { NotificationDto, NotificationType, AnnouncementDto } from "../types/dto";

// --- Custom Hooks ---
export const useNotifications = (type?: NotificationType) => {
  return useQuery({
    queryKey: ["notifications", type ?? "ALL"],
    queryFn: () => NotificationApi.fetchNotifications(type),
    // Refetch notifications every 30 seconds to keep them updated
    refetchInterval: 30000,
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AnnouncementDto) => NotificationApi.createAnnouncement(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// Helper to count unread notifications
export const getUnreadCount = (
  notifications: NotificationDto[] | undefined
): number => {
  if (!notifications) return 0;
  return notifications.filter((n) => !n.isRead).length;
};

// src/hooks/useNotifications.ts
import { useQuery } from "@tanstack/react-query";
import * as NotificationApi from "../api/notificationApi";
import { NotificationDto } from "../types/dto";

// --- Custom Hooks ---
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: NotificationApi.fetchNotifications,
    // Refetch notifications every 30 seconds to keep them updated
    refetchInterval: 30000,
  });
};

// Helper to count unread notifications
export const getUnreadCount = (
  notifications: NotificationDto[] | undefined
): number => {
  if (!notifications) return 0;
  return notifications.filter((n) => !n.isRead).length;
};

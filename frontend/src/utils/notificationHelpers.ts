import { NotificationDto } from "../types/dto";

export interface NotificationSection {
  title: string;
  data: NotificationDto[];
}

export const groupNotifications = (
  notifications: NotificationDto[] | undefined
): NotificationSection[] => {
  if (!notifications || notifications.length === 0) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);

  const groups: Record<string, NotificationDto[]> = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    Older: [],
  };

  notifications.forEach((notification) => {
    const date = new Date(notification.timestamp);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      groups["Today"].push(notification);
    } else if (date.getTime() === yesterday.getTime()) {
      groups["Yesterday"].push(notification);
    } else if (date.getTime() > weekAgo.getTime()) {
      groups["This Week"].push(notification);
    } else {
      groups["Older"].push(notification);
    }
  });

  return [
    { title: "Today", data: groups["Today"] },
    { title: "Yesterday", data: groups["Yesterday"] },
    { title: "This Week", data: groups["This Week"] },
    { title: "Older", data: groups["Older"] },
  ].filter((section) => section.data.length > 0);
};

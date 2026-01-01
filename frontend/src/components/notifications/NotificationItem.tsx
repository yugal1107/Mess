import { View } from "react-native";
import { Text, Card, useTheme, Divider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NotificationDto } from "../../types/dto";

// Helper to format timestamp
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Get icon based on notification type
const getNotificationIcon = (
  type: NotificationDto["type"]
): { name: "alert-circle" | "food" | "bell"; color: string } => {
  switch (type) {
    case "SUBSCRIPTION_EXPIRY":
      return { name: "alert-circle", color: "#ed1010ff" };
    case "MEAL_UPDATE":
      return { name: "bell", color: "#f26900ff" };
    case "GENERAL":
    default:
      return { name: "bell", color: "#9b59b6" };
  }
};

interface NotificationItemProps {
  item: NotificationDto;
}

export default function NotificationItem({ item }: NotificationItemProps) {
  const theme = useTheme();
  const icon = getNotificationIcon(item.type);

  return (
    <View>
      <Card
        mode="contained"
        className="rounded-none border-none"
        style={
          !item.isRead
            ? { backgroundColor: theme.colors.primaryContainer }
            : { backgroundColor: theme.colors.surface }
        }
      >
        <Card.Content className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full justify-center items-center mr-3"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <MaterialCommunityIcons
              name={icon.name}
              size={20}
              color={theme.colors.onPrimary}
            />
          </View>
          <View className="flex-1">
            <Text
              variant="bodyMedium"
              className={`mb-1 ${!item.isRead ? "font-bold" : ""}`}
            >
              {item.message}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
          {!item.isRead && (
            <View
              className="w-2.5 h-2.5 rounded-full ml-2"
              style={{ backgroundColor: theme.colors.primary }}
            />
          )}
        </Card.Content>
      </Card>
      <Divider />
    </View>
  );
}

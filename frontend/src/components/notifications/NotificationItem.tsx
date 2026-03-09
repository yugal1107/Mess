import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NotificationDto, NotificationType } from "../../types/dto";

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

// --- Type config ---
interface TypeConfig {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconBg: string;
  label: string;
}

const TYPE_CONFIG: Record<NotificationType, TypeConfig> = {
  SUBSCRIPTION_EXPIRY: {
    iconName: "alert-circle",
    iconBg: "#c0392b",
    label: "Subscription",
  },
  MEAL_COUNT: {
    iconName: "counter",
    iconBg: "#2980b9",
    label: "Meal Count",
  },
  MEAL_UPDATE: {
    iconName: "food",
    iconBg: "#e67e22",
    label: "Meal Update",
  },
  MEAL_OFF: {
    iconName: "food-off",
    iconBg: "#d4a017",
    label: "Meal Off",
  },
  ANNOUNCEMENT: {
    iconName: "bullhorn",
    iconBg: "#8e44ad",
    label: "Announcement",
  },
  ADMIN_UPDATE: {
    iconName: "shield-account",
    iconBg: "#16a085",
    label: "Admin Update",
  },
};

const getFallbackConfig = (): TypeConfig => ({
  iconName: "bell",
  iconBg: "#7f8c8d",
  label: "Notification",
});

interface NotificationItemProps {
  item: NotificationDto;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function NotificationItem({
  item,
  isFirst,
  isLast,
}: NotificationItemProps) {
  const theme = useTheme();
  const config = TYPE_CONFIG[item.type] ?? getFallbackConfig();

  const largeRadius = 16;
  const smallRadius = 4;

  return (
    <View
      style={{
        backgroundColor: !item.isRead
          ? theme.colors.primaryContainer
          : theme.colors.surface,
        borderTopLeftRadius: isFirst ? largeRadius : smallRadius,
        borderTopRightRadius: isFirst ? largeRadius : smallRadius,
        borderBottomLeftRadius: isLast ? largeRadius : smallRadius,
        borderBottomRightRadius: isLast ? largeRadius : smallRadius,
        marginBottom: 2,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: !item.isRead
          ? theme.colors.primary
          : theme.colors.surfaceVariant,
        borderLeftWidth: !item.isRead ? 4 : 1,
      }}
    >
      {/* Icon avatar */}
      <View
        className="w-10 h-10 rounded-full justify-center items-center mr-3"
        style={{ backgroundColor: config.iconBg }}
      >
        <MaterialCommunityIcons
          name={config.iconName}
          size={20}
          color="#ffffff"
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        {/* Type badge */}
        <View
          className="self-start px-2 py-0.5 rounded-full mb-1"
          style={{ backgroundColor: theme.colors.secondaryContainer }}
        >
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.onSecondaryContainer }}
          >
            {config.label}
          </Text>
        </View>

        {/* Message */}
        <Text
          variant="bodyMedium"
          className={`mb-1 ${!item.isRead ? "font-bold" : ""}`}
          style={{
            color: !item.isRead
              ? theme.colors.onPrimaryContainer
              : theme.colors.onSurface,
          }}
        >
          {item.message}
        </Text>

        {/* Timestamp */}
        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>

      {/* Unread dot */}
      {!item.isRead && (
        <View
          className="w-2.5 h-2.5 rounded-full ml-2"
          style={{ backgroundColor: theme.colors.primary }}
        />
      )}
    </View>
  );
}

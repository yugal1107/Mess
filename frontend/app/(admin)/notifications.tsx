import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Card,
  ActivityIndicator,
  useTheme,
  Icon,
} from "react-native-paper";
import { useNotifications } from "../../src/hooks/useNotifications";
import { NotificationDto } from "../../src/types/dto";

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
): { name: string; color: string } => {
  switch (type) {
    case "SUBSCRIPTION_EXPIRY":
      return { name: "alert-circle", color: "#ed1010ff" };
    case "MEAL_UPDATE":
      return { name: "food", color: "#f26900ff" };
    case "GENERAL":
    default:
      return { name: "bell", color: "#9b59b6" };
  }
};

const NotificationItem = ({ item }: { item: NotificationDto }) => {
  const theme = useTheme();
  const icon = getNotificationIcon(item.type);

  return (
    <Card
      style={[
        styles.card,
        !item.isRead && {
          backgroundColor: theme.colors.primaryContainer,
        },
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: icon.color }]}>
          <Icon source={icon.name} size={20} color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="bodyMedium"
            style={[styles.message, !item.isRead && styles.unreadText]}
          >
            {item.message}
          </Text>
          <Text variant="bodySmall" style={styles.timestamp}>
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
        {!item.isRead && <View style={styles.unreadDot} />}
      </Card.Content>
    </Card>
  );
};

export default function NotificationsScreen() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
    refetch,
  } = useNotifications();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Failed to load notifications: {error?.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Notifications
      </Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon source="bell-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginVertical: 15,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: "bold",
  },
  timestamp: {
    color: "#888",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    color: "#888",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useNotifications } from "../../src/hooks/useNotifications";
import Loading from "@/src/components/common/Loading";
import Container from "@/src/components/common/Container";
import EmptyState from "@/src/components/common/EmptyState";
import { NotificationItem } from "@/src/components/notifications";

export default function NotificationsScreen() {
  const theme = useTheme();
  const {
    data: notifications,
    isLoading,
    isError,
    error,
    refetch,
  } = useNotifications();

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <Container className="justify-center items-center">
        <Text className="text-center" style={{ color: theme.colors.error }}>
          Failed to load notifications: {error?.message}
        </Text>
      </Container>
    );
  }

  return (
    <Container className="p-0">
      {/* <Text variant="headlineMedium" className="text-center my-4">
        Notifications
      </Text> */}
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.timestamp}-${index}`}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerClassName="px-2 pb-5"
        ListEmptyComponent={
          <EmptyState icon="bell-off-outline" message="No notifications yet" />
        }
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </Container>
  );
}

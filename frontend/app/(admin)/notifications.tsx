import { useMemo, useState } from "react";
import { SectionList, ScrollView, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";
import { useNotifications } from "../../src/hooks/useNotifications";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import NotificationItem from "../../src/components/notifications/NotificationItem";
import { NotificationType } from "../../src/types/dto";
import { groupNotifications } from "../../src/utils/notificationHelpers";

// --- Filter chip definitions ---
interface FilterOption {
  label: string;
  value: NotificationType | undefined;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All", value: undefined },
  { label: "Subscription", value: "SUBSCRIPTION_EXPIRY" },
  { label: "Meal Update", value: "MEAL_UPDATE" },
  { label: "Meal Count", value: "MEAL_COUNT" },
  { label: "Meal Off", value: "MEAL_OFF" },
  { label: "Announcements", value: "ANNOUNCEMENT" },
  { label: "Admin", value: "ADMIN_UPDATE" },
];

export default function NotificationsScreen() {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState<NotificationType | undefined>(undefined);

  const {
    data: notifications,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useNotifications(activeFilter);

  const groupedNotifications = useMemo(
    () => groupNotifications(notifications ?? []),
    [notifications]
  );

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <Container className="justify-center items-center" edges={["top"]}>
        <Text className="text-center" style={{ color: theme.colors.error }}>
          Failed to load notifications: {error?.message}
        </Text>
      </Container>
    );
  }

  return (
    <Container className="pt-5" edges={["top"]} heading="Notifications">
      {/* Filter chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 12,
            alignItems: "center",
          }}
          style={{ flexGrow: 0 }}
        >
          {FILTER_OPTIONS.map((option) => {
          const isSelected = activeFilter === option.value;
          return (
            <Chip
              key={option.label}
              selected={isSelected}
              onPress={() => setActiveFilter(option.value)}
              style={{
                marginRight: 8,
                borderWidth: isSelected ? 0 : 1,
                borderColor: theme.colors.outline,
              }}
              showSelectedOverlay
            >
              {option.label}
            </Chip>
          );
        })}
        </ScrollView>
      </View>

      {/* Notification list */}
      <View className="px-2.5 flex-1">
        <SectionList
          sections={groupedNotifications}
          keyExtractor={(item, index) => `${item.timestamp}-${index}`}
          renderItem={({ item, index, section }) => (
            <NotificationItem
              item={item}
              isFirst={index === 0}
              isLast={index === section.data.length - 1}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.primary,
                marginTop: 16,
                marginBottom: 8,
                marginLeft: 4,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
          )}
          ListEmptyComponent={
            <EmptyState icon="bell-off-outline" message="No notifications yet" />
          }
          onRefresh={refetch}
          refreshing={isFetching}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </Container>
  );
}

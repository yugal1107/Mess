import { useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Chip, useTheme, Badge } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUsers } from "../../src/hooks/useUsers";
import { SubscriptionStatus } from "../../src/types/dto";
import { UserListItem } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import ErrorScreen from "../../src/components/common/ErrorScreen";

type FilterOption = SubscriptionStatus | "ALL";

interface FilterConfig {
  label: string;
  value: FilterOption;
}

const FILTER_CONFIG: FilterConfig[] = [
  { label: "All Users", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Inactive", value: "INACTIVE" },
];

export default function AllUsersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("ALL");

  const statusFilter = selectedFilter === "ALL" ? undefined : selectedFilter;
  const { data, isLoading, isError, error, refetch } = useUsers(statusFilter);

  const handleUserPress = (userId: string) => {
    router.push(`/(admin)/user/${userId}`);
  };

  const handleFilterPress = (filter: FilterOption) => {
    setSelectedFilter(filter);
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <ErrorScreen
        message={error?.message || "Failed to load users"}
        onRetry={refetch}
      />
    );
  }

  return (
    <Container className="px-2.5 pt-5" edges={["top"]} heading="Users">

      {/* Filter Section */}
      <View className="mb-4 flex-row flex-wrap gap-2 px-1">
        {FILTER_CONFIG.map((option) => (
          <Chip
            key={option.value}
            selected={selectedFilter === option.value}
            onPress={() => handleFilterPress(option.value)}
            showSelectedOverlay
            mode="outlined"
            style={{
              backgroundColor:
                selectedFilter === option.value
                  ? theme.colors.primaryContainer
                  : theme.colors.surface,
            }}
          >
            {option.label}
          </Chip>
        ))}
      </View>

      {/* User Count Badge */}
      <View className="px-1 mb-3 flex-row items-center">
        <Badge
          style={{
            backgroundColor: theme.colors.primaryContainer,
            color: theme.colors.onPrimaryContainer,
          }}
        >
          {data?.count ?? 0}
        </Badge>
        <Text
          variant="bodyMedium"
          className="ml-2"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          user{data?.count !== 1 ? "s" : ""} found
        </Text>
      </View>

      {/* User List */}
      <FlatList
        data={data?.userList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <UserListItem
            id={item.id}
            name={item.name}
            email={item.email}
            role={item.role}
            isFirst={index === 0}
            isLast={index === (data?.userList?.length ?? 0) - 1}
            onPress={handleUserPress}
          />
        )}
        ListEmptyComponent={
          <View className="mt-8">
            <EmptyState
              icon="account-group-outline"
              message={
                selectedFilter === "ALL"
                  ? "No users found in the system"
                  : `No ${selectedFilter.toLowerCase()} users found`
              }
            />
          </View>
        }
      />
    </Container>
  );
}

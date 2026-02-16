import { useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Chip, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUsers } from "../../src/hooks/useUsers";
import { SubscriptionStatus } from "../../src/types/dto";
import { UserListItem } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import ErrorScreen from "../../src/components/common/ErrorScreen";

type FilterOption = SubscriptionStatus | "ALL";

const FILTER_OPTIONS: { label: string; value: FilterOption }[] = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Inactive", value: "INACTIVE" },
];

export default function AllUsersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("ALL");

  // Pass undefined for "ALL" to get all users, otherwise pass the status
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
    <Container className="px-2.5 pt-5" edges={["top"]}>
      <Text variant="headlineLarge" className="my-4 mx-5">
        Users
      </Text>
      {/* Filter Chips */}
      <View className="flex-row flex-wrap gap-2 mb-4 px-1">
        {FILTER_OPTIONS.map((option) => (
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

      {/* User Count */}
      <Text
        variant="bodySmall"
        className="px-1 mb-2"
        style={{ color: theme.colors.outline }}
      >
        {data?.count ?? 0} user{data?.count !== 1 ? "s" : ""} found
      </Text>

      {/* User List */}
      <FlatList
        data={data?.userList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
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
          <EmptyState
            icon="account-group-outline"
            message={
              selectedFilter === "ALL"
                ? "No users found."
                : `No ${selectedFilter.toLowerCase()} users found.`
            }
          />
        }
      />
    </Container>
  );
}

import React from "react";
import { View, FlatList } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { UserListDto } from "../../../types/dto";
import UserListItem from "../UserListItem";
import Loading from "../../common/Loading";
import EmptyState from "../../common/EmptyState";
import { useRouter } from "expo-router";

interface MealOffUserListProps {
  data: UserListDto | undefined;
  isLoading: boolean;
  emptyMessage: string;
  onRefresh: () => void;
  refreshing: boolean;
  onCancel?: (userId: string) => void;
}

export default function MealOffUserList({
  data,
  isLoading,
  emptyMessage,
  onRefresh,
  refreshing,
  onCancel,
}: MealOffUserListProps) {
  const theme = useTheme();
  const router = useRouter();

  if (isLoading && !refreshing) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      {data && data.count > 0 && (
        <View className="px-4 py-2">
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Total Count: {data.count}
          </Text>
        </View>
      )}
      <FlatList
        data={data?.userList || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserListItem
            id={item.id}
            name={item.name}
            email={item.email}
            role={item.role}
            onPress={(id) => router.push(`/(admin)/user/${id}`)}
            rightContent={
              onCancel ? (
                <View style={{ justifyContent: "center", paddingRight: 8 }}>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.errorContainer}
                    textColor={theme.colors.error}
                    compact
                    onPress={(e) => {
                      e.stopPropagation();
                      onCancel(item.id);
                    }}
                    accessibilityLabel={`Cancel meal off for ${item.name}`}
                    accessibilityRole="button"
                  >
                    Cancel
                  </Button>
                </View>
              ) : undefined
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState message={emptyMessage} icon="food-off" />
          ) : null
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
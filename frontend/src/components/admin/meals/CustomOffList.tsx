import React from "react";
import { View, FlatList } from "react-native";
import { useAllCustomOffs } from "../../../hooks/useMealOff";
import Loading from "../../common/Loading";
import EmptyState from "../../common/EmptyState";
import CustomOffCard from "./CustomOffCard";

export default function CustomOffList() {
  const { data, isLoading, refetch, isRefetching } = useAllCustomOffs();

  if (isLoading && !isRefetching) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.user.id}
        renderItem={({ item }) => <CustomOffCard item={item} />}
        contentContainerStyle={{
          paddingVertical: 8,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              message="No custom meal offs found"
              icon="calendar-check"
            />
          ) : null
        }
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}

import React from "react";
import { useAllLunchOffs } from "../../../hooks/useMealOff";
import MealOffUserList from "./MealOffUserList";

export default function LunchOffList() {
  const { data, isLoading, refetch, isRefetching } = useAllLunchOffs();

  return (
    <MealOffUserList
      data={data}
      isLoading={isLoading}
      emptyMessage="No lunch offs for today"
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  );
}

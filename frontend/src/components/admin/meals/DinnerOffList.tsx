import React from "react";
import { useAllDinnerOffs } from "../../../hooks/useMealOff";
import MealOffUserList from "./MealOffUserList";

export default function DinnerOffList() {
  const { data, isLoading, refetch, isRefetching } = useAllDinnerOffs();

  return (
    <MealOffUserList
      data={data}
      isLoading={isLoading}
      emptyMessage="No dinner offs for today"
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  );
}

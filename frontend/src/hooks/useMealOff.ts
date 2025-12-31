import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as MealOffApi from "../api/mealOffApi";

// --- Custom Hooks ---
export const useTodayMealOff = () => {
  return useQuery({
    queryKey: ["todayMealOff"],
    queryFn: MealOffApi.fetchTodayMealOff,
  });
};

export const useCustomMealOff = () => {
  return useQuery({
    queryKey: ["customMealOff"],
    queryFn: MealOffApi.fetchCustomMealOff,
  });
};

export const useToggleMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MealOffApi.toggleMeal,
    onSuccess: () => {
      // Invalidate today's meal off query to refetch the status
      queryClient.invalidateQueries({ queryKey: ["todayMealOff"] });
    },
  });
};

export const useSetCustomMealOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MealOffApi.setCustomMealOff,
    onSuccess: () => {
      // Invalidate the custom meal off query to refetch the status
      queryClient.invalidateQueries({ queryKey: ["customMealOff"] });
    },
  });
};

export const useCancelCustomMealOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MealOffApi.cancelCustomMealOff,
    onSuccess: () => {
      // Invalidate the custom meal off query to refetch the status
      queryClient.invalidateQueries({ queryKey: ["customMealOff"] });
    },
  });
};

// --- Admin Hooks ---

export const useAllLunchOffs = () => {
  return useQuery({
    queryKey: ["allLunchOffs"],
    queryFn: MealOffApi.fetchAllLunchOffs,
  });
};

export const useAllDinnerOffs = () => {
  return useQuery({
    queryKey: ["allDinnerOffs"],
    queryFn: MealOffApi.fetchAllDinnerOffs,
  });
};

export const useAllCustomOffs = () => {
  return useQuery({
    queryKey: ["allCustomOffs"],
    queryFn: MealOffApi.fetchAllCustomOffs,
  });
};

export const useCustomOffDetailsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["customOffDetails", userId],
    queryFn: () => MealOffApi.fetchCustomOffDetailsByUserId(userId),
    enabled: !!userId,
  });
};

export const useCancelCustomOffByUserId = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MealOffApi.cancelCustomOffByUserId,
    onSuccess: (_, userId) => {
      // Invalidate the specific user's custom off details and the list of all custom offs
      queryClient.invalidateQueries({
        queryKey: ["customOffDetails", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["allCustomOffs"] });
    },
  });
};

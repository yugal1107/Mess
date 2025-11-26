// src/hooks/useMealOff.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/client";
import { TodayMealOffDto, CustomMealOffDto } from "../types/dto";

// --- API Functions ---
const fetchTodayMealOff = async (): Promise<TodayMealOffDto> => {
  const response = await apiClient.get("/mealoff/today");
  return response.data.data;
};

const fetchCustomMealOff = async (): Promise<CustomMealOffDto> => {
  const response = await apiClient.get("/mealoff/custom");
  return response.data.data;
};

// Set meal off (turn OFF the meal)
const setMealOff = (meal: "lunch" | "dinner") => {
  return apiClient.post(`/mealoff/${meal}`);
};

// Reverse meal off (turn meal back ON)
const reverseMealOff = (meal: "lunch" | "dinner") => {
  return apiClient.post(`/mealoff/reverse_${meal}`);
};

// Toggle meal based on current state
const toggleMeal = ({
  meal,
  currentlyOff,
}: {
  meal: "lunch" | "dinner";
  currentlyOff: boolean;
}) => {
  if (currentlyOff) {
    // Meal is currently off, reverse it (turn it back on)
    return reverseMealOff(meal);
  } else {
    // Meal is currently on, set it off
    return setMealOff(meal);
  }
};

const setCustomMealOff = (data: {
  startDate: string;
  endDate: string;
  startMeal: string;
  endMeal: string;
}) => {
  return apiClient.post("/mealoff", data);
};

// --- Custom Hooks ---
export const useTodayMealOff = () => {
  return useQuery({
    queryKey: ["todayMealOff"],
    queryFn: fetchTodayMealOff,
  });
};

export const useCustomMealOff = () => {
  return useQuery({
    queryKey: ["customMealOff"],
    queryFn: fetchCustomMealOff,
  });
};

export const useToggleMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleMeal,
    onSuccess: () => {
      // Invalidate today's meal off query to refetch the status
      queryClient.invalidateQueries({ queryKey: ["todayMealOff"] });
    },
  });
};

export const useSetCustomMealOff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setCustomMealOff,
    onSuccess: () => {
      // Invalidate the custom meal off query to refetch the status
      queryClient.invalidateQueries({ queryKey: ["customMealOff"] });
    },
  });
};

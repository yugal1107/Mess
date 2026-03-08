import apiClient from "./client";
import {
  TodayMealOffDto,
  CustomMealOffDto,
  UserListDto,
  CustomOffDetailDto,
} from "../types/dto";

export const fetchTodayMealOff = async (): Promise<TodayMealOffDto> => {
  const response = await apiClient.get("/mealoff/today");
  return response.data.data;
};

export const fetchCustomMealOff = async (): Promise<CustomMealOffDto> => {
  const response = await apiClient.get("/mealoff/custom");
  return response.data.data;
};

// Set meal off (turn OFF the meal)
export const setMealOff = (meal: "lunch" | "dinner") => {
  return apiClient.post(`/mealoff/${meal}`);
};

// Reverse meal off (turn meal back ON)
export const reverseMealOff = (meal: "lunch" | "dinner") => {
  return apiClient.delete(`/mealoff/${meal}`);
};

// Toggle meal based on current state
export const toggleMeal = ({
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

export const setCustomMealOff = (data: {
  startDate: string;
  endDate: string;
  startMeal: string;
  endMeal: string;
}) => {
  return apiClient.post("/mealoff", data);
};

export const cancelCustomMealOff = () => {
  return apiClient.delete("/mealoff");
};

// --- Admin Endpoints ---

export const fetchAllLunchOffs = async (): Promise<UserListDto> => {
  const response = await apiClient.get("/mealoff/lunch_offs");
  return response.data.data;
};

export const fetchAllDinnerOffs = async (): Promise<UserListDto> => {
  const response = await apiClient.get("/mealoff/dinner_offs");
  return response.data.data;
};

export const fetchAllCustomOffs = async (): Promise<CustomOffDetailDto[]> => {
  const response = await apiClient.get("/mealoff/custom_offs");
  return response.data.data;
};

export const fetchCustomOffDetailsByUserId = async (
  userId: string
): Promise<CustomMealOffDto> => {
  const response = await apiClient.get(`/mealoff/custom/${userId}`);
  return response.data.data;
};

export const cancelCustomOffByUserId = (userId: string) => {
  return apiClient.delete(`/mealoff/custom/${userId}`);
};

export const cancelLunchOffByUserId = (userId: string) => {
  return apiClient.delete(`/mealoff/lunch/${userId}`);
};

export const cancelDinnerOffByUserId = (userId: string) => {
  return apiClient.delete(`/mealoff/dinner/${userId}`);
};

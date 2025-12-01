// src/types/dto.ts

// --- API Response Wrapper ---
// The backend wraps all responses in this structure via GlobalResponseHandler
export interface ApiResponse<T> {
  timeStamp: string;
  data: T;
  error: ApiError | null;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
  path?: string;
  timestamp?: string;
}

// --- Auth DTOs ---
export interface SignupDto {
  email: string;
  password: string;
  name: string;
  role?: "STUDENT" | "ADMIN"; // Role might be sent by frontend or defaulted by backend
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  id: string;
  accessToken: string;
  refreshToken: string;
}

// --- User DTOs ---
export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  // Add other user-related fields if they exist in backend UserDto
}

export interface UserListDto {
  userList: UserDto[];
  count: number;
}

// Filter type for subscription status
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "REQUESTED";

// --- Subscription DTOs ---
export interface SubscriptionDto {
  id: string;
  status: "ACTIVE" | "INACTIVE" | "REQUESTED";
  type: "MESS" | "HOME_DELIVERY";
  meals: number;
  date: string; // LocalDateTime from backend, will be string in TS
}

// --- Meal Off DTOs ---
export interface TodayMealOffDto {
  id: string;
  lunch: boolean;
  dinner: boolean;
  message?: string; // Backend sends a message on success
}

export interface CustomMealOffDto {
  id: string | null;
  startMeal: "LUNCH" | "DINNER" | null;
  endMeal: "LUNCH" | "DINNER" | null;
  startDate: string | null; // LocalDate from backend, will be string in TS (YYYY-MM-DD)
  endDate: string | null; // LocalDate from backend, will be string in TS (YYYY-MM-DD)
  message?: string;
}

// --- Notification DTOs ---
export interface NotificationDto {
  type: "SUBSCRIPTION_EXPIRY" | "MEAL_UPDATE" | "GENERAL";
  message: string;
  isRead: boolean;
  timestamp: string; // LocalDateTime from backend
}

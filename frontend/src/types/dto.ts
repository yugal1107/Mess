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
  contact?: string;
  address?: string;
}

export interface UserListDto {
  userList: UserDto[];
  count: number;
}

// Filter type for subscription status
export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "REQUESTED";

// Filter type for subscription type
export type SubscriptionType = "MESS" | "HOME_DELIVERY";

// --- Subscription DTOs ---
export interface SubscriptionDto {
  id: string;
  status: SubscriptionStatus;
  type: SubscriptionType;
  meals: number;
  date: string; // LocalDateTime from backend, will be string in TS
}

export interface UpdateMealCountRequestDto {
  updatedMeals: number;
  reason?: string;
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

export interface CustomOffDetailDto {
  customMealOff: CustomMealOffDto;
  user: UserDto;
}

// --- Password Reset DTOs ---
export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ForgotPasswordResponseDto {
  resetToken: string;
}

export interface VerifyOtpRequestDto {
  resetToken: string;
  otp: string;
}

export interface ResetPasswordRequestDto {
  resetToken: string;
  newPassword: string;
}

export interface SuccessResponseDto {
  message: string;
}

// --- Theme DTOs ---
export interface ThemeColorsDto {
  primary?: string;
  onPrimary?: string;
  primaryContainer?: string;
  onPrimaryContainer?: string;
  secondary?: string;
  onSecondary?: string;
  secondaryContainer?: string;
  onSecondaryContainer?: string;
  outline?: string;
  surface?: string;
  onSurface?: string;
  error?: string;
  onError?: string;
}

export interface ThemeDto {
  name: string;
  greeting: string;
  greetingSubtext?: string;
  greetingIcon?: string;
  light: ThemeColorsDto;
  dark: ThemeColorsDto;
}

// --- Notification DTOs ---
export type NotificationType =
  | "SUBSCRIPTION_EXPIRY"
  | "MEAL_COUNT"
  | "MEAL_UPDATE"
  | "MEAL_OFF"
  | "ANNOUNCEMENT"
  | "ADMIN_UPDATE";

export interface NotificationDto {
  type: NotificationType;
  message: string;
  isRead: boolean;
  timestamp: string; // LocalDateTime from backend
}

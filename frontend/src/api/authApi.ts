import apiClient from "./client";
import {
  ForgotPasswordResponseDto,
  SuccessResponseDto,
  ApiResponse,
} from "../types/dto";

// --- Password Reset ---

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponseDto> => {
  const response =
    await apiClient.post<ApiResponse<ForgotPasswordResponseDto>>(
      "/auth/forgot-password",
      { email }
    );
  return response.data.data;
};

export const verifyOtp = async (
  resetToken: string,
  otp: string
): Promise<SuccessResponseDto> => {
  const response = await apiClient.post<ApiResponse<SuccessResponseDto>>(
    "/auth/verify-otp",
    { resetToken, otp }
  );
  return response.data.data;
};

export const resetPassword = async (
  resetToken: string,
  newPassword: string
): Promise<SuccessResponseDto> => {
  const response = await apiClient.post<ApiResponse<SuccessResponseDto>>(
    "/auth/reset-password",
    { resetToken, newPassword }
  );
  return response.data.data;
};

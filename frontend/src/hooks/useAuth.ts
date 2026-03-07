import { useMutation } from "@tanstack/react-query";
import * as AuthApi from "../api/authApi";

// --- Password Reset Mutations ---

/**
 * Request a password reset OTP for the given email.
 * On success, the backend returns a resetToken (UUID) that must be passed
 * to verifyOtp. The token is intentionally NOT persisted to storage.
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => AuthApi.forgotPassword(email),
  });
};

/**
 * Verify the OTP entered by the user against the resetToken.
 * Both values are kept in memory only — never written to storage.
 */
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ resetToken, otp }: { resetToken: string; otp: string }) =>
      AuthApi.verifyOtp(resetToken, otp),
  });
};

/**
 * Reset the user's password using the verified resetToken.
 * The resetToken is discarded from memory immediately after this call.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      resetToken,
      newPassword,
    }: {
      resetToken: string;
      newPassword: string;
    }) => AuthApi.resetPassword(resetToken, newPassword),
  });
};

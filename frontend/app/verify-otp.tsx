import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams, Redirect } from "expo-router";
import { useState } from "react";
import { useVerifyOtp } from "../src/hooks/useAuth";
import { getErrorMessage } from "../src/utils/errorHelper";

/**
 * Displays a screen for entering and verifying a 6-digit OTP associated with a password reset token.
 *
 * Validates the OTP input, invokes the verify mutation, navigates to the reset-password screen on success,
 * and redirects to the forgot-password screen when the required reset token is missing.
 *
 * @returns The Verify OTP screen UI as a React element.
 */
export default function VerifyOtpScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ resetToken: string; email: string }>();
  const { resetToken, email } = params;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  // Guard: declarative redirect avoids side effects during render
  if (!resetToken) {
    return <Redirect href="/forgot-password" />;
  }

  const validate = (): boolean => {
    const trimmed = otp.trim();
    if (!trimmed) {
      setError("OTP is required.");
      return false;
    }
    if (!/^\d{6}$/.test(trimmed)) {
      setError("OTP must be a 6-digit number.");
      return false;
    }
    return true;
  };

  const handleVerify = () => {
    setError("");
    if (!validate()) return;

    verifyOtp(
      { resetToken, otp: otp.trim() },
      {
        onSuccess: () => {
          router.push({
            pathname: "/reset-password",
            params: { resetToken },
          });
        },
        onError: (err: any) => {
          setError(
            getErrorMessage(err, "Invalid or expired OTP. Please try again.")
          );
        },
      }
    );
  };

  const handleResend = () => {
    router.replace("/forgot-password");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text variant="displayMedium" className="mb-2">
            Verify OTP
          </Text>
          <Text
            variant="bodyMedium"
            className="mb-8"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {email
              ? `A 6-digit OTP has been sent to ${email}.`
              : "A 6-digit OTP has been sent to your email."}
            {" Enter it below to continue."}
          </Text>

          {!!error && (
            <Text
              className="text-center mb-4 text-sm"
              style={{ color: theme.colors.error }}
            >
              {error}
            </Text>
          )}

          <TextInput
            label="OTP"
            mode="outlined"
            keyboardType="number-pad"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            disabled={isPending}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />

          <Button
            mode="contained"
            onPress={handleVerify}
            loading={isPending}
            disabled={isPending}
            className="mt-2"
          >
            Verify OTP
          </Button>

          <Button
            mode="text"
            onPress={handleResend}
            disabled={isPending}
            className="mt-2"
          >
            Resend OTP
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

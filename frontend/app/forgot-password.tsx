import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForgotPassword } from "../src/hooks/useAuth";
import { getErrorMessage } from "../src/utils/errorHelper";

/**
 * Renders a "Forgot Password" screen with an email input, error display, and actions to send an OTP or return to login.
 *
 * Validates the entered email, calls the forgot-password mutation to request an OTP, sets user-facing error messages on failure, and navigates to "/verify-otp" with the `resetToken` and normalized email on success.
 *
 * @returns The React element for the forgot-password screen.
 */
export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const validate = (): boolean => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    setError("");
    if (!validate()) return;

    forgotPassword(email.trim().toLowerCase(), {
      onSuccess: ({ resetToken }) => {
        router.push({
          pathname: "/verify-otp",
          params: { resetToken, email: email.trim().toLowerCase() },
        });
      },
      onError: (err: any) => {
        setError(getErrorMessage(err, "Failed to send OTP. Please try again."));
      },
    });
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
            Forgot Password
          </Text>
          <Text
            variant="bodyMedium"
            className="mb-8"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Enter your registered email address and we&apos;ll send you an OTP to
            reset your password.
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
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            disabled={isPending}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending}
            className="mt-2"
          >
            Send OTP
          </Button>

          <Button
            mode="text"
            onPress={() => router.back()}
            disabled={isPending}
            className="mt-2"
          >
            Back to Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

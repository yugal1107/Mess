import { View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams, Redirect } from "expo-router";
import { useState } from "react";
import { useResetPassword } from "../src/hooks/useAuth";
import { getErrorMessage } from "../src/utils/errorHelper";

export default function ResetPasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ resetToken: string }>();
  const { resetToken } = params;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: resetPassword, isPending } = useResetPassword();

  // Guard: declarative redirect avoids side effects during render
  if (!resetToken) {
    return <Redirect href="/forgot-password" />;
  }

  const validate = (): boolean => {
    if (!newPassword) {
      setError("New password is required.");
      return false;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleReset = () => {
    setError("");
    if (!validate()) return;

    resetPassword(
      { resetToken, newPassword },
      {
        onSuccess: () => {
          router.replace({
            pathname: "/login",
            params: { reset_success: "true" },
          });
        },
        onError: (err: any) => {
          setError(
            getErrorMessage(err, "Failed to reset password. Please try again.")
          );
        },
      }
    );
  };

  return (
    <View
      className="flex-1 justify-center p-5"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <Text variant="displayMedium" className="mb-2">
        Reset Password
      </Text>
      <Text
        variant="bodyMedium"
        className="mb-8"
        style={{ color: theme.colors.onSurfaceVariant }}
      >
        Enter and confirm your new password.
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
        label="New Password"
        mode="outlined"
        secureTextEntry
        autoComplete="new-password"
        value={newPassword}
        onChangeText={setNewPassword}
        disabled={isPending}
        className="mb-4"
        style={{ backgroundColor: theme.colors.surface }}
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        secureTextEntry
        autoComplete="new-password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        disabled={isPending}
        className="mb-4"
        style={{ backgroundColor: theme.colors.surface }}
      />

      <Button
        mode="contained"
        onPress={handleReset}
        loading={isPending}
        disabled={isPending}
        className="mt-2"
      >
        Reset Password
      </Button>
    </View>
  );
}

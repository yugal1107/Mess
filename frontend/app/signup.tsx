import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import apiClient from "../src/api/client";

export default function SignUpScreen() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !contact || !address) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await apiClient.post("/auth/signup", {
        name,
        email,
        password,
        contact,
        address,
        role: "STUDENT",
      });
      router.replace({
        pathname: "/login",
        params: { signup_success: "true" },
      });
    } catch (err: any) {
      console.error("Sign up error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text
            variant="displayMedium"
            className="text-center mb-8 font-bold"
            style={{ color: theme.colors.onSurface }}
          >
            Create Account
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
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <TextInput
            label="Contact"
            mode="outlined"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <TextInput
            label="Address"
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            disabled={loading}
            className="mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            className="mt-2"
          >
            Sign Up
          </Button>
          <Link href="/login" asChild>
            <Button mode="text" disabled={loading} className="mt-2">
              Already have an account? Login
            </Button>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

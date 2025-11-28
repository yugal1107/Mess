import { View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import apiClient from "../src/api/client";
import Container from "@/src/components/common/Container";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await apiClient.post("/auth/signup", {
        name,
        email,
        password,
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
    <Container>
      <View className="flex-1 justify-center p-5 bg-surface">
        <Text
          variant="displayMedium"
          className="text-center mb-8 font-bold text-onSurface"
        >
          Create Account
        </Text>
        {!!error && (
          <Text className="text-error text-center mb-4 text-sm">{error}</Text>
        )}
        <TextInput
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          disabled={loading}
          className="mb-4 bg-surface"
        />
        <TextInput
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          disabled={loading}
          className="mb-4 bg-surface"
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          disabled={loading}
          className="mb-4 bg-surface"
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
    </Container>
  );
}

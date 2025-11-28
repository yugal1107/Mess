import { View } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { useAuth } from "../src/hooks/AuthContext";
import apiClient, { setClientAccessToken } from "../src/api/client";
import { saveRefreshToken } from "../src/services/tokenStorage";
import { getErrorMessage } from "../src/utils/errorHelper";
import Container from "@/src/components/common/Container";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.signup_success === "true") {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [params]);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const loginResponse = await apiClient.post("/auth/login", {
        email,
        password,
      });
      const { accessToken, refreshToken } = loginResponse.data.data;

      // Set token on axios client FIRST (synchronous)
      setClientAccessToken(accessToken);
      // Then update React state
      setToken(accessToken);
      await saveRefreshToken(refreshToken); // To SecureStore

      const profileResponse = await apiClient.get("/user");
      const userData = profileResponse.data.data;
      setUser(userData);

      // Navigate based on user role
      if (userData.role === "ADMIN") {
        router.replace("/(admin)/dashboard");
      } else {
        router.replace("/(tabs)/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(getErrorMessage(err, "Invalid email or password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View className="flex-1 justify-center p-5 bg-surface">
        <Text variant="displayMedium" className="mb-8">
          Welcome Back!
        </Text>
        {!!error && (
          <Text className="text-error text-center mb-4 text-sm">{error}</Text>
        )}
        {!!success && (
          <Text className="text-green-600 text-center mb-4 text-sm">
            {success}
          </Text>
        )}
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
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          className="mt-2"
        >
          Login
        </Button>
        <Link href="/signup" asChild>
          <Button mode="text" disabled={loading} className="mt-2">
            Don't have an account? Sign Up
          </Button>
        </Link>
      </View>
    </Container>
  );
}

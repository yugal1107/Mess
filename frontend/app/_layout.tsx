import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { theme } from "../src/theme/theme";
import { AuthProvider } from "../src/hooks/AuthContext";
import "../src/styles/globals.css"; // Import global CSS
import "../src/nativewind-config"; // Import NativeWind config for RNP
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Create a client with sensible defaults for mobile
// Export queryClient so it can be accessed for cache clearing on logout
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false, // Not relevant for mobile
      refetchOnReconnect: true,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

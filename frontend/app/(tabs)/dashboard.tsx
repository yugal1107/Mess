import { View, StyleSheet } from "react-native";
import { Text, Button, Card, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import apiClient from "../../src/api/client";
import { useQuery } from "@tanstack/react-query";
import { SubscriptionDto } from "../../src/types/dto"; // Import SubscriptionDto

// Define the fetch function outside the component
const fetchSubscriptionDetails = async (): Promise<SubscriptionDto> => {
  try {
    const response = await apiClient.get("/subscription");
    if (!response.data.data) {
      throw new Error("No subscription found");
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch subscription details:", error);
    throw error; // Re-throw to let useQuery handle the error state
  }
};

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptionDetails,
  });

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user || isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Welcome, {user.name}!
      </Text>
      <Card style={styles.card}>
        <Card.Title title="Subscription Status" />
        <Card.Content>
          {subscription ? (
            <>
              <Text variant="titleMedium">Status: {subscription.status}</Text>
              <Text variant="bodyMedium">Meals Left: {subscription.meals}</Text>
            </>
          ) : (
            <Text>No active subscription found.</Text>
          )}
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    width: "100%",
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Button,
  Card,
  ActivityIndicator,
  RadioButton,
} from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import {
  useSubscription,
  useRequestSubscription,
} from "../../src/hooks/useSubscription";

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [subscriptionType, setSubscriptionType] = useState<string>("MESS");

  // Use the custom hooks
  const { data: subscription, isLoading } = useSubscription();
  const { mutate: requestSubscription, isPending: isRequesting } =
    useRequestSubscription();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Welcome, {user.name}!
      </Text>

      {subscription && subscription.status === "ACTIVE" ? (
        <Card style={styles.card}>
          <Card.Title title="Subscription Status" />
          <Card.Content>
            <Text variant="titleMedium">Status: {subscription.status}</Text>
            <Text variant="bodyMedium">
              Type: {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
            </Text>
            <Text variant="bodyMedium">Meals Left: {subscription.meals}</Text>
          </Card.Content>
        </Card>
      ) : subscription && subscription.status === "REQUESTED" ? (
        <Card style={styles.card}>
          <Card.Title title="Subscription Status" />
          <Card.Content>
            <Text variant="titleMedium">Status: {subscription.status}</Text>
            <Text variant="bodyMedium">
              Type: {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
            </Text>
            <Text variant="bodyMedium">Your request is pending approval.</Text>
          </Card.Content>
        </Card>
      ) : (
        <Card style={styles.card}>
          <Card.Title title="No Active Subscription" />
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>
              Select Subscription Type:
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSubscriptionType(newValue)}
              value={subscriptionType}
            >
              <View style={styles.radioOption}>
                <RadioButton value="MESS" />
                <Text onPress={() => setSubscriptionType("MESS")}>Mess</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="HOME_DELIVERY" />
                <Text onPress={() => setSubscriptionType("HOME_DELIVERY")}>
                  Home Delivery
                </Text>
              </View>
            </RadioButton.Group>
            <Button
              mode="contained"
              onPress={() => requestSubscription(subscriptionType)}
              loading={isRequesting}
              style={styles.requestButton}
            >
              Request {subscriptionType === "MESS" ? "Mess" : "Home Delivery"}{" "}
              Subscription
            </Button>
          </Card.Content>
        </Card>
      )}

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </SafeAreaView>
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
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  requestButton: {
    marginTop: 10,
  },
});

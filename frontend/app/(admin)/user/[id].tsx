import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Card,
  ActivityIndicator,
  Avatar,
  Chip,
  Divider,
  useTheme,
} from "react-native-paper";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  useUserDetails,
  useUserSubscription,
} from "../../../src/hooks/useUsers";

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useUserDetails(id);
  const { data: subscription, isLoading: isLoadingSubscription } =
    useUserSubscription(id);

  const isLoading = isLoadingUser || isLoadingSubscription;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  if (isUserError || !user) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load user details</Text>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "ACTIVE":
        return "#27ae60";
      case "REQUESTED":
        return "#f39c12";
      case "INACTIVE":
      default:
        return "#e74c3c";
    }
  };

  const getRoleColor = (role: string) => {
    return role === "ADMIN" ? "#9b59b6" : "#3498db";
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: user.name,
          headerShown: true,
        }}
      />
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar.Text
            size={80}
            label={user.name?.[0]?.toUpperCase() || "?"}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text variant="headlineMedium" style={styles.userName}>
            {user.name}
          </Text>
          <Text variant="bodyLarge" style={styles.userEmail}>
            {user.email}
          </Text>
          <Chip
            style={[
              styles.roleChip,
              { backgroundColor: getRoleColor(user.role) },
            ]}
            textStyle={{ color: "#fff" }}
          >
            {user.role}
          </Chip>
        </View>

        <Divider style={styles.divider} />

        {/* User Info Card */}
        <Card style={styles.card}>
          <Card.Title title="User Information" />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID</Text>
              <Text style={styles.infoValue}>{user.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>{user.role}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Subscription Card */}
        <Card style={styles.card}>
          <Card.Title title="Subscription Details" />
          <Card.Content>
            {subscription ? (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Chip
                    compact
                    style={{
                      backgroundColor: getStatusColor(subscription.status),
                    }}
                    textStyle={{ color: "#fff", fontSize: 12 }}
                  >
                    {subscription.status}
                  </Chip>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type</Text>
                  <Text style={styles.infoValue}>
                    {subscription.type === "MESS" ? "Mess" : "Home Delivery"}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Meals Remaining</Text>
                  <Text style={[styles.infoValue, styles.mealsCount]}>
                    {subscription.meals}
                  </Text>
                </View>
                {subscription.date && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Started On</Text>
                    <Text style={styles.infoValue}>
                      {new Date(subscription.date).toLocaleDateString()}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.noSubscription}>No active subscription</Text>
            )}
          </Card.Content>
        </Card>

        {/* Placeholder for future actions */}
        {/* 
        <Card style={styles.card}>
          <Card.Title title="Actions" />
          <Card.Content>
            <Button mode="contained" style={styles.actionButton}>
              Edit User
            </Button>
            <Button mode="outlined" style={styles.actionButton}>
              Reset Password
            </Button>
          </Card.Content>
        </Card>
        */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  userName: {
    marginTop: 15,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#666",
    marginTop: 5,
  },
  roleChip: {
    marginTop: 10,
  },
  divider: {
    marginHorizontal: 20,
  },
  card: {
    margin: 15,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  mealsCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27ae60",
  },
  noSubscription: {
    textAlign: "center",
    color: "#888",
    paddingVertical: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  actionButton: {
    marginVertical: 5,
  },
});

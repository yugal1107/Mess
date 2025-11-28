import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return null; // Should not happen if routing is correct
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Admin Dashboard
      </Text>
      <Text variant="titleMedium">Welcome, {user.name} (Admin)!</Text>
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
  logoutButton: {
    marginTop: 20,
  },
});

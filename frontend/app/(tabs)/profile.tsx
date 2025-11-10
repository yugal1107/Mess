import { View, StyleSheet } from "react-native";
import { Text, Button, Avatar, Card } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.container}>
      <Avatar.Text
        size={80}
        label={user.name?.[0]?.toUpperCase() || "?"}
        style={styles.avatar}
      />
      <Text variant="headlineLarge" style={styles.name}>
        {user.name}
      </Text>
      <Text variant="bodyLarge" style={styles.email}>
        {user.email}
      </Text>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        icon="logout"
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    marginBottom: 5,
  },
  email: {
    marginBottom: 30,
    color: "#666",
  },
  card: {
    width: "100%",
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: "#888",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
  },
});

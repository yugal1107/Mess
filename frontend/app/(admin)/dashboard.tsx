import { Text, Button } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import Container from "../../src/components/common/Container";

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
    <Container className="justify-center items-center">
      <Text variant="headlineLarge" className="mb-5">
        Admin Dashboard
      </Text>
      <Text variant="titleMedium">Welcome, {user.name} (Admin)!</Text>
      <Button mode="contained" onPress={handleLogout} className="mt-5">
        Logout
      </Button>
    </Container>
  );
}

import { Button } from "react-native-paper";
import { useAuth } from "@/src/hooks/AuthContext";
import { useRouter } from "expo-router";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <Button mode="contained" onPress={handleLogout} style={{ marginTop: 20 }}>
      Logout
    </Button>
  );
}

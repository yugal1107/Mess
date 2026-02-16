import { View } from "react-native";
import { Text, Button, Avatar, Card, useTheme } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import Container from "@/src/components/common/Container";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Container edges={["top"]} className="px-2.5 pt-5" heading="Profile">
      <View className="flex-1 items-center pt-10 px-5">
        <Avatar.Text
          size={80}
          label={user.name?.[0]?.toUpperCase() || "?"}
          className="mb-5"
        />
        <Text variant="headlineLarge" className="mb-1">
          {user.name}
        </Text>
        <Text
          variant="bodyLarge"
          className="mb-8"
          style={{ color: theme.colors.outline }}
        >
          {user.email}
        </Text>
        <Card className="w-full mb-8">
          <Card.Content>
            <View className="flex-row justify-between py-2.5">
              <Text style={{ color: theme.colors.outline }}>Role</Text>
              <Text className="font-bold">{user.role}</Text>
            </View>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={handleLogout}
          className="w-full"
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </Container>
  );
}

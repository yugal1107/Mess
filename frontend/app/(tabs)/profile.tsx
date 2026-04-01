import { View, ScrollView, RefreshControl } from "react-native";
import { Text, Button, Avatar, Card, useTheme } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter } from "expo-router";
import apiClient from "@/src/api/client";
import { ApiResponse } from "@/src/types/dto";
import Container from "@/src/components/common/Container";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, logout, setUser } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await apiClient.get<ApiResponse<typeof user>>("/user");
      if (response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container edges={["top"]} className="px-2.5 pt-5" heading="Profile">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
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
            <View className="flex-row justify-between py-2.5">
              <Text style={{ color: theme.colors.outline }}>Contact</Text>
              <Text className="font-bold">{user.contact || "N/A"}</Text>
            </View>
            <View className="flex-row justify-between py-2.5">
              <Text style={{ color: theme.colors.outline }}>Address</Text>
              <Text className="font-bold" numberOfLines={2} style={{ maxWidth: "60%", textAlign: "right" }}>
                {user.address || "N/A"}
              </Text>
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
      </ScrollView>
    </Container>
  );
}

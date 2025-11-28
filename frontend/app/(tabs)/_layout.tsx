import { Tabs, Redirect } from "expo-router";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../src/hooks/AuthContext";
import { ActivityIndicator, View } from "react-native";
import Loading from "@/src/components/common/Loading";

export default function TabsLayout() {
  const theme = useTheme();
  const { user, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return <Loading />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Redirect admins to admin dashboard
  if (user.role === "ADMIN") {
    return <Redirect href="/(admin)/requests" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meal-off"
        options={{
          title: "Meal Off",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-off" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

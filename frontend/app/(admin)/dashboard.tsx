import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useAuth } from "../../src/hooks/AuthContext";
import { useRouter, Href } from "expo-router";
import { useUsers } from "../../src/hooks/useUsers";
import { useAllLunchOffs, useAllDinnerOffs } from "../../src/hooks/useMealOff";
import { StatCard } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  // Fetch statistics
  const { data: allUsers, isLoading: loadingUsers } = useUsers();
  const { data: pendingRequests, isLoading: loadingPending } = useUsers("REQUESTED");
  const { data: activeUsers, isLoading: loadingActive } = useUsers("ACTIVE");
  const { data: lunchOffs, isLoading: loadingLunch } = useAllLunchOffs();
  const { data: dinnerOffs, isLoading: loadingDinner } = useAllDinnerOffs();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const navigateTo = (path: Href) => {
    router.push(path);
  };

  if (!user) {
    return null;
  }

  return (
    <Container className="px-2.5 pt-5" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {/* Welcome Section */}
        <View style={{ marginBottom: isSmallDevice ? 20 : 28 }}>
          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}
          >
            Welcome back,
          </Text>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.primary, fontWeight: "700" }}
          >
            {user.name}
          </Text>
          <View
            style={[
              styles.adminBadge,
              { backgroundColor: theme.colors.tertiaryContainer },
            ]}
          >
            <MaterialCommunityIcons
              name="shield-account"
              size={16}
              color={theme.colors.onTertiaryContainer}
            />
            <Text
              variant="labelLarge"
              style={{
                color: theme.colors.onTertiaryContainer,
                marginLeft: 6,
                fontWeight: "600",
              }}
            >
              Administrator
            </Text>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={{ marginBottom: isSmallDevice ? 20 : 28 }}>
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.onSurface,
              fontWeight: "600",
              marginBottom: isSmallDevice ? 12 : 16,
            }}
          >
            Overview
          </Text>

          {/* Total Users - Full Width */}
          <StatCard
            title="Total Users"
            count={allUsers?.count ?? 0}
            icon="account-group"
            onPress={() => navigateTo("/(admin)/users")}
            loading={loadingUsers}
            variant="full"
          />

          {/* Other Stats - 2x2 Grid */}
          <View style={styles.statsGrid}>
            <StatCard
              title="Pending"
              count={pendingRequests?.count ?? 0}
              icon="clock-alert"
              onPress={() => navigateTo("/(admin)/requests")}
              loading={loadingPending}
            />
            <StatCard
              title="Active"
              count={activeUsers?.count ?? 0}
              icon="check-circle"
              onPress={() => navigateTo("/(admin)/users")}
              loading={loadingActive}
            />
            <StatCard
              title="Lunch Offs"
              count={lunchOffs?.count ?? 0}
              icon="food-off"
              onPress={() => navigateTo("/(admin)/meal-offs")}
              loading={loadingLunch}
            />
            <StatCard
              title="Dinner Offs"
              count={dinnerOffs?.count ?? 0}
              icon="food-variant-off"
              onPress={() => navigateTo("/(admin)/meal-offs")}
              loading={loadingDinner}
            />
          </View>
        </View>

        {/* Logout Button */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon="logout"
          style={styles.logoutButton}
          contentStyle={{ flexDirection: "row-reverse" }}
        >
          Logout
        </Button>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 12,
  },
});

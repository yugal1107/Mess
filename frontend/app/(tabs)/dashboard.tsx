import { ScrollView, View, Dimensions, RefreshControl } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "@/src/hooks/AuthContext";
import {
  useSubscription,
  useRequestSubscription,
} from "@/src/hooks/useSubscription";

import SubscriptionCard from "@/src/components/tabs/SubscriptionCard";
import PendingRequestCard from "@/src/components/tabs/PendingRequestCard";
import NoSubscriptionCard from "@/src/components/tabs/NoSubscriptionCard";
import Loading from "@/src/components/common/Loading";
import MealMenu from "@/src/components/tabs/MealMenu";
import Container from "@/src/components/common/Container";
import FestivalGreeting from "@/src/components/common/FestivalGreeting";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

/**
 * Render the dashboard screen showing a welcome header, festival greeting,
 * current subscription details with pull-to-refresh, and quick access menu.
 *
 * The screen reads the authenticated user and subscription state, displays a
 * loading indicator if data is not ready, and conditionally renders one of:
 * an active subscription card, a pending request card, or a no-subscription card
 * (which allows requesting a subscription). Pull-to-refresh triggers the
 * subscription refetch.
 *
 * @returns A React element representing the dashboard screen.
 */
export default function DashboardScreen() {
  const { user } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState<
    "MESS" | "HOME_DELIVERY"
  >("MESS");
  const { data: subscription, isLoading, isFetching, refetch } = useSubscription();
  const { mutate: requestSubscription, isPending } = useRequestSubscription();
  const theme = useTheme();

  if (!user || isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Container className="px-2.5 pt-5" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop:25 }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
      >

        {/* Welcome Section */}
        <View style={{ marginBottom: isSmallDevice ? 16 : 24 }}>
          <Text
            variant="headlineSmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginBottom: 4,
            }}
          >
            Welcome,
          </Text>
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.primary,
              fontWeight: "700",
            }}
          >
            {user.name}
          </Text>
        </View>

        {/* Festival Greeting */}
        <FestivalGreeting />

        {/* Subscription Section */}
        <View style={{ marginBottom: isSmallDevice ? 12 : 16, marginTop: 10 }}>
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.onSurface,
              fontWeight: "600",
              marginBottom: isSmallDevice ? 12 : 16,
            }}
          >
            Subscription Details
          </Text>

          {subscription?.status === "ACTIVE" && (
            <SubscriptionCard subscription={subscription} />
          )}

          {subscription?.status === "REQUESTED" && (
            <PendingRequestCard subscription={subscription} />
          )}

          {subscription?.status === "INACTIVE" && (
            <NoSubscriptionCard
              subscriptionType={subscriptionType}
              setSubscriptionType={setSubscriptionType}
              requestSubscription={requestSubscription}
              loading={isPending}
            />
          )}
        </View>

        {/* Menu Section */}
        <View style={{ marginBottom: 20 }}>
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.onSurface,
              fontWeight: "600",
              marginBottom: isSmallDevice ? 12 : 16,
            }}
          >
            Quick Access
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: isSmallDevice ? 12 : 16,
            }}
          >
            <MealMenu />
            {/* <MealMenu /> */}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

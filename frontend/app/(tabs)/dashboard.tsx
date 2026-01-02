import { ScrollView, View } from "react-native";
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

export default function DashboardScreen() {
  const { user } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState<
    "MESS" | "HOME_DELIVERY"
  >("MESS");
  const { data: subscription, isLoading } = useSubscription();
  const { mutate: requestSubscription, isPending } = useRequestSubscription();
  const theme = useTheme();

  if (!user || isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Container className="justify-center items-center py-10" edges={["top"]}>
      {/* <SafeAreaView className="flex-1 justify-center items-center"> */}
        <ScrollView className="flex-1 w-full px-5">
          <Text variant="headlineMedium" className="text-start w-full text-4xl">
            Welcome,
          </Text>
          <Text
            variant="titleMedium"
            className="mb-10 text-5xl font-black w-full"
            style={{ color: theme.colors.primary }}
          >
            {user.name}
          </Text>

          <Text variant="headlineMedium" className="text-start w-full text-2xl mb-5">
            Your Subscription Details:
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

          <View className="flex-row gap-4 mb-5">
            <MealMenu />
            <MealMenu />
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
    </Container>
  );
}

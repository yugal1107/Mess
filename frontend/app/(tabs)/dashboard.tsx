import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "@/src/hooks/AuthContext";
import {
  useSubscription,
  useRequestSubscription,
} from "@/src/hooks/useSubscription";
import { SafeAreaView } from "react-native-safe-area-context";

import SubscriptionCard from "@/src/components/tabs/SubscriptionCard";
import PendingRequestCard from "@/src/components/tabs/PendingRequestCard";
import NoSubscriptionCard from "@/src/components/tabs/NoSubscriptionCard";
import LogoutButton from "@/src/components/tabs/LogoutButton";
import Loading from "@/src/components/common/Loading";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState<
    "MESS" | "HOME_DELIVERY"
  >("MESS");
  const { data: subscription, isLoading } = useSubscription();
  const { mutate: requestSubscription, isPending } = useRequestSubscription();

  if (!user || isLoading) {
    return <Loading size="large" />;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ScrollView className="flex-1 w-full px-5 py-6">
        <Text variant="headlineMedium" className="mb-10 text-start w-full">
          Welcome, {user.name}!
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

        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import {
  useSubscriptionRequests,
  useAcceptSubscription,
} from "../../src/hooks/useSubscription";
import { useState } from "react";
import { RequestCard } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";

export default function SubscriptionRequestsScreen() {
  const theme = useTheme();
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useSubscriptionRequests();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const { mutate: acceptSubscription } = useAcceptSubscription();

  const handleApprove = (userId: string) => {
    setLoadingUserId(userId);
    acceptSubscription(userId, {
      onSettled: () => {
        setLoadingUserId(null);
      },
    });
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <Container className="justify-center items-center">
        <Text className="text-center" style={{ color: theme.colors.error }}>
          Failed to load requests: {error.message}
        </Text>
      </Container>
    );
  }

  return (
    <Container className="p-2.5">
      {/* <Text variant="headlineMedium" className="text-center my-4">
        Subscription Requests
      </Text> */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            id={item.id}
            name={item.name}
            email={item.email}
            onApprove={handleApprove}
            isLoading={loadingUserId === item.id}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="clipboard-list-outline"
            message="No pending requests."
          />
        }
      />
    </Container>
  );
}

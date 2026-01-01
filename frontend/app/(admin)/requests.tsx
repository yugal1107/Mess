import { FlatList } from "react-native";
import { useSubscriptionRequests } from "../../src/hooks/useUsers";
import { useAcceptSubscription } from "../../src/hooks/useSubscription";
import { useState } from "react";
import { RequestCard } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import ErrorScreen from "../../src/components/common/ErrorScreen";

export default function SubscriptionRequestsScreen() {
  const { data, isLoading, isError, error, refetch } =
    useSubscriptionRequests();

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
      <ErrorScreen
        message={error?.message || "Failed to load requests"}
        onRetry={refetch}
      />
    );
  }

  return (
    <Container className="p-2.5">
      <FlatList
        data={data?.userList}
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

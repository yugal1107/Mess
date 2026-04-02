import { FlatList } from "react-native";
import { useSubscriptionRequests } from "../../src/hooks/useUsers";
import { useAcceptSubscription } from "../../src/hooks/useSubscription";
import { useState } from "react";
import { RequestCard } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";
import ErrorScreen from "../../src/components/common/ErrorScreen";

/**
 * Renders a screen that lists pending subscription requests and provides per-request approval controls.
 *
 * Shows a full-screen loading indicator while requests are loading, an error screen with retry on error, and a list of request cards otherwise.
 * The list supports pull-to-refresh and displays an empty state when there are no pending requests. Approving a request triggers the accept mutation and shows a per-item loading indicator until the mutation settles.
 *
 * @returns The React element for the subscription requests screen, including loading, error, list, and empty states.
 */
export default function SubscriptionRequestsScreen() {
  const { data, isLoading, isError, error, refetch, isFetching } =
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
    <Container className="px-2.5 pt-5" edges={["top"]} heading="Subscription Requests">
      <FlatList
        data={data?.userList}
        keyExtractor={(item) => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
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

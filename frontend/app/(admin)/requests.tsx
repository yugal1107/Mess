import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator } from "react-native-paper";
import {
  useSubscriptionRequests,
  useAcceptSubscription,
} from "../../src/hooks/useSubscription";
import { useState } from "react";
import { RequestCard } from "../../src/components/admin";

export default function SubscriptionRequestsScreen() {
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
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Failed to load requests: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Subscription Requests
      </Text>
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
          <Text style={styles.emptyText}>No pending requests.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    textAlign: "center",
    marginVertical: 15,
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
  },
});

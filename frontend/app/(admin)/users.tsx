import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card, ActivityIndicator, List } from "react-native-paper";
import { useUsers } from "../../src/hooks/useUsers";

export default function AllUsersScreen() {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          Failed to load users: {error.message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        All Users
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <List.Item
              title={item.name}
              description={`Email: ${item.email}\nRole: ${item.role}`}
              descriptionNumberOfLines={2}
            />
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found.</Text>
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
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
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

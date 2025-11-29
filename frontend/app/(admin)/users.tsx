import { FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUsers } from "../../src/hooks/useUsers";
import { UserListItem } from "../../src/components/admin";
import Container from "../../src/components/common/Container";
import Loading from "../../src/components/common/Loading";
import EmptyState from "../../src/components/common/EmptyState";

export default function AllUsersScreen() {
  const theme = useTheme();
  const { data: users, isLoading, isError, error } = useUsers();
  const router = useRouter();

  const handleUserPress = (userId: string) => {
    router.push(`/(admin)/user/${userId}`);
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isError) {
    return (
      <Container className="justify-center items-center">
        <Text className="text-center" style={{ color: theme.colors.error }}>
          Failed to load users: {error.message}
        </Text>
      </Container>
    );
  }

  return (
    <Container className="p-2.5">
      {/* <Text variant="headlineMedium" className="text-center my-4">
        All Users
      </Text> */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserListItem
            id={item.id}
            name={item.name}
            email={item.email}
            role={item.role}
            onPress={handleUserPress}
          />
        )}
        ListEmptyComponent={
          <EmptyState icon="account-group-outline" message="No users found." />
        }
      />
    </Container>
  );
}

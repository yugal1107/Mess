import { ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  useUserDetails,
  useUserSubscription,
} from "../../../src/hooks/useUsers";
import {
  ProfileHeader,
  UserInfoCard,
  UserSubscriptionCard,
} from "../../../src/components/admin";
import Container from "../../../src/components/common/Container";
import Loading from "../../../src/components/common/Loading";
import ErrorScreen from "../../../src/components/common/ErrorScreen";

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
  } = useUserDetails(id as string);

  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    refetch: refetchSubscription,
  } = useUserSubscription(id as string);

  const isLoading = isLoadingUser || isLoadingSubscription;

  const handleRetry = () => {
    refetchUser();
    refetchSubscription();
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isUserError || !user) {
    return (
      <ErrorScreen
        message={userError?.message || "Failed to load user details"}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <Container
      className="px-2.5 pt-5"
      edges={["top", "bottom"]}
      heading="User Details"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileHeader name={user.name} email={user.email} role={user.role} />

        <UserInfoCard id={user.id} email={user.email} role={user.role} />

        <UserSubscriptionCard subscription={subscription} />
      </ScrollView>
    </Container>
  );
}

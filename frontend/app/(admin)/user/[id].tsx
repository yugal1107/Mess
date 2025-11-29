import { ScrollView, View } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";
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
import Loading from "../../../src/components/common/Loading";

export default function UserDetailsScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useUserDetails(id);
  const { data: subscription, isLoading: isLoadingSubscription } =
    useUserSubscription(id);

  const isLoading = isLoadingUser || isLoadingSubscription;

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (isUserError || !user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center" style={{ color: theme.colors.error }}>
          Failed to load user details
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: user.name,
          headerShown: true,
        }}
      />
      <ScrollView className="flex-1">
        <ProfileHeader name={user.name} email={user.email} role={user.role} />

        <Divider className="mx-5" />

        <UserInfoCard id={user.id} email={user.email} role={user.role} />

        <UserSubscriptionCard subscription={subscription} />
      </ScrollView>
    </>
  );
}

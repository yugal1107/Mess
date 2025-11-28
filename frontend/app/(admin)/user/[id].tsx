import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator, Divider } from "react-native-paper";
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

export default function UserDetailsScreen() {
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
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator animating={true} size="large" />
      </SafeAreaView>
    );
  }

  if (isUserError || !user) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load user details</Text>
      </SafeAreaView>
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
      <ScrollView style={styles.container}>
        <ProfileHeader name={user.name} email={user.email} role={user.role} />

        <Divider style={styles.divider} />

        <UserInfoCard id={user.id} email={user.email} role={user.role} />

        <UserSubscriptionCard subscription={subscription} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    marginHorizontal: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

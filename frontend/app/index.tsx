import { Redirect } from "expo-router";
import { useAuth } from "../src/hooks/AuthContext";
import "../src/styles/globals.css";
import Loading from "@/src/components/common/Loading";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show a splash screen or a loading indicator while we are
    // checking for an existing token.
    return <Loading />;
  }

  if (user) {
    // User is logged in, redirect based on role
    if (user.role === "ADMIN") {
      return <Redirect href="/(admin)/dashboard" />;
    } else {
      return <Redirect href="/(tabs)/dashboard" />;
    }
  } else {
    // User is not logged in, redirect to the login screen
    return <Redirect href="/login" />;
  }
}

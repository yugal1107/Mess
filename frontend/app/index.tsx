import { Redirect, SplashScreen } from 'expo-router';
import { useAuth } from '../src/hooks/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show a splash screen or a loading indicator while we are
    // checking for an existing token.
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (user) {
    // User is logged in, redirect based on role
    if (user.role === 'ADMIN') {
      return <Redirect href="/(admin)/dashboard" />;
    } else {
      return <Redirect href="/(tabs)/dashboard" />;
    }
  } else {
    // User is not logged in, redirect to the login screen
    return <Redirect href="/login" />;
  }
}

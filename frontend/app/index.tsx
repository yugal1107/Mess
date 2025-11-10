import { Redirect } from 'expo-router';
import { useAuth } from '../src/hooks/AuthContext';

export default function Index() {
  const { token } = useAuth();

  // If the user is authenticated, redirect to the dashboard.
  // Otherwise, redirect to the login screen.
  if (token) {
    return <Redirect href="/dashboard" />;
  } else {
    return <Redirect href="/login" />;
  }
}

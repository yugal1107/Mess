import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../src/hooks/AuthContext';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user, setToken, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    // Explicitly navigate to the login screen
    router.replace('/login');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Welcome, {user.name}!
      </Text>
      <Card style={styles.card}>
        <Card.Title title="Subscription Status" />
        <Card.Content>
          <Text variant="titleMedium">Status: {user.subscription?.status || 'N/A'}</Text>
          <Text variant="bodyMedium">
            Expires on: {user.subscription?.endDate || 'N/A'}
          </Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

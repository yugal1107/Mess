import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '../src/hooks/AuthContext';
import apiClient from '../src/api/client';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setToken, setUser } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.signup_success === 'true') {
      setSuccess('Account created successfully! Please log in.');
    }
  }, [params]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // 1. Login to get the token
      const loginResponse = await apiClient.post('/auth/login', { email, password });
      const { accessToken } = loginResponse.data.data; // Correctly access the nested data object
      setToken(accessToken);

      // 2. Set the token for all future API requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 3. Fetch user profile
      const profileResponse = await apiClient.get('/user');
      setUser(profileResponse.data.data); // Also access nested data here

      // 4. Navigate to the main app screen
      router.replace('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Welcome Back!
      </Text>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        disabled={loading}
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        disabled={loading}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
      <Link href="/signup" asChild>
        <Button mode="text" disabled={loading}>
          Don't have an account? Sign Up
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});



import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import apiClient from '../src/api/client';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    // Frontend Validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await apiClient.post('/auth/signup', {
        name,
        email,
        password,
        role: 'STUDENT', // Default role for now
      });
      // Navigate to login screen with a success message
      router.replace({
        pathname: '/login',
        params: { signup_success: 'true' },
      });
    } catch (err: any) {
      console.error('Sign up error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Create Account
      </Text>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        label="Name"
        mode="outlined"
        style={styles.input}
        value={name}
        onChangeText={setName}
        disabled={loading}
      />
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
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </Button>
      <Link href="/login" asChild>
        <Button mode="text" disabled={loading}>
          Already have an account? Login
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
});



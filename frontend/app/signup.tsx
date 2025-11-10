import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import apiClient from '../src/api/client';
import StyledTextInput from '../src/components/StyledTextInput';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
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
        role: 'STUDENT',
      });
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
      <StyledTextInput
        label="Name"
        value={name}
        onChangeText={setName}
        disabled={loading}
      />
      <StyledTextInput
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        disabled={loading}
      />
      <StyledTextInput
        label="Password"
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



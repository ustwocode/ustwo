import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Auth: undefined;
  DailyJournal: undefined;
};

const AuthScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    try {
      // Check internet connection
      const test = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      await test.json();
    } catch (err: any) {
      console.log('❌ INTERNET FAIL:', err.message);
      Alert.alert('Internet Error', 'Could not connect to any server.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://auyunzaccsixnnegdusu.supabase.co/auth/v1/' + (isLogin ? 'token?grant_type=password' : 'signup'), {
        method: 'POST',
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eXVuemFjY3NpeG5uZWdkdXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzI4MzMsImV4cCI6MjA2Njc0ODgzM30.uIH2W6DywpDoaOBaKBClzuKUNh90UKEcQcEH4mloBN4',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();
      console.log('✅ AUTH RESULT:', result);

      if (!res.ok) {
        throw new Error(result.error_description || result.msg || 'Authentication failed');
      }

      Alert.alert('Success 💖', isLogin ? 'Logged in!' : 'Account created!');
      navigation.navigate('DailyJournal');
    } catch (err: any) {
      console.log('❌ SUPABASE ERROR:', err.message);
      Alert.alert('Supabase Error', err.message);
    }

    setLoading(false);
  };

  return (
    <LinearGradient colors={['#FFE4E1', '#FFF0F5']} style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/VKZsmZb.gif' }}
        style={styles.animatedHeart}
      />
      <Text style={styles.title}>UsTwo 💑</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.form}
      >
        <TextInput
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Log In' : 'Sign Up'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already a lover? Log In'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  animatedHeart: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    color: '#FF69B4',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    color: '#DB7093',
    fontSize: 14,
  },
});

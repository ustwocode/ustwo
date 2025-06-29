// screens/CouplePairingScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const generateLoveCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const CouplePairingScreen = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCreate = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('Error', 'Could not fetch user.');
      return;
    }

    const newCode = generateLoveCode();

    const { error } = await supabase.from('couples').insert([
      { love_code: newCode, user_id_1: user.id },
    ]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Love code created 💕', `Your code: ${newCode}`);
      navigation.navigate('DailyJournal');
    }
  };

  const handleJoin = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('Error', 'Could not fetch user.');
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('couples')
      .select('*')
      .eq('love_code', code)
      .single();

    if (fetchError || !data) {
      Alert.alert('Oops!', 'Love code not found!');
      return;
    }

    const { error: updateError } = await supabase
      .from('couples')
      .update({ user_id_2: user.id })
      .eq('love_code', code);

    if (updateError) {
      Alert.alert('Error', updateError.message);
    } else {
      Alert.alert('Joined 💞', 'You are now paired!');
      navigation.navigate('DailyJournal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pair with your love 💑</Text>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>💌 Create Love Code</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TextInput
        placeholder="Enter Love Code"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>🔗 Join Using Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CouplePairingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    color: '#DB7093',
    marginVertical: 10,
  },
});

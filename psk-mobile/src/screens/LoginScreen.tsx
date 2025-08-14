import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const { signIn, isLoading } = useAuth();
  const [email, setEmail] = useState<string>('demo@company.com');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    try {
      await signIn(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Ошибка входа', e?.message || 'Не удалось войти');
    }
  };

  const disabled = isLoading || !email;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={styles.card}>
        <Text style={styles.title}>Вход</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled]} onPress={onSubmit} disabled={disabled}>
          <Text style={styles.buttonText}>{isLoading ? 'Загрузка…' : 'Войти'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f5f6fa' },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  button: { backgroundColor: '#2f80ed', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default LoginScreen;
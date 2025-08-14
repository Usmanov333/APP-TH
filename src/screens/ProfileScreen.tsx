import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Профиль</Text>
        <Text style={styles.item}>Имя: {user?.name}</Text>
        <Text style={styles.item}>Email: {user?.email}</Text>
        <Text style={styles.item}>Роль: {user?.role}</Text>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#f5f6fa' },
  card: { width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 12, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  item: { marginBottom: 8 },
  button: { backgroundColor: '#eb5757', paddingVertical: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});

export default ProfileScreen;
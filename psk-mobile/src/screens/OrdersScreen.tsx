import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchOrders } from '../services/api';
import { Order } from '../services/mockData';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OrdersStackParamList } from '../navigation/AppNavigator';

const statusTitle: Record<Order['status'], string> = {
  new: 'Новый',
  in_progress: 'В работе',
  paused: 'Пауза',
  completed: 'Завершен',
};

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders || []}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}>
          <View style={styles.row}>
            <Text style={styles.id}>{item.id}</Text>
            <Text style={styles.status}>{statusTitle[item.status]}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.site} • {new Date(item.updatedAt).toLocaleString()}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  item: { backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  id: { fontWeight: '700' },
  status: { color: '#2f80ed', fontWeight: '600' },
  title: { fontSize: 16, marginBottom: 4 },
  meta: { color: '#666' },
  separator: { height: 12 },
});

export default OrdersScreen;
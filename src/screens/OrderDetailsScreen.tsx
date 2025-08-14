import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { OrdersStackParamList } from '../navigation/AppNavigator';
import { fetchOrderById } from '../services/api';
import { Order } from '../services/mockData';

const OrderDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<OrdersStackParamList, 'OrderDetails'>>();
  const { orderId } = route.params;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchOrderById(orderId);
        setOrder(data || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orderId]);

  if (loading || !order) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.id}>{order.id}</Text>
      <Text style={styles.title}>{order.title}</Text>
      <Text style={styles.meta}>Объект: {order.site}</Text>
      <Text style={styles.meta}>Статус: {order.status}</Text>
      <Text style={styles.meta}>Обновлен: {new Date(order.updatedAt).toLocaleString()}</Text>
      <View style={{ height: 16 }} />
      <Text style={styles.sectionTitle}>Прогресс и задачи</Text>
      <Text style={styles.text}>Далее можно подключить реальные данные по прогрессу, этапам, загружать фото/акты и т.д.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { padding: 16 },
  id: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  meta: { color: '#555', marginBottom: 4 },
  sectionTitle: { marginTop: 8, fontSize: 16, fontWeight: '600' },
  text: { marginTop: 6, color: '#333', lineHeight: 20 },
});

export default OrderDetailsScreen;
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import CamerasScreen from '../screens/CamerasScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
};

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: { orderId: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();
const Tab = createBottomTabNavigator();

const OrdersStackNavigator: React.FC = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="OrdersList" component={OrdersScreen} options={{ title: 'Заказы' }} />
      <OrdersStack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Детали заказа' }} />
    </OrdersStack.Navigator>
  );
};

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrdersStackNavigator} options={{ title: 'Заказы', headerShown: false }} />
      <Tab.Screen name="Cameras" component={CamerasScreen} options={{ title: 'Камеры' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <RootStack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <RootStack.Screen name="Auth" component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
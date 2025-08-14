import axios from 'axios';
import { mockOrders, mockCameras, Order, Camera } from './mockData';
import { UserProfile } from '../context/AuthContext';

// Placeholder for future real API
export const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

export async function login(email: string, _password: string): Promise<{ token: string; user: UserProfile }> {
  await delay(600);
  const user: UserProfile = {
    id: 'user-1',
    name: 'Демо Пользователь',
    email,
    role: 'manager',
  };
  return { token: 'mock-token-123', user };
}

export async function fetchOrders(_token?: string): Promise<Order[]> {
  await delay(400);
  return mockOrders;
}

export async function fetchOrderById(orderId: string, _token?: string): Promise<Order | undefined> {
  await delay(300);
  return mockOrders.find(o => o.id === orderId);
}

export async function fetchCameras(_token?: string): Promise<Camera[]> {
  await delay(500);
  return mockCameras;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
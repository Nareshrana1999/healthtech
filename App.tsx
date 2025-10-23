// Main App Entry Point
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import Navigation from './src/navigation';
import { useAuthStore, useNotificationStore } from './src/store';
import ApiService from './src/services/api';

export default function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const setNotifications = useNotificationStore((state) => state.setNotifications);

  useEffect(() => {
    // Initialize app
    initializeApp();
    
    // Request notification permissions
    requestNotificationPermissions();
  }, []);

  const initializeApp = async () => {
    try {
      // Check if user is already logged in
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const userData = await ApiService.getCurrentUser();
        setUser(userData);
        
        // Load notifications
        const notifications = await ApiService.getNotifications();
        setNotifications(notifications);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
      setUser(null);
    }
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      // Get push notification token
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);
      // TODO: Send token to backend
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Navigation />
    </GestureHandlerRootView>
  );
}

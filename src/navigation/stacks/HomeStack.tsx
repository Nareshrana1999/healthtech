// Home Stack Navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import { theme } from '../../theme';

// Import screens (placeholders for now)
import DashboardScreen from '../../screens/home/DashboardScreen';
import AITriageScreen from '../../screens/home/AITriageScreen';
import AITriageSessionScreen from '../../screens/home/AITriageSessionScreen';
import NotificationsScreen from '../../screens/home/NotificationsScreen';
import NotificationDetailScreen from '../../screens/home/NotificationDetailScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.bold },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="AITriage" component={AITriageScreen} options={{ title: 'AI Triage' }} />
      <Stack.Screen name="AITriageSession" component={AITriageSessionScreen} options={{ title: 'Triage Session' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Notification' }} />
    </Stack.Navigator>
  );
}

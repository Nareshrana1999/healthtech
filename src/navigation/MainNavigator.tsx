// Main Tab Navigator
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import { theme } from '../theme';
import { useNotificationStore, useAuthStore } from '../store';

// Import Stack Navigators
import HomeStackNavigator from './stacks/HomeStack';
import PatientStackNavigator from './stacks/PatientStack';
import AppointmentStackNavigator from './stacks/AppointmentStack';
import ReportStackNavigator from './stacks/ReportStack';
import MoreStackNavigator from './stacks/MoreStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const user = useAuthStore((state) => state.user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      
      {(user?.role === 'provider' || user?.role === 'admin') && (
        <Tab.Screen
          name="PatientsTab"
          component={PatientStackNavigator}
          options={{
            tabBarLabel: 'Patients',
            tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
          }}
        />
      )}
      
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentStackNavigator}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      
      <Tab.Screen
        name="ReportsTab"
        component={ReportStackNavigator}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
        }}
      />
      
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

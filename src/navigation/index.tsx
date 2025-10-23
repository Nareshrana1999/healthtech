// Main Navigation Container
import React, { useEffect } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

import { useAuthStore } from '../store';
import { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Deep linking configuration
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'healthtech://', 'https://healthtech.app'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          SignUp: 'signup',
          ForgotPassword: 'forgot-password',
        },
      },
      Main: {
        screens: {
          HomeTab: {
            screens: {
              Dashboard: 'dashboard',
              AITriage: 'triage',
              AITriageSession: 'triage/:sessionId',
              Notifications: 'notifications',
              NotificationDetail: 'notifications/:notificationId',
            },
          },
          PatientsTab: {
            screens: {
              PatientList: 'patients',
              PatientDetail: 'patients/:patientId',
              PatientTimeline: 'patients/:patientId/timeline',
            },
          },
          AppointmentsTab: {
            screens: {
              AppointmentCalendar: 'appointments',
              AppointmentDetail: 'appointments/:appointmentId',
              BookAppointment: 'appointments/book',
            },
          },
          ReportsTab: {
            screens: {
              ReportList: 'reports',
              ReportDetail: 'reports/:reportId',
            },
          },
          MoreTab: {
            screens: {
              MoreMenu: 'more',
              Profile: 'profile',
              Settings: 'settings',
              Encounters: 'encounters',
              EncounterDetail: 'encounters/:encounterId',
            },
          },
        },
      },
      FullScreenReport: 'reports/:reportId/fullscreen',
      VideoCall: 'video-call/:appointmentId',
    },
  },
};

export default function Navigation() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Configure notification handling
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Handle notification responses (user taps on notification)
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      // Navigation will be handled by deep linking
      if (data.deepLink) {
        Linking.openURL(data.deepLink);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

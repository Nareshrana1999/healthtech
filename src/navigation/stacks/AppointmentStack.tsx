// Appointment Stack Navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentStackParamList } from '../types';
import { theme } from '../../theme';

import AppointmentCalendarScreen from '../../screens/appointments/AppointmentCalendarScreen';
import AppointmentDetailScreen from '../../screens/appointments/AppointmentDetailScreen';
import BookAppointmentScreen from '../../screens/appointments/BookAppointmentScreen';
import EditAppointmentScreen from '../../screens/appointments/EditAppointmentScreen';

const Stack = createStackNavigator<AppointmentStackParamList>();

export default function AppointmentStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.bold },
      }}
    >
      <Stack.Screen name="AppointmentCalendar" component={AppointmentCalendarScreen} options={{ title: 'Appointments' }} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} options={{ title: 'Appointment Details' }} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} options={{ title: 'Book Appointment' }} />
      <Stack.Screen name="EditAppointment" component={EditAppointmentScreen} options={{ title: 'Edit Appointment' }} />
    </Stack.Navigator>
  );
}

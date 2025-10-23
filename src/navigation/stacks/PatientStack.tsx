// Patient Stack Navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PatientStackParamList } from '../types';
import { theme } from '../../theme';

import PatientListScreen from '../../screens/patients/PatientListScreen';
import PatientDetailScreen from '../../screens/patients/PatientDetailScreen';
import PatientTimelineScreen from '../../screens/patients/PatientTimelineScreen';
import AddPatientScreen from '../../screens/patients/AddPatientScreen';
import EditPatientScreen from '../../screens/patients/EditPatientScreen';

const Stack = createStackNavigator<PatientStackParamList>();

export default function PatientStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.bold },
      }}
    >
      <Stack.Screen name="PatientList" component={PatientListScreen} options={{ title: 'Patients' }} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} options={{ title: 'Patient Details' }} />
      <Stack.Screen name="PatientTimeline" component={PatientTimelineScreen} options={{ title: 'Medical Timeline' }} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Add Patient' }} />
      <Stack.Screen name="EditPatient" component={EditPatientScreen} options={{ title: 'Edit Patient' }} />
    </Stack.Navigator>
  );
}

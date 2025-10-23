// Report Stack Navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReportStackParamList } from '../types';
import { theme } from '../../theme';

import ReportListScreen from '../../screens/reports/ReportListScreen';
import ReportDetailScreen from '../../screens/reports/ReportDetailScreen';
import CreateReportScreen from '../../screens/reports/CreateReportScreen';
import EditReportScreen from '../../screens/reports/EditReportScreen';
import SignReportScreen from '../../screens/reports/SignReportScreen';
import ShareReportScreen from '../../screens/reports/ShareReportScreen';

const Stack = createStackNavigator<ReportStackParamList>();

export default function ReportStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.bold },
      }}
    >
      <Stack.Screen name="ReportList" component={ReportListScreen} options={{ title: 'Reports' }} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} options={{ title: 'Report Details' }} />
      <Stack.Screen name="CreateReport" component={CreateReportScreen} options={{ title: 'Create Report' }} />
      <Stack.Screen name="EditReport" component={EditReportScreen} options={{ title: 'Edit Report' }} />
      <Stack.Screen name="SignReport" component={SignReportScreen} options={{ title: 'Sign Report' }} />
      <Stack.Screen name="ShareReport" component={ShareReportScreen} options={{ title: 'Share Report' }} />
    </Stack.Navigator>
  );
}

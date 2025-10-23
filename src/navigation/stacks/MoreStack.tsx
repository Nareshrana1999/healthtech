// More Stack Navigator
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreStackParamList } from '../types';
import { theme } from '../../theme';

import MoreMenuScreen from '../../screens/more/MoreMenuScreen';
import ProfileScreen from '../../screens/more/ProfileScreen';
import EditProfileScreen from '../../screens/more/EditProfileScreen';
import SettingsScreen from '../../screens/more/SettingsScreen';
import PrivacySettingsScreen from '../../screens/more/PrivacySettingsScreen';
import SecuritySettingsScreen from '../../screens/more/SecuritySettingsScreen';
import NotificationSettingsScreen from '../../screens/more/NotificationSettingsScreen';
import IntegrationsScreen from '../../screens/more/IntegrationsScreen';
import EpicIntegrationScreen from '../../screens/more/EpicIntegrationScreen';
import ProvidersScreen from '../../screens/more/ProvidersScreen';
import ProviderDetailScreen from '../../screens/more/ProviderDetailScreen';
import EncountersScreen from '../../screens/more/EncountersScreen';
import EncounterDetailScreen from '../../screens/more/EncounterDetailScreen';
import CreateEncounterScreen from '../../screens/more/CreateEncounterScreen';
import EditEncounterScreen from '../../screens/more/EditEncounterScreen';
import HelpSupportScreen from '../../screens/more/HelpSupportScreen';
import AboutScreen from '../../screens/more/AboutScreen';

const Stack = createStackNavigator<MoreStackParamList>();

export default function MoreStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: { fontWeight: theme.typography.fontWeight.bold },
      }}
    >
      <Stack.Screen name="MoreMenu" component={MoreMenuScreen} options={{ title: 'More' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ title: 'Privacy Settings' }} />
      <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} options={{ title: 'Security Settings' }} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="Integrations" component={IntegrationsScreen} options={{ title: 'Integrations' }} />
      <Stack.Screen name="EpicIntegration" component={EpicIntegrationScreen} options={{ title: 'Epic EHR' }} />
      <Stack.Screen name="Providers" component={ProvidersScreen} options={{ title: 'Providers' }} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} options={{ title: 'Provider Details' }} />
      <Stack.Screen name="Encounters" component={EncountersScreen} options={{ title: 'Encounters' }} />
      <Stack.Screen name="EncounterDetail" component={EncounterDetailScreen} options={{ title: 'Encounter Details' }} />
      <Stack.Screen name="CreateEncounter" component={CreateEncounterScreen} options={{ title: 'New Encounter' }} />
      <Stack.Screen name="EditEncounter" component={EditEncounterScreen} options={{ title: 'Edit Encounter' }} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: 'Help & Support' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Stack.Navigator>
  );
}

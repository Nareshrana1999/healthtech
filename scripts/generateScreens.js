// Script to generate all screen placeholders
const fs = require('fs');
const path = require('path');

const screenTemplate = (screenName, title) => `// ${screenName}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default function ${screenName}() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${title}</Text>
      <Text style={styles.subtitle}>This screen is under development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
});
`;

const screens = {
  home: [
    { name: 'AITriageScreen', title: 'AI Voice Triage' },
    { name: 'AITriageSessionScreen', title: 'Triage Session' },
    { name: 'NotificationsScreen', title: 'Notifications' },
    { name: 'NotificationDetailScreen', title: 'Notification Details' },
  ],
  patients: [
    { name: 'PatientListScreen', title: 'Patients' },
    { name: 'PatientDetailScreen', title: 'Patient Details' },
    { name: 'PatientTimelineScreen', title: 'Medical Timeline' },
    { name: 'AddPatientScreen', title: 'Add Patient' },
    { name: 'EditPatientScreen', title: 'Edit Patient' },
  ],
  appointments: [
    { name: 'AppointmentCalendarScreen', title: 'Appointments' },
    { name: 'AppointmentDetailScreen', title: 'Appointment Details' },
    { name: 'BookAppointmentScreen', title: 'Book Appointment' },
    { name: 'EditAppointmentScreen', title: 'Edit Appointment' },
  ],
  reports: [
    { name: 'ReportListScreen', title: 'Reports' },
    { name: 'ReportDetailScreen', title: 'Report Details' },
    { name: 'CreateReportScreen', title: 'Create Report' },
    { name: 'EditReportScreen', title: 'Edit Report' },
    { name: 'SignReportScreen', title: 'Sign Report' },
    { name: 'ShareReportScreen', title: 'Share Report' },
  ],
  more: [
    { name: 'MoreMenuScreen', title: 'More Options' },
    { name: 'ProfileScreen', title: 'Profile' },
    { name: 'EditProfileScreen', title: 'Edit Profile' },
    { name: 'SettingsScreen', title: 'Settings' },
    { name: 'PrivacySettingsScreen', title: 'Privacy Settings' },
    { name: 'SecuritySettingsScreen', title: 'Security Settings' },
    { name: 'NotificationSettingsScreen', title: 'Notification Settings' },
    { name: 'IntegrationsScreen', title: 'Integrations' },
    { name: 'EpicIntegrationScreen', title: 'Epic EHR Integration' },
    { name: 'ProvidersScreen', title: 'Providers' },
    { name: 'ProviderDetailScreen', title: 'Provider Details' },
    { name: 'EncountersScreen', title: 'Encounters' },
    { name: 'EncounterDetailScreen', title: 'Encounter Details' },
    { name: 'CreateEncounterScreen', title: 'Create Encounter' },
    { name: 'EditEncounterScreen', title: 'Edit Encounter' },
    { name: 'HelpSupportScreen', title: 'Help & Support' },
    { name: 'AboutScreen', title: 'About HealthTech' },
  ],
};

const baseDir = path.join(__dirname, '..');

Object.entries(screens).forEach(([folder, screenList]) => {
  const folderPath = path.join(baseDir, 'screens', folder);
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  screenList.forEach(({ name, title }) => {
    const filePath = path.join(folderPath, `${name}.tsx`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, screenTemplate(name, title));
      console.log(`Created: ${filePath}`);
    }
  });
});

console.log('All screens generated successfully!');

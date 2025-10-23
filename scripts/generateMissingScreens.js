const fs = require('fs');
const path = require('path');

const screenTemplate = (screenName, folderName, navType) => `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ${navType}ParamList } from '../../navigation/types';
import { theme } from '../../theme';

type ${screenName}Props = {
  navigation: NativeStackNavigationProp<${navType}ParamList, '${screenName.replace('Screen', '')}'>;
};

export default function ${screenName}({ navigation }: ${screenName}Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${screenName.replace('Screen', '').replace(/([A-Z])/g, ' $1').trim()}</Text>
      <Text style={styles.subtitle}>This screen is under development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginBottom: theme.spacing.md },
  subtitle: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary },
});
`;

const screens = {
  patients: {
    navType: 'PatientStack',
    screens: ['PatientListScreen', 'PatientDetailScreen', 'PatientTimelineScreen', 'AddPatientScreen', 'EditPatientScreen']
  },
  appointments: {
    navType: 'AppointmentStack',
    screens: ['AppointmentCalendarScreen', 'AppointmentDetailScreen', 'BookAppointmentScreen', 'EditAppointmentScreen']
  },
  reports: {
    navType: 'ReportStack',
    screens: ['ReportListScreen', 'ReportDetailScreen', 'CreateReportScreen', 'EditReportScreen', 'SignReportScreen', 'ShareReportScreen']
  },
  more: {
    navType: 'MoreStack',
    screens: [
      'MoreMenuScreen', 'ProfileScreen', 'EditProfileScreen', 'SettingsScreen',
      'PrivacySettingsScreen', 'SecuritySettingsScreen', 'NotificationSettingsScreen',
      'IntegrationsScreen', 'EpicIntegrationScreen', 'ProvidersScreen', 'ProviderDetailScreen',
      'EncountersScreen', 'EncounterDetailScreen', 'CreateEncounterScreen', 'EditEncounterScreen',
      'HelpSupportScreen', 'AboutScreen'
    ]
  }
};

const baseDir = path.join(__dirname, '../src/screens');

Object.entries(screens).forEach(([folder, config]) => {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  config.screens.forEach(screenName => {
    const filePath = path.join(folderPath, `${screenName}.tsx`);
    const content = screenTemplate(screenName, folder, config.navType);
    fs.writeFileSync(filePath, content);
    console.log(`Created: ${filePath}`);
  });
});

console.log('All screens generated successfully!');

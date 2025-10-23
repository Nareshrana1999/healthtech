import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoreStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type NotificationSettingsScreenProps = {
  navigation: NativeStackNavigationProp<MoreStackParamList, 'NotificationSettings'>;
};

export default function NotificationSettingsScreen({ navigation }: NotificationSettingsScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <Text style={styles.subtitle}>This screen is under development</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginBottom: theme.spacing.md },
  subtitle: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary },
});

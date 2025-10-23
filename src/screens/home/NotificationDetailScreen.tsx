import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type NotificationDetailScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'NotificationDetail'>;
  route: RouteProp<HomeStackParamList, 'NotificationDetail'>;
};

export default function NotificationDetailScreen({ navigation, route }: NotificationDetailScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Detail</Text>
      <Text style={styles.text}>ID: {route.params.notificationId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md },
  text: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary },
});

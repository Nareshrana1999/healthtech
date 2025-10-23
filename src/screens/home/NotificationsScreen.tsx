import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type NotificationsScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Notifications'>;
};

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const notifications: any[] = []; // Placeholder

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={80} color={theme.colors.textTertiary} />
          <Text style={styles.emptyText}>No notifications</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item: any) => item.id}
          renderItem={() => null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: theme.typography.fontSize.lg, color: theme.colors.textSecondary, marginTop: theme.spacing.md },
});

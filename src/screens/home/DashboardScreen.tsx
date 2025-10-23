// Dashboard Screen - Role-based home screen
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAuthStore } from '../../store';
import ApiService from '../../services/api';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Load role-specific dashboard data
      const data = await ApiService.getCurrentUser();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  if (loading && !dashboardData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('AITriage')}
          >
            <Ionicons name="mic" size={32} color={theme.colors.primary} />
            <Text style={styles.quickActionText}>AI Triage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications" size={32} color={theme.colors.secondary} />
            <Text style={styles.quickActionText}>Notifications</Text>
          </TouchableOpacity>

          {user?.role === 'provider' && (
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="people" size={32} color={theme.colors.info} />
              <Text style={styles.quickActionText}>My Patients</Text>
            </TouchableOpacity>
          )}

          {user?.role === 'patient' && (
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="calendar" size={32} color={theme.colors.warning} />
              <Text style={styles.quickActionText}>Book Appointment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.card}>
          <Text style={styles.placeholderText}>No recent activity</Text>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.card}>
          <Text style={styles.placeholderText}>No upcoming appointments</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.backgroundSecondary },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  header: { backgroundColor: theme.colors.primary, padding: theme.spacing.lg, paddingTop: theme.spacing.xxl, borderBottomLeftRadius: theme.borderRadius.xl, borderBottomRightRadius: theme.borderRadius.xl },
  greeting: { fontSize: theme.typography.fontSize.lg, color: theme.colors.textInverse, opacity: 0.9 },
  userName: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textInverse, marginTop: theme.spacing.xs },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs, borderRadius: theme.borderRadius.full, alignSelf: 'flex-start', marginTop: theme.spacing.sm },
  roleText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.xs, fontWeight: theme.typography.fontWeight.semibold },
  section: { padding: theme.spacing.md, marginTop: theme.spacing.sm },
  sectionTitle: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.textPrimary, marginBottom: theme.spacing.md },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.md },
  quickActionCard: { backgroundColor: theme.colors.background, padding: theme.spacing.md, borderRadius: theme.borderRadius.lg, alignItems: 'center', width: '47%', ...theme.shadows.sm },
  quickActionText: { fontSize: theme.typography.fontSize.sm, color: theme.colors.textPrimary, marginTop: theme.spacing.sm, fontWeight: theme.typography.fontWeight.medium },
  card: { backgroundColor: theme.colors.background, padding: theme.spacing.lg, borderRadius: theme.borderRadius.lg, ...theme.shadows.sm },
  placeholderText: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary, textAlign: 'center' },
});

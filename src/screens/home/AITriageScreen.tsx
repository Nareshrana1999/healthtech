import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type AITriageScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'AITriage'>;
};

export default function AITriageScreen({ navigation }: AITriageScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="mic-circle" size={120} color={theme.colors.primary} />
        <Text style={styles.title}>AI Voice Triage</Text>
        <Text style={styles.description}>
          Start a voice session to get an AI-powered health assessment
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AITriageSession', {})}
        >
          <Ionicons name="mic" size={24} color={theme.colors.textInverse} />
          <Text style={styles.buttonText}>Start Triage Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginTop: theme.spacing.lg, marginBottom: theme.spacing.md },
  description: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.spacing.xl },
  button: { flexDirection: 'row', backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl, borderRadius: theme.borderRadius.lg, alignItems: 'center', gap: theme.spacing.sm },
  buttonText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold },
});

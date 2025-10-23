// MFA Verification Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAuthStore } from '../../store';
import ApiService from '../../services/api';

type MFAVerificationScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'MFAVerification'>;
  route: RouteProp<AuthStackParamList, 'MFAVerification'>;
};

export default function MFAVerificationScreen({ navigation, route }: MFAVerificationScreenProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.verifyMFA(code);
      setUser(response.user);
    } catch (error: any) {
      Alert.alert('Verification Failed', error.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two-Factor Authentication</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {route.params.email}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.codeInput}
          placeholder="000000"
          placeholderTextColor={theme.colors.textTertiary}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={loading}>
          {loading ? <ActivityIndicator color={theme.colors.textInverse} /> : <Text style={styles.verifyButtonText}>Verify</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xxl * 2 },
  title: { fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  subtitle: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary, marginBottom: theme.spacing.xl },
  form: { marginTop: theme.spacing.xl, alignItems: 'center' },
  codeInput: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.lg, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md, fontSize: theme.typography.fontSize['2xl'], color: theme.colors.textPrimary, textAlign: 'center', letterSpacing: 10, width: '80%', marginBottom: theme.spacing.xl },
  verifyButton: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xxl, borderRadius: theme.borderRadius.lg, marginBottom: theme.spacing.md, width: '80%', alignItems: 'center' },
  verifyButtonText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold },
  resendButton: { paddingVertical: theme.spacing.md },
  resendButtonText: { color: theme.colors.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.medium },
});

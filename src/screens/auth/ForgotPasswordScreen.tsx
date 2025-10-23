// Forgot Password Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import ApiService from '../../services/api';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await ApiService.resetPassword(email);
      Alert.alert('Success', 'Password reset link sent to your email', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your password
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textTertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={loading}>
          {loading ? <ActivityIndicator color={theme.colors.textInverse} /> : <Text style={styles.resetButtonText}>Send Reset Link</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xxl * 2 },
  title: { fontSize: theme.typography.fontSize['3xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  subtitle: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary, marginBottom: theme.spacing.xl, lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base },
  form: { marginTop: theme.spacing.lg },
  inputContainer: { marginBottom: theme.spacing.xl },
  label: { fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.medium, color: theme.colors.textPrimary, marginBottom: theme.spacing.sm },
  input: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.borderRadius.lg, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, fontSize: theme.typography.fontSize.base, color: theme.colors.textPrimary },
  resetButton: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, borderRadius: theme.borderRadius.lg, alignItems: 'center', marginBottom: theme.spacing.md },
  resetButtonText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold },
  backButton: { alignItems: 'center', paddingVertical: theme.spacing.md },
  backButtonText: { color: theme.colors.primary, fontSize: theme.typography.fontSize.base, fontWeight: theme.typography.fontWeight.medium },
});

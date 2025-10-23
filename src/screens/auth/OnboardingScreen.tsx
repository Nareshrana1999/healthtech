// Onboarding Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'medical' as const,
    title: 'Comprehensive Health Records',
    description: 'Access your complete medical history, lab results, and prescriptions all in one secure place',
  },
  {
    icon: 'mic' as const,
    title: 'AI-Powered Triage',
    description: 'Get instant health assessments through our advanced voice-activated AI system',
  },
  {
    icon: 'calendar' as const,
    title: 'Easy Appointment Booking',
    description: 'Schedule appointments with healthcare providers quickly and conveniently',
  },
  {
    icon: 'shield-checkmark' as const,
    title: 'HIPAA Compliant & Secure',
    description: 'Your health data is protected with enterprise-grade encryption and security',
  },
];

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Ionicons name={slides[currentIndex].icon} size={120} color={theme.colors.primary} />
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.description}>{slides[currentIndex].description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentIndex && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  slideContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.xl },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, color: theme.colors.textPrimary, marginTop: theme.spacing.xl, marginBottom: theme.spacing.md, textAlign: 'center' },
  description: { fontSize: theme.typography.fontSize.base, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base },
  footer: { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xxl },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginBottom: theme.spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.border, marginHorizontal: 4 },
  activeDot: { backgroundColor: theme.colors.primary, width: 24 },
  nextButton: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, borderRadius: theme.borderRadius.lg, alignItems: 'center', marginBottom: theme.spacing.md },
  nextButtonText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold },
  skipText: { color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.base, textAlign: 'center' },
});

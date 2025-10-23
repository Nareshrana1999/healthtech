import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type AITriageSessionScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'AITriageSession'>;
  route: RouteProp<HomeStackParamList, 'AITriageSession'>;
};

export default function AITriageSessionScreen({ navigation, route }: AITriageSessionScreenProps) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Recording Session</Text>
        <View style={styles.recordButton}>
          <Ionicons 
            name={isRecording ? "stop-circle" : "mic-circle"} 
            size={100} 
            color={isRecording ? theme.colors.error : theme.colors.primary} 
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isRecording && styles.buttonStop]}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  title: { fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.xl },
  recordButton: { marginVertical: theme.spacing.xxl },
  button: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xxl, borderRadius: theme.borderRadius.lg, marginTop: theme.spacing.xl },
  buttonStop: { backgroundColor: theme.colors.error },
  buttonText: { color: theme.colors.textInverse, fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold },
});

// Core Types for HealthTech Application

export type UserRole = 'patient' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  dateOfBirth?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  role: 'patient';
  medicalRecordNumber: string;
  assignedProviders: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
}

export interface Provider extends User {
  role: 'provider';
  specialty: string;
  licenseNumber: string;
  credentials: string[];
  acceptingNewPatients: boolean;
  locations: string[];
  availableHours?: {
    [day: string]: { start: string; end: string }[];
  };
}

export interface Encounter {
  id: string;
  patientId: string;
  providerId: string;
  type: 'triage' | 'in-person' | 'virtual' | 'follow-up';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  chiefComplaint?: string;
  dateTime: string;
  duration?: number;
  location?: string;
  notes?: string;
  reports: string[];
  triageSessionId?: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  encounterId: string;
  patientId: string;
  providerId: string;
  type: 'progress-note' | 'lab-result' | 'imaging' | 'discharge-summary' | 'consult';
  title: string;
  content: string;
  status: 'draft' | 'pending-review' | 'signed' | 'amended';
  signature?: {
    providerId: string;
    timestamp: string;
    digitalSignature: string;
  };
  isPrivate: boolean;
  shareWith: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TriageSession {
  id: string;
  patientId: string;
  audioUrl: string;
  transcript: string;
  aiAnalysis: {
    urgencyLevel: 'low' | 'moderate' | 'high' | 'critical';
    symptoms: string[];
    suggestedActions: string[];
    confidence: number;
  };
  duration: number;
  status: 'active' | 'completed' | 'archived';
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  dateTime: string;
  duration: number;
  type: 'in-person' | 'virtual' | 'phone';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  location?: string;
  videoCallLink?: string;
  reminders?: {
    sent: boolean;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'report' | 'message' | 'system' | 'alert';
  title: string;
  message: string;
  data?: any;
  deepLink?: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  timestamp: string;
}

export interface ApiIntegration {
  id: string;
  name: string;
  type: 'epic' | 'lab' | 'imaging' | 'pharmacy' | 'other';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config: {
    baseUrl: string;
    clientId?: string;
    scopes?: string[];
  };
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    appointments: boolean;
    reports: boolean;
    messages: boolean;
  };
  security: {
    biometricEnabled: boolean;
    pinEnabled: boolean;
    sessionTimeout: number;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'x-large';
    highContrast: boolean;
  };
}

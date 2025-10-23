// Navigation Types
import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MFAVerification: { email: string };
  Onboarding: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  PatientsTab: NavigatorScreenParams<PatientStackParamList>;
  AppointmentsTab: NavigatorScreenParams<AppointmentStackParamList>;
  ReportsTab: NavigatorScreenParams<ReportStackParamList>;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  Dashboard: undefined;
  AITriage: undefined;
  AITriageSession: { sessionId?: string };
  Notifications: undefined;
  NotificationDetail: { notificationId: string };
};

// Patient Stack
export type PatientStackParamList = {
  PatientList: undefined;
  PatientDetail: { patientId: string };
  PatientTimeline: { patientId: string };
  AddPatient: undefined;
  EditPatient: { patientId: string };
};

// Appointment Stack
export type AppointmentStackParamList = {
  AppointmentCalendar: undefined;
  AppointmentDetail: { appointmentId: string };
  BookAppointment: { patientId?: string; providerId?: string };
  EditAppointment: { appointmentId: string };
};

// Report Stack
export type ReportStackParamList = {
  ReportList: undefined;
  ReportDetail: { reportId: string };
  CreateReport: { encounterId: string };
  EditReport: { reportId: string };
  SignReport: { reportId: string };
  ShareReport: { reportId: string };
};

// More/Settings Stack
export type MoreStackParamList = {
  MoreMenu: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  PrivacySettings: undefined;
  SecuritySettings: undefined;
  NotificationSettings: undefined;
  Integrations: undefined;
  EpicIntegration: undefined;
  Providers: undefined;
  ProviderDetail: { providerId: string };
  Encounters: undefined;
  EncounterDetail: { encounterId: string };
  CreateEncounter: { patientId?: string };
  EditEncounter: { encounterId: string };
  HelpSupport: undefined;
  About: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Modal Screens
  FullScreenReport: { reportId: string };
  VideoCall: { appointmentId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

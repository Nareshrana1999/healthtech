// API Service for HealthTech Application
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.healthtech.example.com';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token expiration
          await this.handleTokenExpiration();
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleTokenExpiration() {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
    // Navigate to login screen (handled by navigation service)
  }

  // Authentication APIs
  async login(email: string, password: string) {
    const response = await this.axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      await SecureStore.setItemAsync('authToken', response.data.token);
      if (response.data.refreshToken) {
        await SecureStore.setItemAsync('refreshToken', response.data.refreshToken);
      }
    }
    return response.data;
  }

  async signUp(userData: any) {
    const response = await this.axiosInstance.post('/auth/signup', userData);
    return response.data;
  }

  async logout() {
    try {
      await this.axiosInstance.post('/auth/logout');
    } finally {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('refreshToken');
    }
  }

  async resetPassword(email: string) {
    const response = await this.axiosInstance.post('/auth/reset-password', { email });
    return response.data;
  }

  async verifyMFA(code: string) {
    const response = await this.axiosInstance.post('/auth/verify-mfa', { code });
    return response.data;
  }

  // Patient APIs
  async getPatients(params?: { search?: string; limit?: number; offset?: number }) {
    const response = await this.axiosInstance.get('/patients', { params });
    return response.data;
  }

  async getPatientById(id: string) {
    const response = await this.axiosInstance.get(`/patients/${id}`);
    return response.data;
  }

  async updatePatient(id: string, data: any) {
    const response = await this.axiosInstance.put(`/patients/${id}`, data);
    return response.data;
  }

  async getPatientTimeline(id: string) {
    const response = await this.axiosInstance.get(`/patients/${id}/timeline`);
    return response.data;
  }

  // Provider APIs
  async getProviders(params?: { specialty?: string; location?: string }) {
    const response = await this.axiosInstance.get('/providers', { params });
    return response.data;
  }

  async getProviderById(id: string) {
    const response = await this.axiosInstance.get(`/providers/${id}`);
    return response.data;
  }

  // Encounter APIs
  async getEncounters(params?: { patientId?: string; providerId?: string; status?: string }) {
    const response = await this.axiosInstance.get('/encounters', { params });
    return response.data;
  }

  async getEncounterById(id: string) {
    const response = await this.axiosInstance.get(`/encounters/${id}`);
    return response.data;
  }

  async createEncounter(data: any) {
    const response = await this.axiosInstance.post('/encounters', data);
    return response.data;
  }

  async updateEncounter(id: string, data: any) {
    const response = await this.axiosInstance.put(`/encounters/${id}`, data);
    return response.data;
  }

  async deleteEncounter(id: string) {
    const response = await this.axiosInstance.delete(`/encounters/${id}`);
    return response.data;
  }

  // Report APIs
  async getReports(params?: { encounterId?: string; patientId?: string }) {
    const response = await this.axiosInstance.get('/reports', { params });
    return response.data;
  }

  async getReportById(id: string) {
    const response = await this.axiosInstance.get(`/reports/${id}`);
    return response.data;
  }

  async createReport(data: any) {
    const response = await this.axiosInstance.post('/reports', data);
    return response.data;
  }

  async updateReport(id: string, data: any) {
    const response = await this.axiosInstance.put(`/reports/${id}`, data);
    return response.data;
  }

  async signReport(id: string, signature: any) {
    const response = await this.axiosInstance.post(`/reports/${id}/sign`, signature);
    return response.data;
  }

  async shareReport(id: string, shareWith: string[]) {
    const response = await this.axiosInstance.post(`/reports/${id}/share`, { shareWith });
    return response.data;
  }

  // Triage APIs
  async createTriageSession(patientId: string) {
    const response = await this.axiosInstance.post('/triage/sessions', { patientId });
    return response.data;
  }

  async uploadTriageAudio(sessionId: string, audioFile: any) {
    const formData = new FormData();
    formData.append('audio', audioFile);
    const response = await this.axiosInstance.post(
      `/triage/sessions/${sessionId}/audio`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  }

  async getTriageSession(id: string) {
    const response = await this.axiosInstance.get(`/triage/sessions/${id}`);
    return response.data;
  }

  async getTriageSessions(patientId: string) {
    const response = await this.axiosInstance.get(`/triage/sessions`, { params: { patientId } });
    return response.data;
  }

  // Appointment APIs
  async getAppointments(params?: { patientId?: string; providerId?: string; date?: string }) {
    const response = await this.axiosInstance.get('/appointments', { params });
    return response.data;
  }

  async getAppointmentById(id: string) {
    const response = await this.axiosInstance.get(`/appointments/${id}`);
    return response.data;
  }

  async createAppointment(data: any) {
    const response = await this.axiosInstance.post('/appointments', data);
    return response.data;
  }

  async updateAppointment(id: string, data: any) {
    const response = await this.axiosInstance.put(`/appointments/${id}`, data);
    return response.data;
  }

  async cancelAppointment(id: string, reason?: string) {
    const response = await this.axiosInstance.post(`/appointments/${id}/cancel`, { reason });
    return response.data;
  }

  // Notification APIs
  async getNotifications(params?: { unreadOnly?: boolean }) {
    const response = await this.axiosInstance.get('/notifications', { params });
    return response.data;
  }

  async markNotificationAsRead(id: string) {
    const response = await this.axiosInstance.put(`/notifications/${id}/read`);
    return response.data;
  }

  async markAllNotificationsAsRead() {
    const response = await this.axiosInstance.put('/notifications/read-all');
    return response.data;
  }

  // Integration APIs
  async getIntegrations() {
    const response = await this.axiosInstance.get('/integrations');
    return response.data;
  }

  async connectEpicEHR(authCode: string) {
    const response = await this.axiosInstance.post('/integrations/epic/connect', { authCode });
    return response.data;
  }

  async syncEpicData() {
    const response = await this.axiosInstance.post('/integrations/epic/sync');
    return response.data;
  }

  // User Profile APIs
  async getCurrentUser() {
    const response = await this.axiosInstance.get('/users/me');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.axiosInstance.put('/users/me', data);
    return response.data;
  }

  async uploadProfileImage(imageFile: any) {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await this.axiosInstance.post('/users/me/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async updateSettings(settings: any) {
    const response = await this.axiosInstance.put('/users/me/settings', settings);
    return response.data;
  }

  // Audit Log APIs
  async getAuditLogs(params?: { startDate?: string; endDate?: string; action?: string }) {
    const response = await this.axiosInstance.get('/audit-logs', { params });
    return response.data;
  }
}

export default new ApiService();

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API client configuration for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      withCredentials: true, // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          this.clearAuthToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.client.post('/api/auth/login', { email, password });
    return response.data;
  }

  async register(userData: any) {
    // Convert role to uppercase as expected by backend
    const processedData = {
      ...userData,
      role: userData.role?.toUpperCase()
    };
    const response = await this.client.post('/api/auth/register', processedData);
    return response.data;
  }

  async logout() {
    const response = await this.client.post('/api/auth/logout');
    return response.data;
  }

  // User methods
  async getCurrentUser() {
    const response = await this.client.get('/api/users/me');
    return response.data;
  }

  async updateUser(userData: any) {
    const response = await this.client.put('/api/users/me', userData);
    return response.data;
  }

  // Case methods
  async getCases() {
    const response = await this.client.get('/api/cases');
    return response.data;
  }

  async createCase(caseData: any) {
    const response = await this.client.post('/api/cases', caseData);
    return response.data;
  }

  async getCase(id: string) {
    const response = await this.client.get(`/api/cases/${id}`);
    return response.data;
  }

  async updateCase(id: string, caseData: any) {
    const response = await this.client.put(`/api/cases/${id}`, caseData);
    return response.data;
  }

  // Draft methods
  async getDrafts() {
    const response = await this.client.get('/api/drafts');
    return response.data;
  }

  async createDraft(draftData: any) {
    const response = await this.client.post('/api/drafts', draftData);
    return response.data;
  }

  // Payment methods
  async processPayment(paymentData: any) {
    const response = await this.client.post('/api/payments', paymentData);
    return response.data;
  }

  async getPaymentHistory(userId: string) {
    const response = await this.client.get(`/api/payments?userId=${userId}`);
    return response.data;
  }

  // AI methods
  async getAIAnalysis(data: any) {
    const response = await this.client.post('/api/ai/analyze', data);
    return response.data;
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export for use in components
export default apiClient;
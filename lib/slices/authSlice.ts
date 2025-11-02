import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from '../api/client';

export interface User {
  id: string
  name: string
  email: string
  role: "lawyer" | "client"
  country: string
  barNumber?: string
  isFirm?: boolean
  firmName?: string
  firmLogoUrl?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.login(email, password);
      if (response.token) {
        apiClient.setAuthToken(response.token);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.register(userData);
      if (response.token) {
        apiClient.setAuthToken(response.token);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // generic login (role comes from payload)
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    // force login as lawyer
    loginAsLawyer: (state, action: PayloadAction<{ user: Omit<User, "role">; token: string }>) => {
      state.user = { ...action.payload.user, role: "lawyer" }
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    // force login as client
    loginAsClient: (state, action: PayloadAction<{ user: Omit<User, "role">; token: string }>) => {
      state.user = { ...action.payload.user, role: "client" }
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
      }
    },

    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    toggleCountry: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.country = action.payload
      }
    },

    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Logout cases
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})

export const { 
  login, 
  loginAsLawyer, 
  loginAsClient, 
  logout, 
  updateProfile, 
  toggleCountry,
  clearError
} = authSlice.actions

export default authSlice.reducer

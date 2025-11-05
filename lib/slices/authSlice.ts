import requests, { AuthPayload } from "@/axios/requests";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunks
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      const res = await requests.auth.register(data);
      localStorage.setItem("access_token", res.data.accessToken);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await requests.auth.login(credentials);
      localStorage.setItem("access_token", res.data.accessToken);
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await requests.auth.logout();
  localStorage.removeItem("access_token");
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload; state.isAuthenticated = true; })
      .addCase(registerUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })

      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload; state.isAuthenticated = true; })
      .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })

      .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.isAuthenticated = false; state.isLoading = false; });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
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
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.user.role = "lawyer"
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
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
  },
})

export const { login, logout, updateProfile, toggleCountry } = authSlice.actions
export default authSlice.reducer

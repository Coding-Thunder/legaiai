import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  timestamp: string
}

interface UiState {
  country: string
  notifications: Notification[]
}

const initialState: UiState = {
  country: "US",
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload
    },
    showToast: (state, action: PayloadAction<Omit<Notification, "id" | "timestamp">>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      state.notifications.push(notification)
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { toggleCountry, showToast, hideToast } = uiSlice.actions
export default uiSlice.reducer

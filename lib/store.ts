import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import casesSlice from "./slices/casesSlice"
import draftsSlice from "./slices/draftsSlice"
import researchSlice from "./slices/researchSlice"
import lawyersSlice from "./slices/lawyersSlice"
import paymentsSlice from "./slices/paymentsSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cases: casesSlice,
    drafts: draftsSlice,
    research: researchSlice,
    lawyers: lawyersSlice,
    payments: paymentsSlice,
    ui: uiSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

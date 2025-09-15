import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  provider: "stripe" | "paypal" | "bank"
  description: string
  createdAt: string
}

interface PaymentsState {
  payments: Payment[]
  loading: boolean
}

const initialState: PaymentsState = {
  payments: [
    {
      id: "payment1",
      userId: "client1",
      amount: 500,
      currency: "USD",
      status: "completed",
      provider: "stripe",
      description: "Legal consultation fee",
      createdAt: "2024-01-15",
    },
    {
      id: "payment2",
      userId: "client2",
      amount: 750,
      currency: "USD",
      status: "pending",
      provider: "paypal",
      description: "Case filing fee",
      createdAt: "2024-01-20",
    },
  ],
  loading: false,
}

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    initiatePayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload)
    },
    updatePaymentStatus: (state, action: PayloadAction<{ id: string; status: Payment["status"] }>) => {
      const paymentIndex = state.payments.findIndex((p) => p.id === action.payload.id)
      if (paymentIndex !== -1) {
        state.payments[paymentIndex].status = action.payload.status
      }
    },
  },
})

export const { initiatePayment, updatePaymentStatus } = paymentsSlice.actions
export default paymentsSlice.reducer

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Lawyer {
  id: string
  name: string
  barNumber: string
  isFirm: boolean
  firmName?: string
  firmLogoUrl?: string
  specialization: string[]
  rating: number
  experience: number
}

interface LawyersState {
  lawyers: Lawyer[]
  loading: boolean
}

const initialState: LawyersState = {
  lawyers: [
    {
      id: "lawyer1",
      name: "John Smith",
      barNumber: "BAR123456",
      isFirm: false,
      specialization: ["Civil Law", "Property Law"],
      rating: 4.8,
      experience: 15,
    },
    {
      id: "lawyer2",
      name: "Legal Associates LLC",
      barNumber: "BAR789012",
      isFirm: true,
      firmName: "Legal Associates LLC",
      firmLogoUrl: "/logos/legal-associates.png",
      specialization: ["Commercial Law", "Contract Law"],
      rating: 4.6,
      experience: 20,
    },
  ],
  loading: false,
}

const lawyersSlice = createSlice({
  name: "lawyers",
  initialState,
  reducers: {
    searchLawyers: (state, action: PayloadAction<string>) => {
      state.loading = true
      // This would typically filter lawyers based on search criteria
    },
    setLawyers: (state, action: PayloadAction<Lawyer[]>) => {
      state.lawyers = action.payload
      state.loading = false
    },
  },
})

export const { searchLawyers, setLawyers } = lawyersSlice.actions
export default lawyersSlice.reducer

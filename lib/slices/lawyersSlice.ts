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
  lawyers: [],
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

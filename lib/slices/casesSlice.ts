import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Case {
  id: string
  title: string
  description: string
  petitionType: string
  status: "active" | "pending" | "closed"
  lawyerId: string
  clientId: string
  createdAt: string
}

interface CasesState {
  cases: Case[]
  loading: boolean
}

const initialState: CasesState = {
  cases: [
    {
      id: "1",
      title: "Property Dispute Case",
      description: "Boundary dispute between neighbors regarding property lines",
      petitionType: "Civil",
      status: "active",
      lawyerId: "lawyer1",
      clientId: "client1",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Contract Violation",
      description: "Breach of contract in business agreement",
      petitionType: "Commercial",
      status: "pending",
      lawyerId: "lawyer1",
      clientId: "client2",
      createdAt: "2024-01-20",
    },
  ],
  loading: false,
}

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    addCase: (state, action: PayloadAction<Case>) => {
      state.cases.push(action.payload)
    },
    updateCaseStatus: (state, action: PayloadAction<{ id: string; status: Case["status"] }>) => {
      const caseIndex = state.cases.findIndex((c) => c.id === action.payload.id)
      if (caseIndex !== -1) {
        state.cases[caseIndex].status = action.payload.status
      }
    },
    fetchCases: (state) => {
      state.loading = true
    },
    setCases: (state, action: PayloadAction<Case[]>) => {
      state.cases = action.payload
      state.loading = false
    },
  },
})

export const { addCase, updateCaseStatus, fetchCases, setCases } = casesSlice.actions
export default casesSlice.reducer

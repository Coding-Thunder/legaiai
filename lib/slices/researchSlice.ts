import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Research {
  id: string
  title: string
  uploadedBy: string
  verified: boolean
  credibilityScore: number
  type: "case-law" | "statute" | "regulation" | "precedent"
  contentUrl: string
  tags: string[]
  createdAt: string
}

interface ResearchState {
  researchList: Research[]
  loading: boolean
}

const initialState: ResearchState = {
  researchList: [],
  loading: false,
}

const researchSlice = createSlice({
  name: "research",
  initialState,
  reducers: {
    uploadResearch: (state, action: PayloadAction<Research>) => {
      state.researchList.push(action.payload)
    },
    verifyResearch: (state, action: PayloadAction<string>) => {
      const researchIndex = state.researchList.findIndex((r) => r.id === action.payload)
      if (researchIndex !== -1) {
        state.researchList[researchIndex].verified = true
      }
    },
    searchResearch: (state, action: PayloadAction<string>) => {
      // This would typically filter the research list
      state.loading = true
    },
    updateCredibilityScore: (state, action: PayloadAction<{ id: string; score: number }>) => {
      const researchIndex = state.researchList.findIndex((r) => r.id === action.payload.id)
      if (researchIndex !== -1) {
        state.researchList[researchIndex].credibilityScore = action.payload.score
      }
    },
  },
})

export const { uploadResearch, verifyResearch, searchResearch, updateCredibilityScore } = researchSlice.actions
export default researchSlice.reducer

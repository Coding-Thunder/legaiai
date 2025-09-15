import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Draft {
  id: string
  caseId: string
  lawyerId: string
  petitionType: string
  content: string
  status: "draft" | "submitted" | "approved"
  attachedResearch: string[]
  createdAt: string
  updatedAt: string
}

interface DraftsState {
  drafts: Draft[]
  loading: boolean
}

const initialState: DraftsState = {
  drafts: [
    {
      id: "draft1",
      caseId: "1",
      lawyerId: "lawyer1",
      petitionType: "Civil",
      content: "This is a sample legal draft for the property dispute case. The petitioner hereby requests...",
      status: "draft",
      attachedResearch: ["research1"],
      createdAt: "2024-01-16",
      updatedAt: "2024-01-16",
    },
  ],
  loading: false,
}

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload)
    },
    updateDraft: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const draftIndex = state.drafts.findIndex((d) => d.id === action.payload.id)
      if (draftIndex !== -1) {
        state.drafts[draftIndex].content = action.payload.content
        state.drafts[draftIndex].updatedAt = new Date().toISOString()
      }
    },
    submitDraft: (state, action: PayloadAction<string>) => {
      const draftIndex = state.drafts.findIndex((d) => d.id === action.payload)
      if (draftIndex !== -1) {
        state.drafts[draftIndex].status = "submitted"
      }
    },
    attachResearch: (state, action: PayloadAction<{ draftId: string; researchId: string }>) => {
      const draftIndex = state.drafts.findIndex((d) => d.id === action.payload.draftId)
      if (draftIndex !== -1) {
        state.drafts[draftIndex].attachedResearch.push(action.payload.researchId)
      }
    },
  },
})

export const { createDraft, updateDraft, submitDraft, attachResearch } = draftsSlice.actions
export default draftsSlice.reducer

// frontend/lib/slices/casesSlice.ts
import requests, { CasePayload } from "@/axios/requests";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

// frontend/lib/requests.ts (or types.ts)
export interface CaseType {
  priority: string;
  id: string;
  title: string;
  description: string;
  petitionType: string;
  status: "active" | "pending" | "closed";
  lawyerId: string;
  clientId: string;
  createdAt: string;
  jurisdiction?: string;
  courtName?: string;
  attachments?: { url: string; name?: string; provider?: string }[];
}


// Async thunks
export const fetchCasesThunk = createAsyncThunk(
  "cases/fetchCases",
  async (_, { rejectWithValue }) => {
    try {
      const res = await requests.cases.list();
      return res.data as CaseType[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createCaseThunk = createAsyncThunk(
  "cases/createCase",
  async (data: CasePayload, { rejectWithValue }) => {
    try {
      const res = await requests.cases.create(data);
      return res.data as CaseType;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCaseThunk = createAsyncThunk(
  "cases/updateCase",
  async ({ id, data }: { id: string; data: Partial<CasePayload> }, { rejectWithValue }) => {
    try {
      const res = await requests.cases.update(id, data);
      return res.data as CaseType;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
interface CasesState {
  cases: CaseType[];
  loading: boolean;
  error: string | null;
}

const initialState: CasesState = {
  cases: [],
  loading: false,
  error: null,
};

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    resetCasesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCasesThunk
      .addCase(fetchCasesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCasesThunk.fulfilled, (state, action: PayloadAction<CaseType[]>) => {
        state.loading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCasesThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createCaseThunk
      .addCase(createCaseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCaseThunk.fulfilled, (state, action: PayloadAction<CaseType>) => {
        state.loading = false;
        state.cases.push(action.payload);
      })
      .addCase(createCaseThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateCaseThunk
      .addCase(updateCaseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCaseThunk.fulfilled, (state, action: PayloadAction<CaseType>) => {
        state.loading = false;
        const index = state.cases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.cases[index] = action.payload;
      })
      .addCase(updateCaseThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCasesError } = casesSlice.actions;
export default casesSlice.reducer;

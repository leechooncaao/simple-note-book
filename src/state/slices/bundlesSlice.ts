import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { BundlePayload } from './../payload-types/bundlesPayload';
import bundle from "../../bundler";

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  } | undefined;
}

export const startBundling = createAsyncThunk(
  'bundles/start',
  async (bundlePayload: BundlePayload, { rejectWithValue }) => {
    try {
      const result = await bundle(bundlePayload.input);
      return result;
    } catch(error) {
      if (error instanceof Error) {
      console.log(error.message)

        return rejectWithValue(error.message);
      } else throw error;
    }
  }
);

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState: {} as BundleState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startBundling.pending, (state, action) => {
        const cellId = action.meta.arg.cellId
        state[cellId] = {
          loading: true,
          code: '',
          err: ''
        };
      })
      .addCase(startBundling.fulfilled, (state, action) => {
        const cellId = action.meta.arg.cellId
        state[cellId] = {
          loading: false,
          code: action.payload.code,
          err: ''
        };
      })
      .addCase(startBundling.rejected, (state, action) => {
        console.log(action)
        const cellId = action.meta.arg.cellId
        state[cellId] = {
          loading: false,
          code: '',
          err: action.payload as string || action.error.message!
        };
      })
  }
});

export default bundlesSlice.reducer;

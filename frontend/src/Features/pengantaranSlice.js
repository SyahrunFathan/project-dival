import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  patchPengantaranByUserApi,
  updatePengantaranByUserApi,
} from '../Utils/Apis';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const PatchPengantaranByUser = createAsyncThunk(
  'pengantaran/patchPengantaranByUser',
  async (state, thunkApi) => {
    try {
      const response = await patchPengantaranByUserApi(state.id);
      return {status: response?.status, data: response?.data?.response};
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.status);
    }
  },
);

export const UpdateStatusPengantaran = createAsyncThunk(
  'pengantaran/updatePengantaran',
  async (state, thunkAPI) => {
    try {
      const response = await updatePengantaranByUserApi(state?.id);
      return {status: response?.status, data: response?.data};
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response);
    }
  },
);

export const pengantaranSlice = createSlice({
  name: 'pengantaran',
  initialState,
  reducers: {
    resetPengantaran: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(PatchPengantaranByUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(PatchPengantaranByUser.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(PatchPengantaranByUser.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(UpdateStatusPengantaran.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(UpdateStatusPengantaran.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(UpdateStatusPengantaran.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {resetPengantaran} = pengantaranSlice.actions;
export default pengantaranSlice.reducer;

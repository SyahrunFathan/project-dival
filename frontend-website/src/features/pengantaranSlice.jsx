import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patchPengantaran } from "../utils/apis";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GetPengantaran = createAsyncThunk(
  "pengantaran/getPengantaran",
  async (state, thunkAPI) => {
    try {
      const response = await patchPengantaran(
        state.searchKey,
        state.limit,
        state.page
      );

      return { status: response.status, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const pengantaranSlice = createSlice({
  name: "pengantaran",
  initialState,
  reducers: {
    resetPengantaran: (state) => initialState,
  },
});

export const { resetPengantaran } = pengantaranSlice.actions;
export default pengantaranSlice.reducer;

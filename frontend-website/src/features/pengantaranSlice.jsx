import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deletePengantaranApi,
  patchPengantaran,
  postPengantaranApi,
} from "../utils/apis";

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

export const DeletePengantaran = createAsyncThunk(
  "pengantaran/deletePengantaran",
  async (state, thunkAPI) => {
    try {
      const response = await deletePengantaranApi(state.id);

      return { status: response.status, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const CreatePengantaran = createAsyncThunk(
  "pengantaran/cretePengantaran",
  async (state, thunkAPI) => {
    try {
      const response = await postPengantaranApi({
        userId: state.userId,
        rsId: state.rsId,
        darahId: state.darahId,
        totalDarah: state.totalDarah,
      });

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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDarahApi,
  patchDarahApi,
  patchDarahApiById,
  postDarahApi,
  updateDarahApi,
} from "../utils/apis";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GetDarah = createAsyncThunk(
  "darah/getDarah",
  async (__, thunkAPI) => {
    try {
      const response = await patchDarahApi();
      return { status: response?.status, data: response?.data?.response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const GetDarahById = createAsyncThunk(
  "darah/getDarahById",
  async (state, thunkAPI) => {
    try {
      const response = await patchDarahApiById(state.id);
      return { status: response?.status, data: response?.data?.response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const PutDarahById = createAsyncThunk(
  "darah/putDarahById",
  async (state, thunkAPI) => {
    try {
      const response = await updateDarahApi(state.id, {
        stok: state?.stok,
      });
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const DeleteDarahById = createAsyncThunk(
  "darah/deleteDarahById",
  async (state, thunkAPI) => {
    try {
      const response = await deleteDarahApi(state.id);
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const CreateDarah = createAsyncThunk(
  "darah/createDarah",
  async (state, thunkAPI) => {
    try {
      const response = await postDarahApi({
        jenisDarah: state.jenisDarah,
        stok: state.stok,
      });
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const darahSlice = createSlice({
  name: "darah",
  initialState,
  reducers: {
    resetDarah: (state) => initialState,
  },
});

export const { resetDarah } = darahSlice.actions;
export default darahSlice.reducer;

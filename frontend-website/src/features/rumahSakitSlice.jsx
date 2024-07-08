import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRumahSakitApi,
  patchRumahSakit,
  patchRumahSakitById,
  postRumahSakit,
  updateRumahSakitApi,
} from "../utils/apis";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GetRumahSakit = createAsyncThunk(
  "rumahSakit/getRumahSakit",
  async (__, thunkAPI) => {
    try {
      const response = await patchRumahSakit();
      return { status: response?.status, data: response?.data?.response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateRumahSakitSlice = createAsyncThunk(
  "rumahSakit/postRumahSakit",
  async (state, thunkAPI) => {
    try {
      const response = await postRumahSakit({
        namaRs: state?.namaRs,
        latitude: state?.latitude,
        longitude: state?.longitude,
        deskripsi: state?.deskripsi,
      });
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteRumahSakit = createAsyncThunk(
  "rumahSakit/deleteRumahSakit",
  async (state, thunkAPI) => {
    try {
      const response = await deleteRumahSakitApi(state?.id);
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const PatchRumahSakitById = createAsyncThunk(
  "rumahSakit/patchRumahSakitById",
  async (state, thunkAPI) => {
    try {
      const response = await patchRumahSakitById(state?.id);
      return { status: response?.status, data: response?.data?.response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateRumahSakitSlice = createAsyncThunk(
  "rumahSakit/updateRumahSakit",
  async (state, thunkAPI) => {
    try {
      const response = await updateRumahSakitApi(state?.id, {
        namaRs: state?.namaRs,
        latitude: state?.latitude,
        longitude: state?.longitude,
        deskripsi: state?.deskripsi,
      });
      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const rumahSakitSlice = createSlice({
  name: "rs",
  initialState,
  reducers: {
    resetRs: (state) => initialState,
  },
});

export const { resetRs } = rumahSakitSlice.actions;
export default rumahSakitSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteGraphApi, patchGraphApi, postGraphApi } from "../utils/apis";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GetGraphSlice = createAsyncThunk(
  "graph/getGraphSlice",
  async (__, thunkAPI) => {
    try {
      const response = await patchGraphApi();

      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteGraphSlice = createAsyncThunk(
  "graph/deleteGraph",
  async (state, thunkAPI) => {
    try {
      const response = await deleteGraphApi(state?.id);

      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateGraphSlice = createAsyncThunk(
  "graph/createGraph",
  async (state, thunkAPI) => {
    try {
      const response = await postGraphApi({
        rsId: state?.rsId,
      });

      return { status: response?.status, data: response?.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    resetGraph: (state) => initialState,
  },
});

export const { resetGraph } = graphSlice.actions;
export default graphSlice.reducer;

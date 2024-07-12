import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUserApi,
  patchDataUserApi,
  patchDataUserByIdApi,
} from "../utils/apis";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const GetUsers = createAsyncThunk(
  "user/getUsers",
  async (state, thunkAPI) => {
    try {
      const response = await patchDataUserApi(
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

export const GetUserById = createAsyncThunk(
  "user/getUserById",
  async (state, thunkAPI) => {
    try {
      const response = await patchDataUserByIdApi(state.id);
      return { status: response.status, data: response.data.response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const DeleteUserSlice = createAsyncThunk(
  "user/deleteUser",
  async (state, thunkAPI) => {
    try {
      const response = await deleteUserApi(state.id);
      return { status: response.status, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;

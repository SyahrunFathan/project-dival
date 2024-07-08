import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginApi, RemoveTokenApi} from '../Utils/Apis';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const Login = createAsyncThunk('auth/login', async (state, thunkAPI) => {
  try {
    const response = await LoginApi({
      username: state.username,
      password: state.password,
    });

    return {status: response?.status, data: response?.data};
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const RemoveToken = createAsyncThunk(
  'auth/removeToken',
  async (state, thunkAPI) => {
    try {
      const response = await RemoveTokenApi({id: state.id});
      return {status: response?.status};
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.status);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(Login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Login.fulfilled, state => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(Login.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {resetAuth} = authSlice.actions;
export default authSlice.reducer;

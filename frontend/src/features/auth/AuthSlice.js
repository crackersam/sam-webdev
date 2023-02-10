import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (regData, thunkAPI) => {
    try {
      return await authService.register(regData);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.response.data.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (token, thunkAPI) => {
  console.log(token);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = null;
        state.token = action.payload.token;
        state.username = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.token = null;
        state.errorMessage = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

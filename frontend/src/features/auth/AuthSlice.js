import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

const initialState = {
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

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      const message =
        (error.response && error.response.data.error) ||
        error.response.data.message ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
    // clear the cookie
    document.cookie = null;
  } catch (error) {
    const message =
      (error.response && error.response.data.error) ||
      error.response.data.message ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
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
        state.errorMessage = "";
        state.username = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.username = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.username = null;
        state.email = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

const initialState = {
  isLoading: false,
  errorMessage: null,
  forename: "",
  email: "",
  admin: false,
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
  async (_, thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data.error) ||
      error.response.data.message ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      return await authService.login(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      return await authService.resetPassword(resetData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationToken, thunkAPI) => {
    try {
      return await authService.verifyEmail(verificationToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (resetData, thunkAPI) => {
    try {
      return await authService.setNewPassword(
        resetData.token,
        resetData.password
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.successMessage = "";
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
        state.errorMessage = "";
        state.successMessage = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.forename = action.payload.forename;
        state.email = action.payload.email;
        state.successMessage = action.payload.message;
        state.admin = action.payload.admin;
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
        state.successMessage = action.payload.message;
        state.forename = null;
        state.email = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.forename = action.payload.user.forename;
        state.email = action.payload.email;
        state.admin = action.payload.user.admin;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(setNewPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.forename = action.payload.forename;
        state.email = action.payload.email;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import adminService from "./AdminService";

const initialState = {
  successMessage: "",
  isLoading: false,
  errorMessage: "",
};

export const getUsersAndFiles = createAsyncThunk(
  "admin/getUsersAndFiles",
  async (_, thunkAPI) => {
    try {
      return await adminService.getUsersAndFiles();
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

export const downloadFile = createAsyncThunk(
  "admin/downloadFile",
  async (filename, thunkAPI) => {
    try {
      return await adminService.downloadFile(filename);
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

export const updateAvailability = createAsyncThunk(
  "admin/updateAvailability",
  async (data, thunkAPI) => {
    try {
      return await adminService.updateAvailability(data);
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

export const getAvailability = createAsyncThunk(
  "admin/getAvailability",
  async (_, thunkAPI) => {
    try {
      return await adminService.getAvailability();
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAndFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsersAndFiles.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.usersAndFilesList =
            action.payload.UsersAndFilesList;
        }
      )
      .addCase(
        getUsersAndFiles.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      )
      .addCase(downloadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.downloadedFile = action.payload;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateAvailability.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(
        updateAvailability.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      )
      .addCase(getAvailability.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(
        getAvailability.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.availability = action.payload.availability;
          state.errorMessage = "";
        }
      )
      .addCase(
        getAvailability.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
          state.successMessage = "";
        }
      );
  },
});
export const { resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;

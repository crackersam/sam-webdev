import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./AdminService";

const initialState = {
  successMessage: "",
  isLoading: false,
  errorMessage: "",
};

export const getUsersAndFiles = createAsyncThunk(
  "admin/getUsersList",
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

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAndFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersAndFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersAndFilesList = action.payload.UsersAndFilesList;
      })
      .addCase(getUsersAndFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
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
      });
  },
});

export default adminSlice.reducer;

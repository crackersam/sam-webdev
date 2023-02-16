import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetsService from "./AssetsService";

const initialState = {
  successMessage: "",
  isLoading: false,
  errorMessage: "",
};

export const upload = createAsyncThunk(
  "assets/upload",
  async (formData, thunkAPI) => {
    try {
      return await assetsService.upload(formData);
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

export const getMyFilenames = createAsyncThunk(
  "assets/getMyFilenames",
  async (_, thunkAPI) => {
    try {
      return await assetsService.getMyFilenames();
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
  "assets/downloadFile",
  async (filename, thunkAPI) => {
    try {
      return await assetsService.downloadFile(filename);
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

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(upload.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(upload.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(getMyFilenames.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyFilenames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = "";
      state.filenames = action.payload.filenames;
      state.rawFilenames = action.payload.rawFilenames;
    });
    builder.addCase(getMyFilenames.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(downloadFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(downloadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = "";
      state.downloadFile = action.payload;
    });
    builder.addCase(downloadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { reset } = assetsSlice.actions;

export default assetsSlice.reducer;

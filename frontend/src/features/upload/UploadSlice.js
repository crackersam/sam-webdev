import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./UploadService";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
};

export const upload = createAsyncThunk(
  "upload/upload",
  async (formData, thunkAPI) => {
    try {
      return await uploadService.upload(formData);
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

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.successMessage = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(upload.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    });
    builder.addCase(upload.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export const { reset } = uploadSlice.actions;

export default uploadSlice.reducer;

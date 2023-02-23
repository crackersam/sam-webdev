import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import DocumentService from "./DocumentService";

export const saveDocument = createAsyncThunk(
  "documents/saveDocument",
  async (document, thunkAPI) => {
    try {
      return await DocumentService.saveDocument(document);
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

export const getMyDocuments = createAsyncThunk(
  "documents/getMyDocuments",
  async (thunkAPI) => {
    try {
      return await DocumentService.getMyDocuments();
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

const initialState = {
  successMessage: "",
  isLoading: false,
  errorMessage: "",
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    reset: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      saveDocument.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      }
    );
    builder.addCase(
      saveDocument.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      }
    );
    builder.addCase(getMyDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getMyDocuments.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      }
    );
    builder.addCase(
      getMyDocuments.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      }
    );
  },
});

export const { reset } = documentSlice.actions;

export default documentSlice.reducer;

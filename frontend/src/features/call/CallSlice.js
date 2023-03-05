import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import CallService from "./CallService";

const initialState = {
  errorMessage: null,
  isLoading: false,
  successMessage: null,
};

export const allowedToCall = createAsyncThunk(
  "call/allowedToCall",
  async (_, thunkAPI) => {
    try {
      return await CallService.allowedToCall();
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

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allowedToCall.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      allowedToCall.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      }
    );
    builder.addCase(
      allowedToCall.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      }
    );
  },
});

export const { reset } = callSlice.actions;

export default callSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
  isLoading: false,
  successMessage: null,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    error: (state, action) => {
      state.errorMessage = action.payload;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    success: (state, action) => {
      state.successMessage = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
});

export const { error, loading, success, reset } =
  callSlice.actions;

export default callSlice.reducer;

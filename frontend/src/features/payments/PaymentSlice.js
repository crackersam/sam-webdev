import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import PaymentService from "./PaymentService";

export const getMyPayments = createAsyncThunk(
  "payments/getMyPayments",
  async (thunkAPI) => {
    try {
      return await PaymentService.getMyPayments();
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
  payments: [],
  loading: false,
  errorMessage: "",
  successMessage: "",
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMyPayments.fulfilled,
      (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      }
    );
    builder.addCase(
      getMyPayments.rejected,
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      }
    );
  },
});

export const { reset } = paymentSlice.actions;

export default paymentSlice.reducer;

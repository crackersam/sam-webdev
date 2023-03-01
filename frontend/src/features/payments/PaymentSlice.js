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

export const createPaymentIntent = createAsyncThunk(
  "payments/createPaymentIntent",
  async (paymentId, thunkAPI) => {
    try {
      return await PaymentService.createPaymentIntent(
        paymentId
      );
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

export const successfulPayment = createAsyncThunk(
  "payments/successfulPayment",
  async (paymentId, thunkAPI) => {
    try {
      return await PaymentService.successfulPayment(
        paymentId
      );
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
      state.clientSecret = null;
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
    builder.addCase(
      createPaymentIntent.pending,
      (state) => {
        state.loading = true;
      }
    );
    builder.addCase(
      createPaymentIntent.fulfilled,
      (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret;
      }
    );
    builder.addCase(
      createPaymentIntent.rejected,
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      }
    );
    builder.addCase(successfulPayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      successfulPayment.fulfilled,
      (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      }
    );
    builder.addCase(
      successfulPayment.rejected,
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      }
    );
  },
});

export const { reset } = paymentSlice.actions;

export default paymentSlice.reducer;

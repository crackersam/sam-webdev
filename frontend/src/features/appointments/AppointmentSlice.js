import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import appointmentsService from "./AppointmentService";

const initialState = {
  successMessage: "",
  isLoading: false,
  errorMessage: "",
};

export const getAvailableTimes = createAsyncThunk(
  "appointments/getAvailableTimes",
  async (_, thunkAPI) => {
    try {
      return await appointmentsService.getAvailableTimes();
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
export const newAppointmentRequest = createAsyncThunk(
  "appointments/newAppointmentRequest",
  async (date, thunkAPI) => {
    try {
      return await appointmentsService.newAppointmentRequest(
        date
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

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    reset: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableTimes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAvailableTimes.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.availability = action.payload.availability;
        }
      )
      .addCase(
        getAvailableTimes.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      )
      .addCase(
        newAppointmentRequest.pending,
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addCase(
        newAppointmentRequest.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(
        newAppointmentRequest.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload.message;
        }
      );
  },
});

export const { reset } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

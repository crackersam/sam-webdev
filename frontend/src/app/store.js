import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/AuthSlice";
import AssetsReducer from "../features/assets/AssetsSlice";
import AdminReducer from "../features/admin/AdminSlice";
import AppointmentReducer from "../features/appointments/AppointmentSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    assets: AssetsReducer,
    admin: AdminReducer,
    appt: AppointmentReducer,
  },
});

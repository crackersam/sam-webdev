import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/AuthSlice";
import UploadReducer from "../features/upload/UploadSlice";

export const store = configureStore({
  reducer: { auth: AuthReducer, upload: UploadReducer },
});

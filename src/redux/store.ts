import authSlice from "@/redux/features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
  },
});

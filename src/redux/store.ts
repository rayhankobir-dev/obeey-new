import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal.slide";
import { api } from "./features/api.slice";
import authReducer from "./features/auth.slice";
import contentSlice from "@/redux/features/content.slice";

const reducer = {
  auth: authReducer,
  modal: modalSlice,
  content: contentSlice,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

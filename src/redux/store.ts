import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal.slide";
import { api } from "./features/api.slice";

const reducer = {
  modal: modalSlice,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

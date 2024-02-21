import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal.slide";
import messageReducer from "./slices/message.slice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "./features/api.slice";
import authReducer, { setUser } from "./features/auth.slice";
import contentSlice from "@/redux/features/content.slice";

const reducer = {
  auth: authReducer,
  modal: modalSlice,
  message: messageReducer,
  content: contentSlice,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const storedUser = JSON.parse(localStorage.getItem("user")) || null;
if (storedUser) {
  store.dispatch(setUser(storedUser));
}

// setupListeners(store.dispatch);

export default store;

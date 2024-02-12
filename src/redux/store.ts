import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import playerSlice from "./slices/playerSlice";
import messageReducer from "./slices/message.slice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "./features/api.slice";
import authReducer, { setUser } from "./features/auth.slice";

const reducer = {
  auth: authReducer,
  modal: modalSlice,
  player: playerSlice,
  message: messageReducer,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const storedUser = JSON.parse(localStorage.getItem("user")) ?? null;
if (storedUser) {
  store.dispatch(setUser(storedUser));
}

setupListeners(store.dispatch);

export default store;

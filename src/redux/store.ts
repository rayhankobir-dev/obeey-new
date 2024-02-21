import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal.slide";

const reducer = {
  modal: modalSlice,
};

const store = configureStore({
  reducer: reducer,
});

export default store;

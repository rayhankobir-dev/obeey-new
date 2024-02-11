import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  register: false,
  confirmation: false,
  otp: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLoginModal: (state, action) => {
      state.login = action.payload;
    },
    setRegisterModal: (state, action) => {
      state.register = action.payload;
    },
    setConfirmationModal: (state, action) => {
      state.confirmation = action.payload;
    },
    setOtpModal: (state, action) => {
      state.confirmation = action.payload;
    },
  },
});

export const {
  setLoginModal,
  setRegisterModal,
  setConfirmationModal,
  setOtpModal,
} = modalSlice.actions;

export default modalSlice.reducer;

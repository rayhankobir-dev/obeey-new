import store from "@/redux/store";
import {
  setLoginModal,
  setRegisterModal,
  setConfirmationModal,
  setOtpModal,
} from "../slices/modal.slide";

const modalAction = {
  handleLoginModal: (action: boolean) => {
    store.dispatch(setLoginModal(action));
  },
  handleRegisterModal: (action: boolean) => {
    store.dispatch(setRegisterModal(action));
  },
  handleConfirmationModal: (action: boolean) => {
    store.dispatch(setConfirmationModal(action));
  },
  handleOtpModal: (action: boolean) => {
    store.dispatch(setOtpModal(action));
  },
};

export const {
  handleLoginModal,
  handleRegisterModal,
  handleConfirmationModal,
  handleOtpModal,
} = modalAction;

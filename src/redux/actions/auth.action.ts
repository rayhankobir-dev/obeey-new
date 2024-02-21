/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from "react-hot-toast";
import { clearAuthSate } from "../features/auth.slice";
import store from "../store";

export async function logoutUser() {
  try {
    toast.success("Logout successfull");
    store.dispatch(clearAuthSate());
  } catch (error: any) {
    console.log(error.response);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/api/axios.config";
import { clearAuthSate } from "../features/auth.slice";
import store from "../store";

export async function logoutUser() {
  try {
    const response: any = await axiosInstance.delete("/auth/logout");
    console.log(response);
    store.dispatch(clearAuthSate());
  } catch (error) {
    console.log(error.response);
  }
}

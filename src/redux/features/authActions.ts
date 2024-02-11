/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormData } from "@/pages/login-page";
import { setError, setTokens, setUser } from "./authSlice";
import axios from "@/api";
import { Dispatch } from "redux";

export const loginUser =
  (credentials: LoginFormData) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      dispatch(setUser(response.data.data.user));
      dispatch(setTokens(response.data.data.tokens));
    } catch (error) {
      dispatch(setError("Invalid credentials"));
    }
  };

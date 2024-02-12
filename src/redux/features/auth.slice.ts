import { createSlice } from "@reduxjs/toolkit";

const storedAccessToken = localStorage.getItem("accessToken") || null;
const storedRefreshToken = localStorage.getItem("refreshToken") || null;
const storedUser = null;

export interface AuthStore {
  accessToken: string;
  refreshToken: string;
  user: object;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    user: storedUser,
    isAuthenticated: !!storedAccessToken,
  },
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearAuthSate(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, setUser, clearAuthSate } = authSlice.actions;
export default authSlice.reducer;

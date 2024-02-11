// axios.js
import axios from "axios";
import { store } from "@/redux/store";
import { setTokens, clearAuthState, setUser } from "@/redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post("/auth/refresh-token", {
          refreshToken: store.getState().auth.refreshToken,
        });
        store.dispatch(setTokens(response.data.tokens));
        const profileResponse = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${response.data.tokens.accessToken}`,
          },
        });
        store.dispatch(setUser(profileResponse.data.user));
        return instance(originalRequest);
      } catch (error) {
        store.dispatch(clearAuthState());
        const navigate = useNavigate();
        navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
import { setTokens } from "@/redux/features/auth.slice";
import { axiosInstance, setAuthHeader } from "@/api/axios.config";

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post(
          "http://loclahost:3000/api/v1/auth/refresh-token",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );
        const { accessToken, refreshToken } = response.data;
        setTokens({ accessToken, refreshToken });
        setAuthHeader(accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Refresh token failed");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      }
    }
    // Extract error data from error response
    const errorData = error.response ? error.response.data : null;
    return Promise.reject(errorData || error);
  }
);

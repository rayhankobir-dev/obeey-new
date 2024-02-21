/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";
import { handleRegisterModal } from "@/redux/actions/modal.action";

const AuthContext = createContext();

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const storedAccessToken: string | null =
      localStorage.getItem("accessToken");
    const storedRefreshToken: string | null =
      localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      fetchProfile(storedAccessToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (accessToken: string) => {
    try {
      const response = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data.data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const refreshResponse: any = await axiosInstance.post(
              "/auth/refresh-token",
              {
                refreshToken,
              }
            );
            console.log("refreshResponse====", refreshResponse);
            const newAccessToken = refreshResponse.data.accessToken;
            setAccessToken(refreshResponse.data.accessToken);
            setRefreshToken(refreshResponse.data.refreshToken);
            setIsAuth(true);
            setLoading(false);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            setLoading(false);
            console.error("Failed to refresh token", refreshError);
            logout();
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken]);

  const signUp = async (
    firstName: string,
    email: string,
    password: string,
    role: string = "USER"
  ) => {
    try {
      setLoading(true);
      toast.promise(
        axios.post("http://localhost:3000/api/v1/auth/signup", {
          firstName,
          email,
          password,
          role,
        }),
        {
          loading: "Account creating...",
          success: (response) => {
            const { tokens, user } = response.data.data;
            setAccessToken(tokens.accessToken);
            setRefreshToken(tokens.refreshToken);
            setIsAuth(true);
            setUser(user);
            setLoading(false);
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            handleRegisterModal(false);
            return response.data.data.message;
          },
          error: (error) => {
            setLoading(false);
            return error.response.data.message;
          },
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      const { tokens, user } = response.data.data;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setIsAuth(true);
      setUser(user);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuth(false);
    setLoading(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuth,
        user,
        loading,
        setUser,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useAxios = (): AxiosInstance => {
  const { accessToken }: any = useAuth();
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = accessToken
      ? `Bearer ${accessToken}`
      : "";
  }, [accessToken]);

  return axiosInstance;
};

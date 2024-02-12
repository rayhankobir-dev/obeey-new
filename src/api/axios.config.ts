import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const axiosPublicInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const setAuthHeader = (accessToken: string) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

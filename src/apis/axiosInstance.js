import axios from "axios";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout, setError, setIsLoading } from "../redux/auth/authSlice";
import store from "../redux/store";

export const axiosInstance = axios.create({
  baseURL: process?.env?.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("login") || config.url.includes("register") || config.url.includes("refresh")) {
      return config;
    }

    (error) => {
      console.error("axiosInstance.interceptors.request Error:", error.message);
      return Promise.reject(error);
    };
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    console.error("axiosInstance.interceptors.request Error:", error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 || (error?.response?.status === 403 && !originalRequest._retry)) {
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (refreshToken) {
          const { data } = await axiosInstance.post("/auth/refresh", {
            refreshToken: refreshToken,
          });

          await AsyncStorage.setItem("accessToken", data.accessToken);
          originalRequest._retry = true;
          console.log("pake refresh token, access tokenya ganti");

          return axiosInstance(originalRequest);
        }
      } catch (error) {
        console.log("Failed to refresh token: ", error.message);
        try {
          store.dispatch(setError(null));
          store.dispatch(setIsLoading(true));
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          store.dispatch(logout());
        } catch (error) {
          store.dispatch(setError(error.message));
          console.log("axiosInstance.interceptors.response: ", error.message);
        } finally {
          store.dispatch(setIsLoading(false));
          ToastAndroid.show("Your session has ended, please login again!", 5000);
        }
      }
    }
    return Promise.reject(error);
  }
);

import axios from "axios";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout, setError, setIsLoading } from "../redux/auth/authSlice";

export const axiosInstance = axios.create({
  baseURL: process?.env?.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      try {
        store.dispatch(setError(null));
        store.dispatch(setIsLoading(true));
        await AsyncStorage.removeItem("accessToken");
        store.dispatch(logout());
      } catch (error) {
        store.dispatch(setError(error.message));
        console.log("AuthApi logout: ", error.message);
      } finally {
        store.dispatch(setIsLoading(false));
      }
      ToastAndroid.show("Your session has ben end, Please login again!", 5000);
    }
  }
);

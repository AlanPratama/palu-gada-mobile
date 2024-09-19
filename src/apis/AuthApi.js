import { axiosInstance } from "./axiosInstance";
import store from "../redux/store";
import { login, logout, setError, setIsLoading, setUser } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export default class AuthApi {
  static async getAuthenticated() {
    try {
      const { data } = await axiosInstance.get("/users");

      console.log("data: ", data.data);

      store.dispatch(setUser(data.data));
    } catch (error) {
      console.log("AuthApi getAuthenticated: ", error);
    }
  }

  static async login(usernameOrEmail, password) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.post("/auth/login", {
        usernameOrEmail,
        password,
      });

      if (!data.authorities.includes("ROLE_USER")) {
        ToastAndroid.show("Kamu itu bukan user, bukan tempatnya di sini!", 5000);
        return false;
        // throw new Error("Bad Credentials");
      }

      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      store.dispatch(login(jwtDecode(data.accessToken)));
      console.log("DIPANGGIL LOGIN dan SUKSESS");
    } catch (error) {
      ToastAndroid.show(error?.response?.data?.message ?? "Sepertinya kamu sedang offline!", 5000);
      store.dispatch(setError(error.message));
      console.log("AuthApi login error message: ", error.message);
      console.log("AuthApi login error data: ", error?.response?.data);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async register(dataRequest) {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));
      const res = await axiosInstance.post("/auth/register", dataRequest);
      if (!res) {
        ToastAndroid.show(
          `User dengan email ${dataRequest.email} dan username ${dataRequest.username} yang sama sudah ter-registrasi!`,
          5000
        );
        return false;
      }
      ToastAndroid.show(`User behasil di buat, silakan login dengan akun anda!`, 5000);
      return true;
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("AuthApi register: ", error.message);
      ToastAndroid.show(error?.response?.data?.message ?? "Sepertinya kamu sedang offline!", 5000);
      return error;
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async logout() {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      store.dispatch(logout());
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("AuthApi logout: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }
}

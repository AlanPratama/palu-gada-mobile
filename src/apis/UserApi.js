import { ToastAndroid } from "react-native";
import { setUser } from "../redux/auth/authSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

export default class UserApi {
  static async getAuthenticated() {
    try {
      const { data } = await axiosInstance.get("/users");

      console.log("data: ", data.data);

      store.dispatch(setUser(data.data));
    } catch (error) {
      console.log("AuthApi getAuthenticated: ", error);
    }
  }

  static async updateProfile(formData, userId) {
    console.log("formData: ", formData);
    console.log("userId: ", userId);
    try {
      const { data } = await axiosInstance.put(`/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("data: ", data);

      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("API Response Error: ", error.response.data);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("Error in setting up request: ", error.message);
      }
    }
  }

  static async changePassword(request) {
    try {
      const { data } = await axiosInstance.put("/users/change-password", request);
      ToastAndroid.show("Password berhasil di ubah", 5000);
      return data;
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("UserApi changePassword API Response Error: ", error.response.data);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("UserApi changePassword No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("UserApi changePassword Error in setting up request: ", error.message);
      }
      ToastAndroid.show(error?.response?.data?.message ?? error?.message, 5000);
    }
  }
}

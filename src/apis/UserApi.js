import { ToastAndroid } from "react-native";
import { axiosInstance } from "./axiosInstance";

export default class UserApi {
  static async changePassword(request) {
    try {
      console.log("request: ", request);

      const { data } = await axiosInstance.put("/users/update-password", request);
      ToastAndroid.show("Password berhasil di ubah", 5000);
      return data;
    } catch (error) {
      console.log("UserApi changePassword error: ", error.response.data);
      ToastAndroid.show(error?.response?.data?.message ?? error?.message, 5000);
    }
  }
}

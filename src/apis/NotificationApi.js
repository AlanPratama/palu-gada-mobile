import { ToastAndroid } from "react-native";
import { clearNotification, setError, setIsLoading, setNotification } from "../redux/slice/notificationSlice";
import store from "../redux/store";
import { axiosInstance } from "./axiosInstance";

const countTotalNotRead = (notifications) => {
  let total = 0;
  notifications.forEach((notification) => {
    if (notification.isRead == false) {
      total += 1;
    }
  });
  return total;
};

export default class NotificationApi {
  static async getNotification(page = 0, size = 10) {
    try {
      store.dispatch(clearNotification())
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.get("/notifications/me", {
        params: {
          page,
          size,
          sort: 'id,desc'
        },
      });

      const items = data.data.items;
      store.dispatch(setNotification(items));
      return { length: items.length, totalNotRead: countTotalNotRead(items) }
    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("NotificationApi getNotification: ", error);
      console.log("NotificationApi getNotification message: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async readAllNotification() {
    try {
      store.dispatch(setError(null));
      store.dispatch(setIsLoading(true));

      const { data } = await axiosInstance.put("/notifications/me/read", null);

      console.log(data);

    } catch (error) {
      store.dispatch(setError(error.message));
      console.log("NotificationApi getNotification: ", error);
      console.log("NotificationApi getNotification message: ", error.message);
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }

  static async createNotification(request) {
    try {
      const {data} = await axiosInstance.post("/notifications", request);
      console.log("CREATE NOTIF: ", data);
      
      // ToastAndroid.show("Password berhasil di ubah", 5000);
      store.dispatch(clearNotification())
      this.getNotification()
    } catch (error) {
      if (error.response) {
        // Error dari API
        console.log("NotificationApi create notif API Response Error: ", error.response.data);
      } else if (error.request) {
        // Tidak ada response dari API
        console.log("NotificationApi create notif No response from API: ", error.request);
      } else {
        // Error yang terjadi ketika membuat request
        console.log("NotificationApi create notif Error in setting up request: ", error.message);
      }
      ToastAndroid.show(error?.response?.data?.message ?? error?.message, 5000);
    }
  }
}

import { setError, setIsLoading, setNotification } from "../redux/slice/notificationSlice";
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
}

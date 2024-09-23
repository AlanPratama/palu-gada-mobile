import * as Notifications from "expo-notifications";
import { isDevice } from "expo-device";
import { Platform, ToastAndroid } from "react-native";

export async function pushLocalNotification(title, body, data = null) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data, url: "Notification" },
    },
    trigger: null,
  });
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      ToastAndroid.show(
        "Failed to get push token for push notification!",
        1500
      );
      return;
    }
  } else {
    ToastAndroid.show("Must use physical device for Push Notifications", 1500);
  }
}

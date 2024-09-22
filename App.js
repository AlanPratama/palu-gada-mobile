import { Provider } from "react-redux";
import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/redux/store";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "./src/utils/notification.util";

if (__DEV__) {
  require("./ReactotronConfig");
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notification, setNotification] = useState(undefined)
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then()

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response.notification.request);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


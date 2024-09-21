import { Provider } from "react-redux";
import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/redux/store";

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}


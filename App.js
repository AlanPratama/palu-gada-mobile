import { Provider } from "react-redux";
import AppNavigator from "./src/navigator/AppNavigator";

export default function App() {
  return (
    <Provider>
      <AppNavigator/>
    </Provider>
  );
}


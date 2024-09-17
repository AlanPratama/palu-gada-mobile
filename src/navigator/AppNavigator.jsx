import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import OnBoarding from "../components/OnBoarding";
import { login, logout } from "../redux/auth/authSlice";
import store from "../redux/store";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import EditProfileScreen from "../screens/auth/EditProfileScreen";
import NotificationScreen from "../screens/auth/NotificationScreen";
import AddPostScreen from "../screens/auth/Post/AddPostScreen";
import PostByCategory from "../screens/auth/Post/PostByCategory";
import PostDetailScreen from "../screens/auth/Post/PostDetailScreen";
import TopUpDetailScreen from "../screens/auth/TopUpDetailScreen";
import TopUpScreen from "../screens/auth/TopUpScreen";
import WalletScreen from "../screens/auth/WalletScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();

  const { isAuthenticated } = useSelector((state) => state.auth);
  // const isAuthenticated = true;
  console.log("isAuthenticated: ", isAuthenticated);

  const setUser = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("tokenn: ", token);

    if (token) {
      store.dispatch(login(jwtDecode(token)));
    } else {
      store.dispatch(logout());
    }
  };

  useEffect(() => {
    setUser();
  }, []);
  // const [alreadyViewedOnBoarding, setAlreadyViewedOnBoarding] = useState(false);

  // const checkOnBoarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@viewedOnBoarding");
  //     console.log("asasa: ", value);
  //     console.log("LALALAL: ", value === "true");

  //     if(value === "true") {
  //       setAlreadyViewedOnBoarding(true);
  //     }
  //   } catch (error) {
  //     console.log("ERROR CHECKING ONBOARDING: ", error);
  //   }
  // }

  // useEffect(() => {
  //   checkOnBoarding()
  // }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={WelcomeScreen} initialParams={{ isAuthenticated }} />
            <Stack.Screen name='OnBoarding' component={OnBoarding} />
            {isAuthenticated ? (
              <>
                <Stack.Screen name='Protect' component={ProtectedRoutes} />
                <Stack.Screen name='EditProfile' component={EditProfileScreen} />
                <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
                <Stack.Screen name='PostDetail' component={PostDetailScreen} />
                <Stack.Screen name='Wallet' component={WalletScreen} />
                <Stack.Screen name='Notification' component={NotificationScreen} />
                <Stack.Screen name='AddPost' component={AddPostScreen} />
                <Stack.Screen name='PostByCategory' component={PostByCategory} />
                <Stack.Screen name='TopUp' component={TopUpScreen} />
                <Stack.Screen name='TopUpDetail' component={TopUpDetailScreen} />
              </>
            ) : (
              <Stack.Screen name='Public' component={PublicRoutes} />
            )}
            {/* {
                alreadyViewedOnBoarding ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                  <Stack.Screen name="OnBoarding" component={OnBoarding} />
                )
              } */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OnBoarding from '../components/OnBoarding';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import EditProfileScreen from '../screens/auth/EditProfileScreen';
import ChangePasswordScreen from '../screens/auth/ChangePasswordScreen';
import PostDetailScreen from '../screens/auth/PostDetailScreen';

export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    
    const isAuthenticated = true

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
        <SafeAreaView className="flex-1">
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
              {
                isAuthenticated ? (
                  <>
                    <Stack.Screen name="Protect" component={ProtectedRoutes} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                    <Stack.Screen name="PostDetail" component={PostDetailScreen} />
                  </>
                ) : (
                  <Stack.Screen name="Public" component={PublicRoutes} />
                )
              }
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
    )
}
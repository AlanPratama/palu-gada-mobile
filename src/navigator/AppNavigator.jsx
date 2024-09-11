import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnBoarding from '../components/OnBoarding';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../screens/auth/HomeScreen';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

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
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
              {
                isAuthenticated ? (
                  <Stack.Screen name="Protect" component={ProtectedRoutes} />
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
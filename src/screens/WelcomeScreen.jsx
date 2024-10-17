import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

export default function WelcomeScreen({ route }) {
  const navigate = useNavigation();
  const { isAuthenticated } = route.params;

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnBoarding");
      navigate.replace(value !== null ? (isAuthenticated ? "Protect" : "Public") : "OnBoarding");
    } catch (error) {
      console.log("ERROR CHECKING ONBOARDING: ", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkOnBoarding();
    }, 2000);
  }, []);

  return (
    <View className='justify-center items-center min-h-screen bg-[#fff]'>
      <Animated.Image entering={ZoomIn.delay(200)} source={require("../../assets/image.png")} alt='Palu Gada' className='w-96 h-96 mb-6' />
      <Animated.Text entering={ZoomIn.delay(300)} className='italic text-5xl text-center font-extrabold text-primary'>
        KERJAIN AJA
      </Animated.Text>
      <Animated.Text entering={ZoomIn.delay(400)} className='italic text-2xl text-center font-semibold text-primary'>
        Semua Bisa DiKerjain Aja Di Sini
      </Animated.Text>
    </View>

    // <View className="relative justify-center items-center min-h-screen">
    //   <Image source={require("../../assets/welcome.png")} alt="Palu Gada" className="w-72 h-72" />
    //   <Text className="text-4xl font-bold text-[#262626]">Palu Gada</Text>
    //   <Text className="text-2xl font-medium text-[#262626]">"Apa Lu Mau, Gue Ada"</Text>

    //   <View className="absolute -top-10 -left-10 rounded-3xl rotate-45 w-48 h-48 bg-black" />
    // </View>
  );
}

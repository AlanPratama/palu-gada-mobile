import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomIn } from "react-native-reanimated";

export default function LandingScreen() {
  const navigate = useNavigation();

  return (
    <View className='justify-center items-center bg-white min-h-screen'>
      <Animated.View entering={ZoomIn.delay(200)}>
        <Image source={require("../../assets/image.png")} alt='Palu Gada' className='w-72 h-72 mb-6' />
      </Animated.View>
      <View className='px-8'>
        <Animated.Text entering={ZoomIn.delay(300)} className='text-3xl text-center font-bold text-primary'>
          Cari Pekerjaan?
        </Animated.Text>
        <Animated.Text entering={ZoomIn.delay(400)} className='text-3xl text-center font-bold text-primary'>
          Kerjain Aja Di Sini
        </Animated.Text>
        <Animated.Text entering={ZoomIn.delay(500)} className='text-center text-sm font-medium text-[#555555] my-4'>
          Cari pekerjaan yang sesuai dengan kemampuan, waktu, dan jadwalmu
        </Animated.Text>
        <Animated.View entering={ZoomIn.delay(600)} className='flex-row justify-center items-center gap-x-4 mt-6'>
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigate.navigate("Login")} className='bg-primary py-2 px-3 rounded-md w-[42%]'>
            <Text className='text-center text-white text-xl font-semibold'>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={() => navigate.navigate("Register")} className='py-2 px-3 rounded-md w-[42%]'>
            <Text className='text-center text-[#262626] text-xl font-semibold'>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

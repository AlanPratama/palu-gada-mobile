import { View, Text, useWindowDimensions, Image } from "react-native";
import React from "react";

export default function OnBoardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View className='justify-center items-center' style={{ width: width }}>
      <Image
        source={item.image}
        style={{ width: width - 50, resizeMode: "contain" }}
        className="flex-1 justify-centerrequire('../../assets/onboard1.png')"
      />

      <View className='flex-[0.3]'>
        <Text className='font-extrabold text-[28px] mb-3 text-primary text-center '>{item.title}</Text>
        <Text className='font-normal text-[#404040] text-center px-16'>{item.description}</Text>
      </View>
    </View>
  );
}

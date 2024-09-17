import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomSheetTopUpBCA from "../../components/Wallet/BottomSheetTopUpBCA";

export default function TopUpScreen() {
  const navigate = useNavigation();

  const refSheetBCA = useRef()

  return (
    <ScrollView className="min-h-screen bg-white">
      <Animated.View
        entering={FadeIn.delay(100)}
        className="flex-row justify-between items-center mb-4"
      >
        <View className="flex-row justify-start items-center gap-x-2">
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            activeOpacity={0.5}
            className="flex-row justify-start items-center"
          >
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text className="text-xl text-[#343434] font-semibold ml-1">
              Kembali
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Text className="text-xl font-semibold text-[#343434] px-3 mt-2">Pilih Metode Pembayaran</Text>

      <View className="w-full justify-center p-3 items-center">
        <Animated.View className="w-full justify-center items-center mb-3.5" entering={FadeIn.delay(150)}>
          <TouchableOpacity onPress={() => refSheetBCA.current?.open()} activeOpacity={0.5} className="flex-row justify-start items-center gap-x-2  pl-2.5 py-3.5 w-full border border-gray-500 rounded-xl">
            <View>
              <Ionicons name="wallet-outline" size={24} color={"#343434"} />
            </View>
            <View>
              <Text className="text-base font-medium text-[#343434]">BCA Virtual Account</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View className="w-full justify-center items-center mb-3.5" entering={FadeIn.delay(150)}>
          <TouchableOpacity activeOpacity={0.5} className="flex-row justify-start items-center gap-x-2  pl-2.5 py-3.5 w-full border border-gray-500 rounded-xl">
            <View>
              <Ionicons name="wallet-outline" size={24} color={"#343434"} />
            </View>
            <View>
              <Text className="text-base font-medium text-[#343434]">BNI Virtual Account</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View className="w-full justify-center items-center mb-3.5" entering={FadeIn.delay(150)}>
          <TouchableOpacity activeOpacity={0.5} className="flex-row justify-start items-center gap-x-2  pl-2.5 py-3.5 w-full border border-gray-500 rounded-xl">
            <View>
              <Ionicons name="wallet-outline" size={24} color={"#343434"} />
            </View>
            <View>
              <Text className="text-base font-medium text-[#343434]">BRI Virtual Account</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <BottomSheetTopUpBCA refRBSheet={refSheetBCA} />
    </ScrollView>
  );
}

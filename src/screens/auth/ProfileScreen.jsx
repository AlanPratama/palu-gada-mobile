import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {

  const navigate = useNavigation()

  return (
    <View className="justify-start items-center bg-white min-h-screen">
      <Image
        source={{
          uri: "https://cdn.vectorstock.com/i/500p/42/94/blue-abstract-background-modern-gradient-vector-50754294.jpg",
        }}
        className="w-full h-[102px]"
      />
      <View className="bg-white w-full justify-start items-center">
        <View className="-mt-16 p-4 bg-white rounded-[200px]">
          <Image
            source={{
              uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
            }}
            className="w-32 h-32 rounded-full"
          />
        </View>
        <Text className="text-center text-xl font-bold text-[#343434]">
          Rei Ayanami
        </Text>
        <Text className="text-center text-base font-normal text-[#343434]">
          rei@gmail.com
        </Text>
      </View>

      <View className="bg-white pb-8 pt-6 px-4 justify-center items-start w-full">
        <TouchableOpacity
          style={{
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
          activeOpacity={0.85}
          onPress={() => navigate.navigate("EditProfile")}
        >
          <View className="flex-row justify-start items-center gap-x-2.5">
            <View className="bg-[#3f45f9] p-2 rounded-full">
              <Ionicons name="person-outline" size={24} color="#fff" />
            </View>
            <Text className="text-base font-bold text-[#343434]">
              Edit Profile
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={"#343434"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
          activeOpacity={0.85}
          onPress={() => navigate.navigate("ChangePassword")}
        >
          <View className="flex-row justify-start items-center gap-x-2.5">
            <View className="bg-[#3f45f9] p-2 rounded-full">
              <Ionicons name="lock-closed-outline" size={24} color="#fff" />
            </View>
            <Text className="text-base font-bold text-[#343434]">
              Ganti Password
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={"#343434"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
          activeOpacity={0.85}
        >
          <View className="flex-row justify-start items-center gap-x-2.5">
            <View className="bg-[#3f45f9] p-2 rounded-full">
              <Ionicons name="wallet-outline" size={24} color="#fff" />
            </View>
            <Text className="text-base font-bold text-[#343434]">
              Dompetku
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={"#343434"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
          activeOpacity={0.85}
        >
          <View className="flex-row justify-start items-center gap-x-2.5">
            <View className="bg-[#3f45f9] p-2 rounded-full">
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
            </View>
            <Text className="text-base font-bold text-[#343434]">
              Kontak & Bantuan
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={"#343434"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 1.0,
            elevation: 1,
          }}
          className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
          activeOpacity={0.85}
        >
          <View className="flex-row justify-start items-center gap-x-2.5">
            <View className="bg-[#3f45f9] p-2 rounded-full">
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </View>
            <Text className="text-base font-bold text-[#343434]">
              Keluar
            </Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={"#343434"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

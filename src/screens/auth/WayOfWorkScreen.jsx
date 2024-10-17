import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function WayOfWorkScreen() {

  const navigate = useNavigation();

  return (
    <ScrollView className="min-h-screen bg-white p-3" contentContainerStyle={{ paddingBottom: 30 }}>
      <View className="flex-row justify-between items-center mb-4">
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

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          1. Client Membuat Postingan
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/1createPost.png")}
          className="w-full h-[300px]"
        />
      </View>

      <View className="items-center my-8">
        <Ionicons name="arrow-down-outline" size={24} color="black" />
      </View>

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          2. Pekerja Memberikan Penawaran
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/2createBid.png")}
          className="w-full h-[300px]"
        />
      </View>

      <View className="items-center my-8">
        <Ionicons name="arrow-down-outline" size={24} color="black" />
      </View>

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          3. Client Menerima Tawaran
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/3acceptBid.png")}
          className="w-full h-[300px]"
        />
      </View>

      <View className="items-center my-8">
        <Ionicons name="arrow-down-outline" size={24} color="black" />
      </View>

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          4. Pekerja Mulai Melakukan Tugasnya
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/4doWork.png")}
          className="w-full h-[300px]"
        />
      </View>

      <View className="items-center my-8">
        <Ionicons name="arrow-down-outline" size={24} color="black" />
      </View>

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          5. Client Menyatakan Pekerjaan Selesai
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/5workDone.png")}
          className="w-full h-[300px]"
        />
      </View>

      <View className="items-center my-8">
        <Ionicons name="arrow-down-outline" size={24} color="black" />
      </View>

      <View className="w-full">
        <Text className="text-lg text-[#343434] font-semibold mb-1">
          6. Pekerja Menerima Pembayaran
        </Text>
        <Image
          source={require("../../../assets/wayOfWork/6getPaid.png")}
          className="w-full h-[300px]"
        />
      </View>

    </ScrollView>
  );
}

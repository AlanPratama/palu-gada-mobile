import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const navigate = useNavigation();

  return (
    <ScrollView>
      <View className="bg-white min-h-screen justify-start items-center px-4">
        <View className="rounded-full border border-gray-100 my-6">
          <Image
            source={{
              uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
            }}
            alt="Profile Pic"
            className="w-32 h-32 rounded-full"
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Nama Lengkap</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="accessibility-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan nama lengkap..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Username</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="person-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan username..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Email</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="mail-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan email..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Nomor Telepon
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="call-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan nomor telepon..."
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Tanggal Lahir
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="calendar-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan tanggal lahir..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Jenis Kelamin
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="male-female-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan jenis kelamin..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Alamat</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="location-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-0.5 w-[90%]"
              placeholder="Masukkan alamat..."
              numberOfLines={3}
              multiline
            />
          </View>
        </View>

        <View className="mb-4 flex-row justify-center items-center gap-x-2 mt-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate.goBack()}
            className="w-[48%] bg-[#fff] py-3.5 rounded-full"
          >
            <Text className="text-[#3f45f9] text-lg font-semibold text-center">
              Batal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-[48%] bg-[#3f45f9] py-3.5 rounded-full"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

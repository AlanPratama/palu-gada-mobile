import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigation();

  return (
    <ScrollView>
      <View className="bg-white min-h-screen justify-start items-center px-4">
        {/* Password Lama */}
      <View className="mb-4 mt-6">
        <Text className="text-lg font-semibold text-start">Password Lama</Text>
        <View className="flex-row justify-start items-center w-full">
          <Ionicons name="lock-closed-outline" size={24} color="#303030" />
          <TextInput
            className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
            placeholder="Masukkan password lama..."
            secureTextEntry
          />
        </View>
      </View>

      {/* Password Baru */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-start">Password Baru</Text>
        <View className="flex-row justify-start items-center w-full mb-4">
          <Ionicons name="lock-closed-outline" size={24} color="#303030" />
          <View className="relative w-[90%]">
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2"
              placeholder="Masukkan password baru..."
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-0"
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#303030"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Konfirmasi Password Baru */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-start">
          Konfirmasi Password Baru
        </Text>
        <View className="flex-row justify-start items-center w-full mb-4">
          <Ionicons name="lock-closed-outline" size={24} color="#303030" />
          <View className="relative w-[90%]">
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2"
              placeholder="Konfirmasi password baru..."
              secureTextEntry
            />
          </View>
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

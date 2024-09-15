import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationScreen() {
  const navigate = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="p-3 min-h-screen bg-white"
    >
      <View className="flex-row justify-between items-center mb-4">
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
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>

      <View className="mb-6 flex-row justify-start items-start gap-x-2">
        <View className="border border-gray-200 rounded-full p-2">
          <Ionicons name="notifications-outline" size={32} color="#343434" />
        </View>

        <View className="w-[80%]">
          <Text>5 jam lalu</Text>
          <Text className="text-[#343434] font-semibold text-lg">
            Penawaran Baru Datang!
          </Text>
          <Text classNam="text-[#343434]">
            Alan Pratama baru saja memberikan penawaran menarik untuk kamu untuk
            kucing...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

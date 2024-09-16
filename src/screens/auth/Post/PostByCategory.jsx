import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Divider from "../../../components/Divider";
import { useNavigation } from "@react-navigation/native";

export default function PostByCategory({ route }) {
  console.log(route?.params);

  const l = [{}, {}, {}, {}, {}, {}, {}, {}]
  const navigate = useNavigation()

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="min-h-screen bg-white p-3">
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

      <View className="mt-2">
        <View className="flex-row justify-start items-center mb-1">
          <Text className="text-xl pb-0.5 border-b-2 border-gray-400 font-semibold text-[#343434]">Serba Bisa</Text>
        </View>

        {l.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigate.navigate("PostDetail", {
                id: i,
                title: "Serba Bisa",
              })
            }
            activeOpacity={0.5}
            className='my-3.5 flex-row justify-start items-start gap-x-2.5'
          >
            <Image
              source={{
                uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt=''
              className='w-[88px] h-[88px] border border-gray-200 rounded-xl'
            />
            <View className='w-[68%]'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-sm font-bold text-primary'>Serba Bisa</Text>
                <View className='flex-row justify-center items-center gap-x-1'>
                  <Text className='text-sm font-normal text-[#343434]'>2 jam lalu</Text>
                  <Ionicons name='time-outline' size={18} />
                </View>
              </View>
              <Text numberOfLines={1} className='text-[17px] font-bold text-[#343434]'>
                Kuburin kucing aku
              </Text>
              <Text numberOfLines={2} className='text-sm font-normal text-[#343434]'>
                halo banh, jadi ada kucing aku yang namanya Boni, dia kucing kesayanganku, tolong bantu kuburin dong :(
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

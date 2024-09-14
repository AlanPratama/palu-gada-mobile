import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Divider from "../../components/Divider";
import BottomSheetAddBid from "../../components/Post/BottomSheetAddBid";
import BottomSheetReportPost from "../../components/Post/BottomSheetReportPost";

export default function PostDetailScreen({ route }) {
  const s = route.params;

  console.log("LALALAL: ", s);
  const navigate = useNavigation();
  const l = [{}, {}, {}, {}, {}, {}];

  const refSheetAddBid = useRef()
  const refSheetReportPost = useRef()


  return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="min-h-screen bg-white"
      >
        <View className="border-b border-gray-300 flex-row justify-between items-center p-3">
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
          <TouchableOpacity
          onPress={() => refSheetReportPost.current?.open()}
            activeOpacity={0.7}
            className="flex-row justify-center items-center bg-red-500 px-2 py-1 rounded"
          >
            <Ionicons name="megaphone-outline" size={24} color={"#fff"} />
            <Text className="text-white ml-2 font-semibold">Laporkan</Text>
          </TouchableOpacity>
        </View>

        <View className="p-3">
          {/* <View className="flex-row justify-start items-start gap-x-3 mb-4">
          <Image source={{ uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg" }} alt="" className="w-[68px] h-[68px] rounded-full" />
        <View>
        <Text className="text-base font-normal text-[#343434]">
          Alan Pratama Rusfi
        </Text>
        <Divider color="#9ca3af"/>
          <Text className="text-[17px] font-semibold text-[#343434]">
            Kuburin kucing aku, aku tidak kuat kalau ngubur kucing kesayangan aku sendiri
          </Text>
        </View>
        </View> */}
          <Text className="text-xl font-semibold text-[#343434]">
            Kuburin kucing aku, aku tidak kuat kalau ngubur kucing kesayangan
            aku sendiri
          </Text>
          <Divider color="#9ca3af" twClass="my-2" />
          <Text className="mb-6 text-base font-normal text-[#343434]">
            halo banh, jadi ada kucing aku yang namanya Boni, dia kucing
            kesayanganku, tolong bantu kuburin dong :(
          </Text>

          <Image
            source={{
              uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
            }}
            alt=""
            className="w-full h-[350px] mb-5 rounded-xl"
          />

          <View className="flex-row flex-wrap justify-start items-center gap-2">
            <TouchableOpacity className="bg-blue-100 rounded-full px-3.5 py-1">
              <Text className="text-blue-500 font-semibold">Serba Bisa</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-100 rounded-full px-3.5 py-1">
              <Text className="text-blue-500 font-semibold">Serba Bisa</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-100 rounded-full px-3.5 py-1">
              <Text className="text-blue-500 font-semibold">Serba Bisa</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3 flex-row justify-start items-center">
            <Text className="text-[17px] font-medium text-[#343434]">
              Bayaran:{" "}
            </Text>
            <Text className="text-[17px] font-normal text-[#343434]">
              Rp 250.000 - 500.000
            </Text>
          </View>

          <View className="mt-1.5 flex-row justify-start items-center">
            <Text className="text-[17px] font-medium text-[#343434]">
              Tenggat Pilih Pekerja:{" "}
            </Text>
            <Text className="text-[17px] font-normal text-[#343434]">
              1 Hari
            </Text>
          </View>

          <View className="flex-row justify-evenly items-center mt-6">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row justify-center items-center gap-x-2"
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#343434"
              />
              <Text>Tersedia</Text>
            </TouchableOpacity>
            <Divider color="#9ca3af" orientation="vertical" />

            <View className="flex-row justify-center items-center gap-x-2">
              <Ionicons name="person-outline" size={24} color="#343434" />
              <Text>13 Bids</Text>
            </View>
            <Divider color="#9ca3af" orientation="vertical" />
            <View className="flex-row justify-center items-center gap-x-2">
              <Ionicons name="time-outline" size={24} color="#343434" />
              <Text>7 Hari</Text>
            </View>
          </View>

          <View className="mt-6">
            <TouchableOpacity
            onPress={() => refSheetAddBid.current?.open()}
              activeOpacity={0.7}
              className="bg-[#4f6def] w-full py-3.5 rounded-full "
            >
              <Text className="text-base text-white text-center font-semibold">
                Tambah Penawaran
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[18px] font-medium text-[#343434]">
              Penawar Saat Ini
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {l.map((_, i) => (
                <Image
                  key={i + "image"}
                  source={{
                    uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                  }}
                  alt=""
                  className="w-[70px] h-[70px] mr-2.5 rounded-full"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.0,

                    elevation: 1,
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[18px] font-medium text-[#343434]">
              Pemilik
            </Text>
            <View className="flex-row justify-start items-start gap-x-3.5">
              <Image
                source={{
                  uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                }}
                alt=""
                className="w-[68px] h-[68px] rounded-full"
              />
              <View className="">
                <Text className="text-base font-medium text-[#343434]">
                  Alan Pratama
                </Text>
              </View>
            </View>
          </View>
        </View>

        <BottomSheetAddBid refRBSheet={refSheetAddBid} />
        <BottomSheetReportPost refRBSheet={refSheetReportPost} />
      </ScrollView>
  );
}
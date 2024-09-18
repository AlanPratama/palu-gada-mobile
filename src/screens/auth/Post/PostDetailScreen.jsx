import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Divider from "../../../components/Divider";
import BottomSheetAddBid from "../../../components/Post/BottomSheetAddBid";
import BottomSheetReportPost from "../../../components/Post/BottomSheetReportPost";
import { useSelector } from "react-redux";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigation();
  const l = [{}, {}, {}, {}, {}, {}];

  const refSheetAddBid = useRef();
  const refSheetReportPost = useRef();

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
          {post.title}
        </Text>
        <Divider color="#9ca3af" twClass="my-2" />
        <Text className="mb-6 text-base font-normal text-[#343434]">
          {post.description}
        </Text>

        <Image
          source={{
            uri: post.imageUrl
              ? post.imageUrl
              : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
          }}
          alt=""
          className="w-full h-[350px] mb-5 rounded-xl"
        />

        <View className="flex-row flex-wrap justify-start items-center gap-2">
          {post.postCategories.map((cat, i) => (
            <TouchableOpacity
              key={i + "cat" + cat.id}
              className="bg-blue-100 rounded-full px-3.5 py-1"
            >
              <Text className="text-blue-500 font-semibold">
                {cat.category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-3 flex-row justify-start items-center">
          <Text className="text-[17px] font-medium text-[#343434]">
            Bayaran:{" "}
          </Text>
          <Text className="text-[17px] font-normal text-[#343434]">
            Rp {post.budgetMin.toLocaleString("id-ID")} -{" "}
            {post.budgetMax.toLocaleString("id-ID")}
          </Text>
        </View>

        <View className="mt-1.5 flex-row justify-start items-center">
          <Text className="text-[17px] font-medium text-[#343434]">
            Tenggat Pilih Pekerja:{" "}
          </Text>
          <Text className="text-[17px] font-normal text-[#343434]">
            {new Date(post.deadline).toLocaleDateString("id-ID")}
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
            <Text>
              {post.status === "AVAILABLE"
                ? "Tersedia"
                : post.status === "NOT_AVAILABLE"
                ? "Tidak Tersedia"
                : "Expired"}
            </Text>
          </TouchableOpacity>
          <Divider color="#9ca3af" orientation="vertical" />

          <View className="flex-row justify-center items-center gap-x-2">
            <Ionicons name="person-outline" size={24} color="#343434" />
            <Text>{post.bids.length} Bids</Text>
          </View>
          <Divider color="#9ca3af" orientation="vertical" />
          <View className="flex-row justify-center items-center gap-x-2">
            <Ionicons name="time-outline" size={24} color="#343434" />
            <Text>{post.finishDay} Hari</Text>
          </View>
        </View>

        <View className="mt-6">
          {post.user.id === user.id ? (
            <TouchableOpacity
              onPress={() => navigate.navigate("UpdatePost", { post })}
              activeOpacity={0.7}
              className="bg-green-500 w-full py-3.5 rounded-full "
            >
              <Text className="text-base text-white text-center font-semibold">
                Edit Postingan
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => refSheetAddBid.current?.open()}
              activeOpacity={0.7}
              className="bg-primary w-full py-3.5 rounded-full "
            >
              <Text className="text-base text-white text-center font-semibold">
                Tambah Penawaran
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-[18px] font-medium text-[#343434]">
            Penawar Saat Ini
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              post.bids.length > 0 ? post.bids.map((bid, i) => (
                <Image
                  key={i + "image"}
                  source={{
                    uri: bid.user.photoUrl ? bid.user.photoUrl : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
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
              )) : <Text className="text-[#343434]">Tidak ada penawar</Text>
            }
          </ScrollView>
        </View>

        <View className="mt-6">
          <Text className="mb-3 text-[18px] font-medium text-[#343434]">
            Pemilik
          </Text>
          <View className="flex-row justify-start items-start gap-x-3.5">
            <Image
              source={{
                uri: post.user.photoUrl ? post.user.photoUrl : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt=""
              className="w-[68px] h-[68px] rounded-full"
            />
            <View className="">
              <Text className="text-base font-medium text-[#343434]">
                {post.user.name}
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

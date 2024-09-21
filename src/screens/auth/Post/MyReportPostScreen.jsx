import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Divider from "../../../components/Divider";
import PostApi from "../../../apis/PostApi";

export default function MyReportPostScreen() {
  const navigate = useNavigation();
  const [reports, setReports] = useState([]);

  const fetch = async () => {
    const data = await PostApi.getReportPost();
    console.log("ASALJSLA: ", data.items);
    setReports(data.items);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="min-h-screen bg-white"
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      <View className="flex-row justify-start items-center gap-x-2 p-3">
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

      <View className="mt-4 p-3">
        {reports.length > 0 ? (
          reports.map((report, i) => (
            <TouchableOpacity
              key={report.id + "-REPORT-" + i}
              activeOpacity={0.7}
              onPress={() => navigate.navigate("PostDetail", {})}
              className="p-5 bg-[#f6f6f6] rounded-xl"
            >
              <Image
                source={{
                  uri: report.post.imageUrl
                  ? report.post.imageUrl
                  : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                }}
                alt="report"
                className="w-full h-[250px] rounded-xl mb-1.5"
              />
              <Text
                numberOfLines={1}
                className="mb-1.5 text-lg font-medium text-[#343434]"
              >
                {report.post.title}
              </Text>
              <Divider />
              <Text className="my-1.5 text-base font-normal text-[#343434]">
                {report.message}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>TIDAK ADA LAPORAN POSTINGAN!</Text>
        )}
      </View>
    </ScrollView>
  );
}

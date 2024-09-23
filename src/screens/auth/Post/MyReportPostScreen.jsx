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

      <View className="p-3">
        {reports.length > 0 ? (
          reports.map((report, i) => (
            <TouchableOpacity
              activeOpacity={0.75}
              key={report.id + "-report-" + i}
              onPress={() =>
                navigate.navigate("PostDetail", { post: report.post })
              }
              className="bg-[#e6f0fd] rounded-2xl p-3 my-3"
            >
              <View className="flex-row justify-start items-center gap-x-2">
                <Image
                  source={
                    report.post.imageUrl
                      ? { uri: report.post.imageUrl }
                      : require("../../../../assets/imgPlaceholder.png")
                  }
                  className="w-14 h-14 rounded-xl"
                />
                <View className="w-[78%]">
                  <Text
                    numberOfLines={1}
                    className="text-[14px] font-normal text-[#606060]"
                  >
                    {report.user.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[16px] font-semibold text-[#343434]"
                  >
                    {report.post.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[14px] font-normal text-[#606060]"
                  >
                    {report.post.description}
                  </Text>
                </View>
              </View>
              <Divider twClass={"my-2"} width={2} color="#bfdbfe" />
              <Text>Pesan: {report.message}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>TIDAK ADA LAPORAN POSTINGAN!</Text>
        )}
      </View>
    </ScrollView>
  );
}

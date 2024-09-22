import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons/build/Icons";
import { useNavigation } from "@react-navigation/native";
import BidApi from "../../apis/BidApi";

export default function MyReviewScreen() {

  const [reviews, setReviews] = useState([])
  const navigate = useNavigation()

  const fetch = async () => {
    const data = await BidApi.getMyReview()

    console.log("DATA RE: ", data);
    
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <View className="min-h-screen bg-white">
      <View className="flex-row justify-between items-center p-3">
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
  );
}

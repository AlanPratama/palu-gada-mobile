import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons/build/Icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BidApi from "../../apis/BidApi";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export default function MyReviewScreen() {
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 
  const navigate = useNavigation();

  const fetchAllData = async () => {
    const data = await BidApi.getMyReview();
    console.log(data.data.items);

    setReviews(data.data.items);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dayName = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
    }).format(date);
    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat("id-ID", {
      month: "short",
    }).format(date);
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // useFocusEffect to refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };


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

      <View className="p-3 mt-0.5">
        <Text className="text-xl font-semibold text-[#343434] mb-3">
          Apa Kata Mereka?
        </Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          className="h-[700px]"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {reviews.length > 0 ? (
            reviews.map((item, index) => (
              <View
                key={item.id + "-review-" + index}
                className="bg-[#f3f2fe] mb-5 p-3 rounded-2xl"
              >
                {/* HEADER */}
                <View className="flex-row justify-start items-start gap-x-2">
                  <Image
                    source={{
                      uri: "https://cdn.dribbble.com/userupload/14945917/file/original-2379bba74d2cace09311ecdc0d1c373b.png?resize=752x",
                    }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View>
                    <Text className="text-base font-semibold text-[#343434]">
                      {item.user.name}
                    </Text>
                    <Text className="text-sm font-normal text-[#606060]">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>

                {/* BODY */}
                <View className="mt-1">
                  <Text className="text-sm font-normal text-[#343434]">
                    {item.comment}
                  </Text>
                </View>

                {/* FOOTER */}
                <View className="mt-2.5 flex-row justify-between items-center">
                  <View className="flex-row justify-start items-center gap-x-1">
                    <StarRatingDisplay
                      rating={item.rating}
                      starStyle={{ marginHorizontal: -2 }}
                      starSize={24}
                    />
                    <Text className="text-base font-normal text-[#606060]">
                      - ({item.rating})
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="bg-primary py-1 px-2 rounded-md"
                  >
                    <Text className="text-white text-center text-sm font-semibold">
                      Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-center text-xl font-semibold text-[#343434]">
              Tidak Ada Review
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

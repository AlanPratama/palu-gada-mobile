import { Ionicons } from "@expo/vector-icons/build/Icons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";
import BidApi from "../../apis/BidApi";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export default function BottomSheetUserDetail({
  refRBSheet,
  user,
  animation = "slide",
}) {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        // draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          container: {
            height: "100%",
          },
        }}
        customModalProps={{
          animationType: animation,
        }}
        height={500}
        openDuration={250}
      >
        <UserDetailComp refRBSheet={refRBSheet} user={user} />
      </RBSheet>
    </View>
  );
}

const UserDetailComp = ({ refRBSheet, user }) => {
  // console.log(user);

  const [userReview, setUserReview] = useState([]);
  const [userCountRating, setUserCountRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const fetch = async () => {
    const data = await BidApi.getReviewByUserId(user.id);
    const sumAllRating = data.data.items.reduce(
      (total, currentItem) => total + currentItem.rating,
      0
    );
    const numberOfRatings = data.data?.items?.length || 0;
    const averageRating =
      numberOfRatings > 0 ? sumAllRating / numberOfRatings : 0;

    setUserRating(averageRating);
    setUserCountRating(numberOfRatings);

    console.log("Total Rating: ", sumAllRating);
    console.log("Average Rating: ", averageRating);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <ScrollView
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: "100%",
          backgroundColor: "white",
        }}
        contentContainerStyle={{ paddingBottom: 45 }}
        className="min-h-screen"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-black">
          <Image
            source={{
              uri: "https://cdn.vectorstock.com/i/500p/42/94/blue-abstract-background-modern-gradient-vector-50754294.jpg",
            }}
            className="w-full h-[102px]"
          />
          <View className="bg-white w-full justify-start items-center">
            <View className="-mt-16 p-4 bg-white rounded-[200px]">
              <Image
                source={{
                  uri: user.photoUrl
                    ? user.photoUrl
                    : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                }}
                className="w-32 h-32 rounded-full"
              />
            </View>
            {/* <Text className='text-center text-xl font-bold text-[#343434]'>{user?.username}</Text>
        <Text className='text-center text-base font-normal text-[#343434]'>{user?.email}</Text> */}
          </View>
        </View>
        <View className="bg-white pb-8 justify-center items-start w-full">
          <View className="my-0 w-full bg-white rounded-full">
            <View className="px-6 py-2 mb-2">
              <Text className="text-xl font-bold text-[#343434] capitalize">
                {user.name}
              </Text>
              <Text className="text-base font-semibold text-[#707070] capitalize">
                {user.username}
              </Text>

              <Text className="my-2 text-sm font-normal text-[#343434]">
                {user.about ? user.about : "-"}
              </Text>

              <View className="flex-row justify-start items-center gap-x-2">
                <View className="flex-row justify-start items-center">
                  {/* <Ionicons name="star" size={16} color={"orange"} /> */}
                  <StarRatingDisplay rating={userRating} maxStars={5} starSize={20} starStyle={{ marginHorizontal: -2 }} />
                </View>
                <Text className="text-sm font-semibold text-[#808080] capitalize">
                  ({userCountRating} Reviews)
                </Text>
              </View>
            </View>
            <Divider width={8} color="#d9d9d9d9" />

            <View className="px-6 py-2 mt-2">
              <View className="my-2 flex-row justify-start items-center gap-x-2">
                <Ionicons name="mail-outline" size={18} />
                <Text className="text-base font-normal text-[#343434] w-[95%]">
                  {user.email}
                </Text>
              </View>

              <View className="my-2 flex-row justify-start items-center gap-x-2">
                <Ionicons name="call-outline" size={18} />
                <Text className="text-base font-normal text-[#343434] w-[95%]">
                  {user.phone}
                </Text>
              </View>

              <View className="my-2 flex-row justify-start items-center gap-x-2">
                <Ionicons name="map-outline" size={18} />
                <Text className="text-base font-normal text-[#343434] w-[95%]">
                  {user.district.districtName} ({user.district.province})
                </Text>
              </View>

              <View className="my-2 flex-row justify-start items-start gap-x-2">
                <Ionicons name="location-outline" size={18} />
                <Text className="text-base font-normal text-[#343434] w-[95%]">
                  {user.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 bg-white w-full py-3.5 px-3">
        <TouchableOpacity
          onPress={() => refRBSheet.current?.close()}
          className="bg-primary py-3.5 rounded-full w-full"
        >
          <Text className="text-white text-center font-semibold">Tutup</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

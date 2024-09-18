import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import BidApi from "../../apis/BidApi";

export default function BottomSheetPostDetailBid({ refRBSheet, post }) {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "gray",
            width: 100,
            height: 5,
            borderRadius: 5,
            marginVertical: 10,
          },
          container: {
            height: "85%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <PostDetailBidComp refRBSheet={refRBSheet} post={post} />
      </RBSheet>
    </View>
  );
}

const PostDetailBidComp = ({ refRBSheet, post }) => {
  return (
    <ScrollView
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginTop: 26 }} className="px-3">
        {post.bids.length > 0 ? (
          post.bids.map((bid, i) => (
            <View
              key={bid.id + "-post2-" + i}
              className="my-3.5 flex-row justify-start items-start gap-x-2.5"
            >
              <Image
                source={{
                  uri: bid.user.photoUrl
                    ? bid.user.photoUrl
                    : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                }}
                alt=""
                className="w-[88px] h-[88px] border border-gray-200 rounded-xl"
              />
              <View className="w-[68%]">
                <View className="flex-row justify-between items-center">
                  {/* <Text className="text-sm font-bold text-primary">
                    {post ? post.postCategories[0].category : "Apa Aja"}
                  </Text> */}
                  {/* <View className="flex-row justify-center items-center gap-x-1">
                    <Text className="text-sm font-normal text-[#343434]">
                      {calculateTimeAgo("2024-09-15 15:29:07.797796")}
                    </Text>
                    <Ionicons name="time-outline" size={18} />
                  </View> */}
                </View>
                <Text
                  numberOfLines={1}
                  className="text-[17px] font-bold text-[#343434]"
                >
                  {/* {post.imageUrl} */}
                  {bid.user.name ? bid.user.name : bid.user.username}
                </Text>
                <Text
                  className="text-sm font-normal text-[#343434]"
                >
                  {bid.message} Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam repellat minima magni!
                </Text>
              </View>
            </View>
          ))
        ): (
          <>
            <Text className="text-[#343434] text-center">Tidak ada penawar</Text></>
        )}
      </View>
    </ScrollView>
  );
};

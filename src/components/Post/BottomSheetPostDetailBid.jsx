import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";

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
            height: "100%",
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
    <>
      <ScrollView
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: "100%",
          backgroundColor: "white",
        }}
        contentContainerStyle={{ paddingBottom: 115 }}
        className="min-h-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 26 }} className="pl-3 pr-5">
          {post.bids.length > 0 ? (
            post.bids.map((bid, i) => (
              <>
                <View
                  key={bid.id + "-post2-" + i}
                  className="my-3.5 flex-row justify-start items-start gap-x-2.5"
                >
                  {/* <Image
                  source={{
                    uri: bid.user.photoUrl
                      ? bid.user.photoUrl
                      : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                  }}
                  alt=""
                  className="w-[88px] h-[88px] border border-gray-200 rounded-xl"
                /> */}
                  <View className="w-[100%] bg-[#f6f6f6] p-2.5 rounded-xl">
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
                    <Text className="text-sm font-normal text-[#343434]">
                      {bid.message} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Totam repellat minima magni! Lorem ipsum
                      dolor sit amet. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit..
                    </Text>
                    <Divider color="#707070" twClass="my-2.5" />
                    <View className="flex-row justify-evenly items-center mb-2">
                      <Text className="font-medium text-sm text-[#505050]">
                        Rp {bid.amount.toLocaleString("id-ID")}
                      </Text>
                      <Text>|</Text>
                      <Text className="font-medium text-sm text-[#505050]">
                        {bid.user.district.districtName}
                      </Text>
                    </View>
                    <View className="flex-row justify-evenly items-center">
                    {
                      bid.status === "PENDING" ? (
                        <>
                        <TouchableOpacity
                        onPress={() =>
                          alert("NANTI ADA BOTTOM SHEET LAGI. YES / NO")
                        }
                        className="bg-red-200 py-1 px-2 rounded-full w-[48%]"
                      >
                        <Text className="text-center text-red-500">
                          Reject
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          alert("NANTI ADA BOTTOM SHEET LAGI. YES / NO")
                        }
                        className="bg-blue-200 py-1 px-2 rounded-full w-[48%]"
                      >
                        <Text className="text-center text-blue-500">
                          Terima
                        </Text>
                      </TouchableOpacity>
                        </>
                      ) : (
                      <TouchableOpacity
                        onPress={() =>
                          alert("NANTI ADA BOTTOM SHEET LAGI. YES / NO")
                        }
                        className="bg-blue-200 py-1 px-2 rounded-full w-[100%]"
                      >
                        <Text className="text-center text-blue-500">
                          Selesaikan
                        </Text>
                      </TouchableOpacity>
                      )
                    }
                    </View>
                  </View>
                </View>
              </>
            ))
          ) : (
            <>
              <Text className="text-[#343434] text-center">
                Tidak ada penawar
              </Text>
            </>
          )}
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

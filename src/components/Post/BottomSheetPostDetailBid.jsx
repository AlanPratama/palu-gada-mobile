import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";
import BottomSheetBidAlert from "./BottomSheetBidAlert";
import { useSelector } from "react-redux";
import BottomSheetAddReview from "./BottomSheetAddReview";

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
  const [objBid, setObjBid] = useState({});
  const dialogueRefSheet = useRef();
  const reviewRefSheet = useRef();
  const { user } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState();

  const openRefSheetDialogue = (bid, status) => {
    setObjBid({
      status,
      bid,
    });
    console.log(objBid);
    dialogueRefSheet.current?.open();
  };

  const openRefSheetAddReview = (userId) => {
    setUserId(userId);
    reviewRefSheet.current?.open();
  };

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
            post.bids.map((bid, i) => {
              console.log(bid);
              return (
                <View
                  key={bid.id + "-bid-" + i}
                  className="my-3.5 flex-row justify-start items-start gap-x-2.5"
                >
                  <View className="w-[100%] bg-[#f6f6f6] p-2.5 rounded-xl">
                    <Text
                      numberOfLines={1}
                      className="text-[17px] font-bold text-[#343434]"
                    >
                      {/* {post.imageUrl} */}
                      {bid.user.name ? bid.user.name : bid.user.username}
                    </Text>
                    <Text className="text-sm font-normal text-[#343434]">
                      {bid.message}
                    </Text>
                    <Divider color="#707070" twClass="my-2.5" />
                    <View className="flex-row justify-evenly items-center mb-2">
                      <Text className="w-[48%] font-medium text-sm text-[#505050] text-center">
                        Rp {bid.amount.toLocaleString("id-ID")}
                      </Text>
                      <Text>|</Text>
                      <Text className="w-[48%] font-medium text-sm text-[#505050] text-center">
                        {bid.user.district
                          ? bid.user.district.districtName
                          : "-"}
                      </Text>
                    </View>
                    <View className="flex-row justify-evenly items-center">
                      {bid.bidStatus === "PENDING" ? (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              openRefSheetDialogue(bid, "REJECTED")
                            }
                            className="bg-red-200 py-1 px-2 rounded-full w-[48%]"
                          >
                            <Text className="text-center text-red-600 font-normal">
                              Reject
                            </Text>
                          </TouchableOpacity>
                          {user.balance >= bid.amount ? (
                            <TouchableOpacity
                              onPress={() =>
                                openRefSheetDialogue(bid, "ACCEPTED")
                              }
                              className="bg-blue-200 py-1 px-2 rounded-full w-[48%]"
                            >
                              <Text className="text-center text-blue-600 font-normal">
                                Terima
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                ToastAndroid.show("Saldo Tidak Mencukupi", 1500)
                              }
                              className="bg-blue-200 py-1 px-2 rounded-full w-[48%]"
                            >
                              <Text className="text-center text-blue-600 font-normal">
                                Saldo Kurang
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      ) : bid.bidStatus === "ACCEPTED" ? (
                        <TouchableOpacity
                          onPress={() => openRefSheetDialogue(bid, "FINISH")}
                          className="bg-blue-200 py-1 px-2 rounded-full w-[100%]"
                        >
                          <Text className="text-center text-blue-600 font-normal">
                            Selesaikan
                          </Text>
                        </TouchableOpacity>
                      ) : bid.bidStatus === "REJECTED" ? (
                        <TouchableOpacity
                          onPress={() =>
                            ToastAndroid.show("Penawaran Telah Ditolak!", 1500)
                          }
                          className="bg-red-200 py-1 px-2 rounded-full w-[100%]"
                        >
                          <Text className="text-center text-red-600 font-normal">
                            DITOLAK
                          </Text>
                        </TouchableOpacity>
                      ) : bid.bidStatus === "FINISH" ? (
                        <TouchableOpacity
                          onPress={() => openRefSheetAddReview(bid.user.id)}
                          className="bg-orange-200 py-1 px-2 rounded-full w-[100%]"
                        >
                          <Text className="text-center text-orange-500">
                            Berikan Review
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            ToastAndroid.show("Penawaran Telah Selesai!", 1500)
                          }
                          className="bg-green-200 py-1 px-2 rounded-full w-[100%]"
                        >
                          <Text className="text-center text-green-500">
                            SELESAI
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
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

        <BottomSheetBidAlert refRBSheet={dialogueRefSheet} objBid={objBid} />
        <BottomSheetAddReview
          refRBSheet={reviewRefSheet}
          post={post}
          userId={userId}
        />
      </View>
    </>
  );
};

import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import BidApi from "../../../apis/BidApi";
import { useSelector } from "react-redux";
import Divider from "../../../components/Divider";
import BottomSheetDeleteBidAlert from "../../../components/Post/BottomSheetDeleteBidAlert";
import BottomSheetMyBidDetail from "../../../components/MyBid/BottomSheetMyBidDetail";

export default function MyBidScreen() {
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { myBids } = useSelector((state) => state.bid);

  const [delBid, setDelBid] = useState({})
  const refSheetDeleteBid = useRef()

  const handleOpenDelBottomSheet = (delBid) => {
    setDelBid(delBid)
    refSheetDeleteBid.current?.open()
  }
  const [selectedBid, setSelectedBid] = useState({});

  console.log("MY BIDSSS: ", myBids);
  const refSheetMyBidDetail = useRef();

  const handleOpenDetail = (bid) => {
    setSelectedBid(bid);
    refSheetMyBidDetail.current.open();
  };

  const fetch = async () => {
    await BidApi.myBids();
  };

  useEffect(() => {
    fetch();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      className="bg-white min-h-screen"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 110,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-3">
        <Text className="text-2xl mb-1 font-bold text-[#343434]">
          Penawaran Kamu
        </Text>

        {myBids.length > 0 ? (
          myBids.map((bid, i) => (
            <TouchableOpacity
              activeOpacity={0.75}
              key={bid.id + "-bid-" + i}
              onPress={() => handleOpenDetail(bid)}
              className="bg-[#e6f0fd] rounded-2xl p-2.5 my-3"
            >
              <View className="flex-row justify-start items-center gap-x-2">
                <Image
                  source={bid.post.imageUrl ? { uri: bid.post.imageUrl } : require("../../../../assets/imgPlaceholder.png")}
                  className="w-14 h-14 rounded-xl"
                />
                <View className="w-[78%]">
                  <Text
                    numberOfLines={1}
                    className="text-[14px] font-normal text-[#606060]"
                  >
                    {bid.user.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[16px] font-semibold text-[#343434]"
                  >
                    {bid.post.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[14px] font-normal text-[#606060]"
                  >
                    {bid.post.description}
                  </Text>
                </View>
              </View>
              <Divider twClass={"my-2"} width={2} color="#bfdbfe" />
              <Text className="text-base text-[#343434]">{bid.message}</Text>
              <View className="mt-3 flex-row justify-between items-center">
                <Text className="text-base font-semibold text-[#343434]">
                  Rp {bid.amount ? bid.amount.toLocaleString("id-ID") : 0}
                </Text>
                <View className="flex-row justify-center items-center gap-x-2">
                  {bid.status === "PENDING" && (
                    <TouchableOpacity onPress={() => handleOpenDelBottomSheet(bid)} activeOpacity={0.7} className="bg-red-500 px-2.5 py-1 rounded-full">
                      <Text className="text-white font-medium">Hapus</Text>
                    </TouchableOpacity>
                  )}
                  <Text className={`text-white ${bid.status === "PENDING"
                ? "bg-yellow-400"
                : bid.status === "ACCEPTED"
                ? "bg-green-400"
                : bid.status === "REJECTED"
                ? "bg-red-400"
                : bid.status === "FINISH"
                ? "bg-blue-400"
                : "bg-purple-400"} font-medium px-2.5 py-1 rounded-full`}>
                    {bid.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="justify-center items-center min-h-screen">
            <Text>TIDAK ADA PENAWARAN</Text>
          </View>
        )}
        <BottomSheetMyBidDetail
          refRBSheet={refSheetMyBidDetail}
          objBid={selectedBid}
        />
      </View>

      <BottomSheetDeleteBidAlert refRBSheet={refSheetDeleteBid} bid={delBid} />
    </ScrollView>
  );
}

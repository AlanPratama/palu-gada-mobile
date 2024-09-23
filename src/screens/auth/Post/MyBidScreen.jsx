import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import BidApi from "../../../apis/BidApi";
import { useSelector } from "react-redux";
import Divider from "../../../components/Divider";
import BottomSheetDeleteBidAlert from "../../../components/Post/BottomSheetDeleteBidAlert";

export default function MyBidScreen() {
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { myBids } = useSelector((state) => state.bid);

  const [delBid, setDelBid] = useState({})
  const refSheetDeleteBid = useRef()

  const handleOpenDelBottomSheet = (delBid) => {
    setDelBid(delBid)
    refSheetDeleteBid.current?.open()
  }

  console.log("MY BIDSSS: ", myBids);

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
            <View
              key={bid.id + "-bid-" + i}
              className="bg-[#e6f0fd] w-full my-3 p-3 rounded-xl"
            >
              <View className="flex-row justify-start items-center gap-x-2">
                <Image
                  source={{ uri: bid.user.photoUrl }}
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
              <Text>{bid.message}</Text>
              <View className="mt-3 flex-row justify-between items-center">
                <Text>
                  Rp {bid.amount ? bid.amount.toLocaleString("id-ID") : 0}
                </Text>
                <View className="flex-row justify-center items-center gap-x-2">
                  {bid.status === "PENDING" && (
                    <TouchableOpacity onPress={() => handleOpenDelBottomSheet(bid)} activeOpacity={0.7} className="bg-red-500 px-2.5 py-1 rounded-full">
                      <Text className="text-white font-medium">Hapus</Text>
                    </TouchableOpacity>
                  )}
                  <Text className="bg-primary text-white font-medium px-2.5 py-1 rounded-full">
                    {bid.status}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>TIDAK ADA PENAWARAN</Text>
        )}
      </View>

      <BottomSheetDeleteBidAlert refRBSheet={refSheetDeleteBid} bid={delBid} />
    </ScrollView>
  );
}

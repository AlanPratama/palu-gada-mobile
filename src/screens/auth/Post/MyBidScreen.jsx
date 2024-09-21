import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import BidApi from "../../../apis/BidApi";
import { useSelector } from "react-redux";
import Divider from "../../../components/Divider";

export default function MyBidScreen() {
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { myBids } = useSelector((state) => state.bid)

  console.log("MY BIDSSS: ", myBids);
  

  const fetch = async () => {
    await BidApi.myBids()
  }

  useEffect(() => {
    fetch()
  }, []);
  // useFocusEffect to refresh data when screen gains focus
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
            <Text className="text-2xl mb-1 font-bold text-[#343434]">Penawaran Kamu</Text>
            
            {
              myBids.length > 0 ? myBids.map((bid, i) => (
                <View key={bid.id + "-bid-" + i} className="bg-[#f6f6f6] w-full my-3 p-3 rounded-xl">
                  <Text className="text-base font-medium text-[#343434]">{bid.post.title}</Text>
                  <Divider twClass={"my-2"}/>
                  <Text>{bid.message}</Text>
                  <View className="flex-row justify-between items-center">
                  <Text>Rp {bid.amount ? bid.amount.toLocaleString("id-ID") : 0}</Text>
                  <Text className="bg-primary text-white font-medium px-2.5 py-1 rounded-full">{bid.status}</Text>
                  </View>
                </View>
              )) : (
                <Text>TIDAK ADA PENAWARAN</Text>
              )
            }

        </View>
    </ScrollView>
  );
}

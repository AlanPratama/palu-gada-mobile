import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function MyBidScreen() {
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  useEffect(() => {
  }, []);
  // useFocusEffect to refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    // await fetchAllData();
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
            

        </View>
    </ScrollView>
  );
}

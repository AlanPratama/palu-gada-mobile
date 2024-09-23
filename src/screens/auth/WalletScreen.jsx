import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";

import AuthApi from "../../apis/AuthApi";
import BottomSheetWithDrawal from "../../components/Wallet/BottomSheetWithDrawal";
import TabPayoutHistory from "../../components/Wallet/TabPayoutHistory";

const TabTopUpHistory = () => {
  return (
    <View className="p-4 bg-white flex-1">
      {/* <Animated.Text
        entering={FadeIn.delay(250)}
        Text
        className="text-[#343434] font-bold text-2xl"
      >
        Riwayat Transaksi
      </Animated.Text> */}
      <Animated.View
        entering={FadeIn.delay(280)}
        className="flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-orange-500 p-2 rounded-full">
          <Ionicons name="chevron-back-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-orange-600 font-semibold text-[17px]">
            -Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-blue-500 p-2 rounded-full">
          <Ionicons name="chevron-forward-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-green-600 font-semibold text-[17px]">
            +Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-orange-500 p-2 rounded-full">
          <Ionicons name="chevron-back-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-orange-600 font-semibold text-[17px]">
            -Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-blue-500 p-2 rounded-full">
          <Ionicons name="chevron-forward-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-green-600 font-semibold text-[17px]">
            +Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-orange-500 p-2 rounded-full">
          <Ionicons name="chevron-back-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-orange-600 font-semibold text-[17px]">
            -Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-blue-500 p-2 rounded-full">
          <Ionicons name="chevron-forward-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-green-600 font-semibold text-[17px]">
            +Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-orange-500 p-2 rounded-full">
          <Ionicons name="chevron-back-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-orange-600 font-semibold text-[17px]">
            -Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(280)}
        className="mt-4 flex-row justify-start items-center gap-x-2"
      >
        <View className="bg-blue-500 p-2 rounded-full">
          <Ionicons name="chevron-forward-outline" size={24} color={"#fff"} />
        </View>
        <View>
          <Text className="text-green-600 font-semibold text-[17px]">
            +Rp 500.000
          </Text>
          <Text className="text-[#343434] font-medium text-[14px]">
            23 Sept 2024
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default function WalletScreen() {
  const navigate = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const refSheetWithDrawal = useRef();
  const { user } = useSelector((state) => state.auth);

  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  // useFocusEffect to refresh data when screen gains focus

  const fetch = async () => {
    await AuthApi.getAuthenticated();
  };

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

  const handleTarikSaldoPress = () => {
    if (user.balance < 10000) {
      ToastAndroid.show(
        "Saldo kurang dari minimum penarikan\nMinimum penarikan Rp 10.000",
        1500
      );
    } else {
      refSheetWithDrawal.current?.open();
    }
  };

  return (
    <View className="min-h-screen bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-3 flex-grow-0"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <Animated.View
          entering={FadeIn.delay(100)}
          className="flex-row justify-between items-center mb-4"
        >
          <View className="flex-row justify-start items-center gap-x-2">
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
        </Animated.View>

        <Animated.View
          entering={FadeIn.delay(200)}
          className="pt-8 pb-12 px-10 bg-[#3f45f9] rounded-[18px]"
        >
          <View className="mb-1.5 flex-row justify-start items-center gap-x-2">
            <Ionicons name="wallet-outline" size={32} color="white" />
            <Text className="text-white font-bold text-xl">Saldo</Text>
          </View>
          <Text className="text-white font-bold text-3xl">
            Rp {user.balance ? user.balance.toLocaleString("id-ID") : 0}
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(200)}
          className="flex-row justify-center items-center gap-x-2 -mt-5"
        >
          <TouchableOpacity
            onPress={() => navigate.navigate("TopUp")}
            activeOpacity={0.7}
            className="flex-row justify-center items-center py-1.5 px-5 bg-green-500 rounded-full"
          >
            <Ionicons name="arrow-up-outline" size={20} color="white" />
            <Text className="text-center text-base text-white font-bold">
              Top Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTarikSaldoPress}
            activeOpacity={0.7}
            className={`${
              user.balance < 10000 ? "bg-gray-300" : "bg-orange-500"
            } flex-row justify-center items-center py-1.5 px-5 rounded-full`}
          >
            <Ionicons name="arrow-down-outline" size={20} color="white" />
            <Text className="text-center text-base text-white font-bold">
              Tarik Saldo
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      <View className="flex-1 flex-grow">
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: "white" }, // Style the tab bar itself
            tabBarIndicatorStyle: { backgroundColor: "blue" }, // Tab indicator color
          }}
        >
          <Tab.Screen name="Riwayat Top Up" component={TabTopUpHistory} />
          <Tab.Screen
            name="Riwayat Tarik Saldo"
            component={TabPayoutHistory}
            options={{ lazy: true }}
          />
        </Tab.Navigator>
      </View>

      <BottomSheetWithDrawal refRBSheet={refSheetWithDrawal} />
    </View>
  );
}

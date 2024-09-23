import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";

import AuthApi from "../../apis/AuthApi";
import BottomSheetWithDrawal from "../../components/Wallet/BottomSheetWithDrawal";
import TabPayoutHistory from "../../components/Wallet/TabPayoutHistory";
import TabPaymentHistory from "../../components/Wallet/TabPaymentHistory";

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
      alert('Saldo kurang dari minimum penarikan\nMinimum penarikan Rp 10.000')
    } else {
      refSheetWithDrawal.current?.open()
    }
  }

  return (
    <View className='min-h-screen bg-white'>
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
            className={`${user.balance < 10000 ? 'bg-gray-300' : 'bg-orange-500'} flex-row justify-center items-center py-1.5 px-5 rounded-full`}
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
            tabBarStyle: { backgroundColor: 'white' }, // Style the tab bar itself
            tabBarIndicatorStyle: { backgroundColor: 'blue' }, // Tab indicator color
          }}>
          <Tab.Screen name="Riwayat Top Up" component={TabPaymentHistory} />
          <Tab.Screen name="Riwayat Tarik Saldo" component={TabPayoutHistory} options={{ lazy: true }} />
        </Tab.Navigator>
      </View>

      <BottomSheetWithDrawal refRBSheet={refSheetWithDrawal} />
    </View>
  );
}

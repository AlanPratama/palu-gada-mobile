import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthApi from "../../apis/AuthApi";
import { useSelector } from "react-redux";
import BottomSheetUserDetail from "../../components/User/BottomSheetUserDetail";

export default function ProfileScreen() {
  const navigate = useNavigation();

  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const refSheetUserDetail = useRef();
  console.log(user);

  const handleLogout = async () => {
    try {
      await AuthApi.logout();
      console.log("Berhasil logout");
      navigate.replace("Welcome");
    } catch (error) {
      console.log("Logout Button Err: ", error);
    }
  };

  const getAuthenticated = async () => {
    await AuthApi.getAuthenticated()
  }

  useFocusEffect(
    useCallback(() => {
      getAuthenticated();
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await getAuthenticated();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="justify-start items-center min-h-screen">
        <Image
          source={require("../../../assets/wallpaper.png")}
          className="w-full h-[102px]"
        />
        <View className="bg-white w-full justify-start items-center">
          <View className="-mt-16 p-4 bg-white rounded-[200px]">
            <Image
              source={
                !user.photoUrl
                  ? require("../../../assets/userImgPlaceholder.png")
                  : { uri: user.photoUrl }
              }
              className="w-32 h-32 rounded-full"
            />
          </View>
          <Text className="text-center text-xl font-bold text-[#343434]">
            {user?.username}
          </Text>
          <Text className="text-center text-base font-normal text-[#343434]">
            {user?.email}
          </Text>
        </View>

        <View className="bg-white pb-8 pt-6 px-4 justify-center items-start w-full">
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
            onPress={() => refSheetUserDetail.current?.open()}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons name="id-card-outline" size={24} color="#fff" />
              </View>
              <Text className="text-base font-bold text-[#343434]">
                Detail Profile
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
            onPress={() => navigate.push("EditProfile")}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons name="person-outline" size={24} color="#fff" />
              </View>
              <Text className="text-base font-bold text-[#343434]">
                Edit Profile
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
            onPress={() => navigate.navigate("ChangePassword")}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons name="lock-closed-outline" size={24} color="#fff" />
              </View>
              <Text className="text-base font-bold text-[#343434]">
                Ganti Password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
            onPress={() => navigate.navigate("Wallet")}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons name="wallet-outline" size={24} color="#fff" />
              </View>
              <Text className="text-base font-bold text-[#343434]">
                Dompetku
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            onPress={() => Linking.openURL("https://wa.wizard.id/b8dd7a")}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={24}
                  color="#fff"
                />
              </View>
              <Text className="text-base font-bold text-[#343434]">
                Kontak & Bantuan
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "#262626",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.15,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            className="border-t border-gray-50 my-2 w-full flex-row justify-between items-center bg-white p-2 rounded-full"
            activeOpacity={0.85}
            onPress={handleLogout}
          >
            <View className="flex-row justify-start items-center gap-x-2.5">
              <View className="bg-[#3f45f9] p-2 rounded-full">
                <Ionicons name="log-out-outline" size={24} color="#fff" />
              </View>
              <Text className="text-base font-bold text-[#343434]">Keluar</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#343434"}
            />
          </TouchableOpacity>
        </View>
        <BottomSheetUserDetail
          refRBSheet={refSheetUserDetail}
          user={user}
          animation="fade"
        />
      </View>
    </ScrollView>
  );
}

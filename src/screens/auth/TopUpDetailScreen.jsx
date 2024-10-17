import { Ionicons } from "@expo/vector-icons";
import { setStringAsync } from "expo-clipboard";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import WalletApi from "../../apis/WalletApi";
import AuthApi from "../../apis/AuthApi";
import { useNavigation } from "@react-navigation/native";

export default function TopUpDetailScreen({ route }) {
  const payment = route.params.payment;
  const [remainingTime, setRemainingTime] = useState(payment.expiryTime);
  const navigate = useNavigation();

  console.log("route: ", payment);

  useEffect(() => {
    const expiryTime = new Date(payment.expiryTime);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const difference = expiryTime - currentTime;

      if (difference <= 0) {
        clearInterval(interval);
        setRemainingTime("Expired");
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    setStringAsync(payment.vaNumber);
    Alert.alert("Copied!", "VA Number has been copied to clipboard");
  };

  const fetchPayment = async () => {
    const res = await WalletApi.fetchPayment(payment.id);

    if (res.status === "OK") {
      if (res.data.status === "SETTLEMENT") {
        await AuthApi.getAuthenticated();
        ToastAndroid.show("Payment Success!", 1500);
        navigate.goBack();
      } else {
        ToastAndroid.show("Belum Dibayar Bujang!", 1500);
      }
    } else {
      ToastAndroid.show("Terjadi error coy!", 1500);
    }
  };

  return (
    <>
      <Image
        source={require("../../../assets/bgPayment.png")}
        className="absolute top-0 min-h-screen w-full"
      />
      <View className="min-h-screen p-3 items-center justify-center">
        <View className="relative justify-center items-center w-full bg-primary border border-gray-100 rounded-xl pt-6 pb-12 px-3">
          <Text className="text-2xl capitalize font-medium text-[#fff] mb-3">
            {payment.bank} Virtual Number
          </Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            className="flex-row justify-center items-center gap-x-1"
          >
            <Ionicons name="copy-outline" size={20} color="#fff" />
            <Text className="text-3xl font-medium text-[#fff]">
              {payment.vaNumber}
            </Text>
          </TouchableOpacity>
          <View className="absolute -bottom-4 flex-row justify-center items-center px-2 py-1 rounded-lg bg-orange-500">
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text className="text-base font-medium text-[#fff] ml-1.5">
              {remainingTime ? remainingTime : "Loading..."}
            </Text>
          </View>
        </View>

        <View className="absolute bottom-2 w-full">
          <TouchableOpacity
            onPress={fetchPayment}
            className="bg-primary py-2.5 rounded-lg border border-gray-100"
          >
            <Text className="text-white text-center font-extrabold text-base">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

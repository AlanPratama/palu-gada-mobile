import { Ionicons } from "@expo/vector-icons";
import { setStringAsync } from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import WalletApi from "../../apis/WalletApi";
import AuthApi from "../../apis/AuthApi";
import { useNavigation } from "@react-navigation/native";

export default function TopUpDetailScreen({ route }) {
  const payment = route.params.payment;
  const [remainingTime, setRemainingTime] = useState(payment.expiryTime);
  const navigate = useNavigation()

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

    if(res.status === "OK") {
      if(res.data.status === "SETTLEMENT") {
        await AuthApi.getAuthenticated()
        alert("Payment Success!")
        navigate.goBack()
      } else {
        alert("Belum Dibayar Bujang!")
      }
    }  else {
      alert("Terjadi error coy!")
    }
  }


  return (
    <>
      <Image
        source={{
          uri: "https://imgs.search.brave.com/rArZHbLIJROU4DsZykn8ChxL751pDVfxV2Y2-L6EgE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jNC53/YWxscGFwZXJmbGFy/ZS5jb20vd2FsbHBh/cGVyLzY0My8yODUv/MjIxL3NpbXBsZS1i/YWNrZ3JvdW5kLWJs/dWUtZ3JhZGllbnQt/d2F2ZWZvcm1zLXdh/bGxwYXBlci1wcmV2/aWV3LmpwZw",
        }}
        className="absolute top-0 min-h-screen w-full"
      />
      <View className="min-h-screen p-3 items-center justify-center">
        <View className="relative justify-center items-center w-full bg-primary border border-gray-100 rounded-xl pt-6 pb-12 px-3">
          <Text className="text-2xl font-medium text-[#fff] mb-3">
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
          <TouchableOpacity onPress={fetchPayment} className="bg-primary py-2.5 rounded-lg border border-gray-100">
            <Text className="text-white text-center font-extrabold text-base">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

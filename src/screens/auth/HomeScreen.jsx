import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";
import Divider from "../../components/Divider";
import BottomSheetAddPost from "../../components/Post/BottomSheetAddPost";

export default function HomeScreen() {
  const navigate = useNavigation();

  const refSheetAddPost = useRef();

  const clearOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnBoarding");
    } catch (error) {
      console.log("ERROR CLEARING ONBOARDING: ", error);
    }
  };

  const l = [{}, {}, {}, {}, {}];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 110 }} className='bg-white min-h-screen '>
      <View className='bg-[#fff] px-3 pt-4 flex-row justify-between items-center'>
        <Text className='text-[26px] font-bold text-primary'>Kerjain Aja</Text>
        <View className='flex-row justify-center items-center gap-x-2'>
          <TouchableOpacity onPress={() => navigate.navigate("Notification")} activeOpacity={0.5}>
            <Ionicons name='notifications-outline' size={26} color='#343434' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name='chatbox-ellipses-outline' size={26} color='#343434' />
          </TouchableOpacity>
        </View>
      </View>

      <PagerView className='h-52 mt-4' initialPage={0}>
        <View className='h-52 mx-3 rounded-[13px] justify-center items-center' key='1'>
          <Image source={require("../../../assets/pager1.png")} alt='Pager1' className='w-full h-52 rounded-[13px]' />
        </View>
        <View className='h-52 mx-3 rounded-[13px] justify-center items-center' key='2'>
          <Image source={require("../../../assets/pager2.png")} alt='Pager1' className='w-full h-52 rounded-[13px]' />
        </View>
        <View className='h-52 mx-3 rounded-[13px] justify-center items-center' key='3'>
          <Image source={require("../../../assets/pager3.png")} alt='Pager1' className='w-full h-52 rounded-[13px]' />
        </View>
      </PagerView>

      <View
        className='mx-8 py-3 mb-6 -mt-8 bg-white flex-row justify-center items-center rounded-[13px]'
        style={{
          shadowColor: "#343434",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <TouchableOpacity onPress={() => navigate.navigate("Wallet")} activeOpacity={0.5} className='flex-row justify-evenly items-center w-[52%]'>
          {/* <View className=""><Ionicons name='wallet-outline' size={28} color='#303030' /></View> */}
          <View>
            <View className='flex-row justify-start items-center'>
              <Ionicons name='wallet-outline' size={15} color='#303030' />
              <Text className='text-[15.5px] font-semibold'> Saldo</Text>
            </View>
            <Text className='text-[16px] leading-6 font-bold'>Rp. 1.000.000.000</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} className='flex-row justify-evenly items-center w-[48%]'>
          {/* <View className=""><Ionicons name='wallet-outline' size={28} color='#303030' /></View> */}
          <View>
            <View className='flex-row justify-start items-center'>
              <Ionicons name='wallet-outline' size={15} color='#303030' />
              <Text className='text-[15.5px] font-semibold'> Bekerja</Text>
            </View>
            <Text className='text-[16px] leading-6 font-bold'>90x</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className='px-3 mb-4 flex-row justify-center items-center gap-x-2'>
        <TouchableOpacity activeOpacity={0.7} className='bg-orange-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center'>
          <Ionicons name='information-outline' size={20} color='white' />
          <Text className='text-white font-semibold text-center'>Cara Kerja</Text>
        </TouchableOpacity>

        {/* #24bd5c */}
        <TouchableOpacity
          onPress={() => refSheetAddPost.current?.open()}
          activeOpacity={0.7}
          className='bg-green-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center'
        >
          <Ionicons name='add-outline' size={20} color='white' />
          <Text className='text-white font-semibold text-center'>Buat Postingan</Text>
        </TouchableOpacity>
      </View>

      <View className='px-3'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-center text-[#343434] font-bold text-[20px]'>Kategori</Text>
          {/* <Ionicons name="chevron-forward-outline" size={18} /> */}
        </View>
        <ScrollView className='py-3.5' horizontal={true} showsHorizontalScrollIndicator={false}>
          {l.map((_, i) => (
            <TouchableOpacity key={i} className='bg-blue-100 rounded-full px-3.5 py-1 mr-2 justify-center items-center'>
              <Text className='text-[14.5px] font-semibold text-primary'>Kurir</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className='px-3 mt-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-center text-[#343434] font-bold text-[20px]'>Kerjain Aja: Terdekat</Text>
          {/* <Ionicons name="chevron-forward-outline" size={18} /> */}
        </View>

        {l.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigate.navigate("PostDetail", {
                id: i,
                title: "Serba Bisa",
              })
            }
            activeOpacity={0.5}
            className='my-3.5 flex-row justify-start items-start gap-x-2.5'
          >
            <Image
              source={{
                uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt=''
              className='w-[88px] h-[88px] border border-gray-200 rounded-xl'
            />
            <View className='w-[68%]'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-sm font-bold text-primary'>Serba Bisa</Text>
                <View className='flex-row justify-center items-center gap-x-1'>
                  <Text className='text-sm font-normal text-[#343434]'>2 jam lalu</Text>
                  <Ionicons name='time-outline' size={18} />
                </View>
              </View>
              <Text numberOfLines={1} className='text-[17px] font-bold text-[#343434]'>
                Kuburin kucing aku
              </Text>
              <Text numberOfLines={2} className='text-sm font-normal text-[#343434]'>
                halo banh, jadi ada kucing aku yang namanya Boni, dia kucing kesayanganku, tolong bantu kuburin dong :(
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View className='px-3 mt-2'>
        <Divider color='#d9d9d9' width={2} />
      </View>

      <View className='px-3 mt-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='text-center text-[#343434] font-bold text-[20px]'>Kerjain Aja: Terbaru</Text>
          {/* <Ionicons name="chevron-forward-outline" size={18} /> */}
        </View>

        {l.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigate.navigate("PostDetail", {
                id: i,
                title: "Serba Bisa",
              })
            }
            activeOpacity={0.5}
            className='my-3.5 flex-row justify-start items-start gap-x-2.5'
          >
            <Image
              source={{
                uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt=''
              className='w-[88px] h-[88px] border border-gray-200 rounded-xl'
            />
            <View className='w-[68%]'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-sm font-bold text-primary'>Serba Bisa</Text>
                <View className='flex-row justify-center items-center gap-x-1'>
                  <Text className='text-sm font-normal text-[#343434]'>2 jam lalu</Text>
                  <Ionicons name='time-outline' size={18} />
                </View>
              </View>
              <Text numberOfLines={1} className='text-[17px] font-bold text-[#343434]'>
                Kuburin kucing aku
              </Text>
              <Text numberOfLines={2} className='text-sm font-normal text-[#343434]'>
                halo banh, jadi ada kucing aku yang namanya Boni, dia kucing kesayanganku, tolong bantu kuburin dong :(
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <BottomSheetAddPost refRBSheet={refSheetAddPost} />
    </ScrollView>
  );
}

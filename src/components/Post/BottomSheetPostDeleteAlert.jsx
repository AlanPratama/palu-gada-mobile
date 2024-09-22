import React, { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";
import BidApi from "../../apis/BidApi";
import { useNavigation } from "@react-navigation/native";
import PostApi from "../../apis/PostApi";

export default function BottomSheetPostDeleteAlert({ refRBSheet, post, resetPostItems }) {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "gray",
            width: 100,
            height: 5,
            borderRadius: 5,
            marginVertical: 10,
          },
          container: {
            height: "27%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <PostDeleteAlertComp refRBSheet={refRBSheet} post={post} resetPostItems={resetPostItems} />
      </RBSheet>
    </View>
  );
}

const PostDeleteAlertComp = ({ refRBSheet, post, resetPostItems }) => {

    console.log(post);

    const navigate = useNavigation()

    const onSubmit = async () => {
      const res = await PostApi.deletePost(post.id)

      if(res.data.status === "OK") {
          alert("Berhasil Menghapus Post!")
          refRBSheet.current?.close()
          resetPostItems()
          navigate.goBack()
      } else {
        alert("Gagal Menghapus Post!")
      }

    }
    

  return (
    <>
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={{ marginTop: 26 }} className="px-8">
          <Text className="text-base font-semibold text-[#343434] mb-2 text-center">Apakah kamu yakin akan menghapus postingan '{post.title}'?</Text>

          <View className="mb-4 flex-row justify-center items-center gap-x-2 mt-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => refRBSheet.current?.close()} 
            className="w-[48%] bg-[#fff] py-3.5 rounded-full"
          >
            <Text className="text-red-500 text-lg font-semibold text-center">
              Batal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSubmit()}
            activeOpacity={0.8}
            className="w-[48%] bg-red-500 py-3.5 rounded-full"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Ya, saya yakin
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </>
  );
};

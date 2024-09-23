import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";
import BidApi from "../../apis/BidApi";
import { useNavigation } from "@react-navigation/native";

export default function BottomSheetBidAlert({ refRBSheet, objBid }) {
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
        <BidAlertComp refRBSheet={refRBSheet} objBid={objBid} />
      </RBSheet>
    </View>
  );
}

const BidAlertComp = ({ refRBSheet, objBid }) => {
  console.log(objBid);

  const navigate = useNavigation();

  const onSubmit = async () => {
    const res = await BidApi.updateBidStatus(objBid.bid.id, objBid.status);

    if (res) {
      ToastAndroid.show("Berhasil Merubah Bid Status!", 1500);
      navigate.navigate("PostDetail", { post: res.post });
      refRBSheet.current?.close();
    } else {
      ToastAndroid.show("Gagal Merubah Bid Status!", 1500);
    }
  };

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
          <Text className="text-base font-semibold text-[#343434] mb-2 text-center">
            Apakah kamu yakin akan mengubah status Bid ini menjadi{" "}
            {objBid.status}?
          </Text>

          <View className="mb-4 flex-row justify-center items-center gap-x-2 mt-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => refRBSheet.current?.close()}
              className="w-[48%] bg-[#fff] py-3.5 rounded-full"
            >
              <Text className="text-[#3f45f9] text-lg font-semibold text-center">
                Batal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSubmit()}
              activeOpacity={0.8}
              className="w-[48%] bg-[#3f45f9] py-3.5 rounded-full"
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

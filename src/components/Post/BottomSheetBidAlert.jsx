import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Divider from "../Divider";

export default function BottomSheetBidAlert({ refRBSheet, bid }) {
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
            height: "100%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <BidAlertComp refRBSheet={refRBSheet} bid={bid} />
      </RBSheet>
    </View>
  );
}

const BidAlertComp = ({ refRBSheet, bid }) => {

  const [status, setStatus] = React.useState("")
  const dialogueRefSheet = React.useRef()

  const openRefSheetDialogue = (status) => {
    setStatus(status)
    console.log(status);
    dialogueRefSheet.current?.open()
  }

  return (
    <>
      <ScrollView
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: "100%",
          backgroundColor: "white",
        }}
        contentContainerStyle={{ paddingBottom: 115 }}
        className="min-h-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 26 }} className="pl-3 pr-5">
          ALERT    
        </View>
      </ScrollView>
    </>
  );
};

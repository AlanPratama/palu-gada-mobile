import React, { useState } from "react";
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RBSheet from "react-native-raw-bottom-sheet";
import AuthApi from "../../apis/AuthApi";
import PostApi from "../../apis/PostApi";
import { useNavigation } from "@react-navigation/native";

export default function BottomSheetPostStatusChange({ refRBSheet, post }) {
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
            height: "30%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        openDuration={250}
      >
        <PostStatusChangeComp refRBSheet={refRBSheet} post={post} />
      </RBSheet>
    </View>
  );
}

const listStatus = [
  {
    key: "AVAILABLE",
    value: "Tersedia",
  },
  {
    key: "NOT_AVAILABLE",
    value: "Tidak Tersedia",
  },
];

const PostStatusChangeComp = ({ refRBSheet, post }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusType, setStatusType] = useState("");
  const navigate = useNavigation();

  const onSubmit = async () => {
    setIsSubmitted(true);
    const res = await PostApi.updatePostStatus(post.id, statusType);
    console.log("LALALLAA: ", res.data);

    if (res) {
      ToastAndroid.show("Berhasil ubah status", 1500);
      navigate.navigate("PostDetail", { post: res.data.data });
      refRBSheet.current.close();
    }
    setIsSubmitted(false);
  };

  return (
    <ScrollView
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={{ paddingVertical: 20 }}>
        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Status
          </Text>
          <SelectList
            maxHeight={500}
            setSelected={(key) => setStatusType(key)}
            data={listStatus}
            save="key"
            defaultOption={{
              key: post.status,
              value:
                post.status === "AVAILABLE" ? "Tersedia" : "Tidak Tersedia",
            }}
            label="Transfer Type"
            placeholder="Pilih Status..."
            searchPlaceholder="Cari..."
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 8,
            paddingHorizontal: 18,
          }}
        >
          <TouchableOpacity
            onPress={() => onSubmit()}
            disabled={isSubmitted}
            style={{
              backgroundColor: isSubmitted ? "#d1d1d1" : "#3b82f6",
              flex: 1,
              paddingVertical: 14,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import BidApi from "../../apis/BidApi";
import UserApi from "../../apis/UserApi";
import NotificationApi from "../../apis/NotificationApi";
import { notifIcon } from "../../utils/notification.util";

export default function BottomSheetUserReport({ refRBSheet, userId }) {
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
            height: "33%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <UserReportComp refRBSheet={refRBSheet} userId={userId} />
      </RBSheet>
    </View>
  );
}

const UserReportComp = ({ refRBSheet, userId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("USERID: ", userId);

  const navigate = useNavigation();

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    // refRBSheet.current.close();
    const res = await UserApi.userReport({
      userId,
      message: data.message,
    });

    console.log(res);

    if (res) {
      await NotificationApi.createNotification({
        userId: userId,
        title: "Akunmu dilaporkan!",
        description: `Seseorang telah melaporkan kamu! Pesan: ${data.message}`,
        isRead: false,
        icon: notifIcon.report,
      })
      reset()
      refRBSheet.current.close();
      setIsSubmitted(false);
      // navigate.goBack();
    } else {
      setIsSubmitted(false);
      ToastAndroid.show("Gagal melaporkan user ini!", 1500);
    }
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
      <View style={{ marginTop: 26 }}>
        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Pesan
          </Text>
          <Controller
            control={control}
            rules={{
              required: "Pesan wajib diisi!",
              validate: (value) => value.length >= 10 || "Minimal 10 karakter!",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Masukkan Pesan..."
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
            )}
            name="message"
          />
          {errors.message && (
            <Text style={{ color: "red" }}>{errors.message.message}</Text>
          )}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 8,
            paddingHorizontal: 18,
            paddingBottom: 25,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitted}
            style={{
              backgroundColor: isSubmitted ? "#d1d1d1" : "#ef4444",
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
              Kirim Laporan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

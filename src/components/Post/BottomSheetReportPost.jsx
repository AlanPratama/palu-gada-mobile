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
import PostApi from "../../apis/PostApi";

export default function BottomSheetReportPost({ refRBSheet, postId }) {
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
            height: "40%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <ReportPostComp refRBSheet={refRBSheet} postId={postId} />
      </RBSheet>
    </View>
  );
}

const ReportPostComp = ({ refRBSheet, postId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    console.log("MEASA:", data);
    console.log("JALSAJAAA:", postId);
    const request = {
      postId: postId,
      message: data.message,
    };
    const res = await PostApi.reportPost(request);
    if (res) {
      reset();
      ToastAndroid.show("Berhasil Report Postingan!", 1500);
      refRBSheet.current.close();
      setIsSubmitted(false);
    } else {
      ToastAndroid.show("Gagal Report Postingan!", 1500);
      setIsSubmitted(false);
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
            Kasih Tau Keresahan Kamu
          </Text>
          <Controller
            control={control}
            name="message"
            rules={{
              required: "Pesan wajib diisi!",
              validate: (value) => value.length >= 10 || "Minimal 10 karakter!",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Postingan mengandung sara / pornografi / kekerasan / dll..."
                multiline
                numberOfLines={2}
                style={{
                  padding: 6,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
            )}
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
            className={`${
              isSubmitted ? "bg-[#d1d1d1]" : "bg-red-500"
            } w-full py-3.5 rounded-full`}
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

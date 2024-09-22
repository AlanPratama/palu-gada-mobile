import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import WalletApi from "../../apis/WalletApi";

export default function BottomSheetTopUpBCA({ refRBSheet }) {
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
            height: "32%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <TopUpBCAComp refRBSheet={refRBSheet} />
      </RBSheet>
    </View>
  );
}

const TopUpBCAComp = ({ refRBSheet }) => {
  const navigate = useNavigation()
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitted(true)
    console.log("data: ", data);
    
    const request = {
      "bank": "bca",
      "amount": data.amount,
      "paymentType": "bank_transfer"
    }
    const res = await WalletApi.createPayment(request);
    console.log("res: ", res);
    

    if(res.status === "Created") {
      navigate.replace("TopUpDetail", { payment: res.data })
    } else {
      alert("Terjadi Error coyy")
      setIsSubmitted(false)
    }

    // refRBSheet.current.close();
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
            Nominal
          </Text>
          <Controller
            control={control}
            name="amount"
            rules={{
              required: "Nominal wajib diisi!",
              validate: (value) => value >= 10_000 || "Minimal nominal Rp 10.000",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                placeholder="100.000"
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
            )}
          />
          {errors.amount && (
            <Text style={{ color: "red" }}>{errors.amount.message}</Text>
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
            disabled={isSubmitted}
            onPress={handleSubmit(onSubmit)}
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

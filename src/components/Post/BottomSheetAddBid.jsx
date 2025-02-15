import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BidApi from '../../apis/BidApi';
import { useNavigation } from '@react-navigation/native';
import NotificationApi from '../../apis/NotificationApi';
import { notifIcon } from '../../utils/notification.util';

export default function BottomSheetAddBid({ refRBSheet, post }) {
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
            height: "45%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <AddBidComp refRBSheet={refRBSheet} post={post} />
      </RBSheet>
    </View>
  );
}

const AddBidComp = ({ refRBSheet, post }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigation();

    const onSubmit = async (data) => {
      setIsSubmitted(true)
        refRBSheet.current.close()
        const res = await BidApi.createBid({
            postId: post.id,
            amount: parseInt(data.amount),
            message: data.message
        })

        if(res) {
          await NotificationApi.createNotification({
            userId: post.user.id,
            title: "Ada Penawaran Terbaru!",
            description: `Ada penawaran terbaru untuk postingan ${post.title}. Pesan: ${data.message}`,
            isRead: false,
            icon: notifIcon.post,
          })
            refRBSheet.current.close()
            navigate.navigate("PostDetail", { post })
        } else {
            ToastAndroid.show("Gagal Mengirim Penawaran!", 2000);
            // alert("Gagal menawar!")
        }
      setIsSubmitted(false)
        reset()
    }

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
            Harga Penawaran
          </Text>
          <Controller
            control={control}
            rules={{
              required: "Harga Penawaran wajib diisi!",
              validate: (value) =>
                (value >= post.budgetMin && value <= post.budgetMax) ||
                `Harga penawaran minimal ${post.budgetMin.toLocaleString(
                  "id-ID"
                )} dan maksimal ${post.budgetMax.toLocaleString("id-ID")}`,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={`Rp ${post.budgetMin?.toLocaleString(
                  "id-ID"
                )} - ${post.budgetMax?.toLocaleString("id-ID")}`}
                keyboardType="numeric"
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
            )}
            name="amount"
          />
          {errors.amount && (
            <Text style={{ color: "red" }}>{errors.amount.message}</Text>
          )}
        </View>

        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Pesan Kamu
          </Text>
          <Controller
            control={control}
            rules={{
              validate: (value) =>
                (value.length >= 10 && value.length <= 500) ||
                "Panjang pesan antara 10 hingga 500 karakter",
              required: "Pesan wajib diisi!",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                multiline
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
                Kirim Penawaran
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
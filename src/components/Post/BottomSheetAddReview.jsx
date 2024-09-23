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
import StarRating from "react-native-star-rating-widget";
import BidApi from "../../apis/BidApi";
import NotificationApi from "../../apis/NotificationApi";
import { notifIcon } from "../../utils/notification.util";

export default function BottomSheetAddReview({ refRBSheet, postId, userId }) {
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
            height: "47%",
          },
        }}
        customModalProps={{
          animationType: "slide",
        }}
        height={500}
        openDuration={250}
      >
        <AddReviewComp
          refRBSheet={refRBSheet}
          postId={postId}
          userId={userId}
        />
      </RBSheet>
    </View>
  );
}

const AddReviewComp = ({ refRBSheet, postId, userId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(5);
  console.log("RATING: ", rating);

  const reviews = [
    "Sangat Buruk",
    "Buruk",
    "Cukup Bagus",
    "Bagus",
    "Sangat Bagus",
  ];

  const navigate = useNavigation();

  const onSubmit = async (data) => {
    // refRBSheet.current.close();
    const res = await BidApi.createReview({
      postId,
      userId,
      rating,
      comment: data.comment,
    });

    if (res) {
      await NotificationApi.createNotification({
        userId: post.user.id,
        title: "Ada ulasanmu terbaru!",
        description: `Seseorang telah menulis ulasan untuk kamu! Ulasan: ${data.comment}`,
        isRead: false,
        icon: notifIcon.review,
      })
      refRBSheet.current.close();
      navigate.goBack();
    } else {
      ToastAndroid.show("Gagal menawar!", 1500);
      alert("Gagal mengirim ulasan!");
    }

    // const res = await BidApi.createBid({
    //     postId: post.id,
    //     amount: parseInt(data.amount),
    //     message: data.message
    // })

    // if(res) {
    //     refRBSheet.current.close()
    //     navigate.goBack()
    // } else {
    //     alert("Gagal menawar!")
    // }
    // reset()
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
          <View className="justify-center items-center">
            <Text className="mb-2.5 text-center text-2xl text-yellow-400 font-bold">
              {reviews[rating - 1]}
            </Text>
            <StarRating
              starSize={40}
              maxStars={5}
              enableHalfStar={false}
              rating={rating}
              onChange={setRating}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 18, marginBottom: 25 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
            Komentar
          </Text>
          <Controller
            control={control}
            rules={{
              required: "Komentar wajib diisi!",
              validate: (value) =>
                value.length < 255 || `Maksimal 255 Karakter`,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Masukkan Komentar..."
                style={{
                  padding: 10,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              />
            )}
            name="comment"
          />
          {errors.comment && (
            <Text style={{ color: "red" }}>{errors.comment.message}</Text>
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
            style={{
              backgroundColor: "#3b82f6",
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
              Kirim Ulasan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

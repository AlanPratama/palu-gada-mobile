import React from "react";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BottomSheetMyBidDetail({ refRBSheet, objBid }) {
  console.log("BidDetail:", objBid);

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
            width: 60,
            height: 6,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "82%",
          },
        }}
      >
        <BidDetailComp objBid={objBid} />
      </RBSheet>
    </View>
  );
}

const BidDetailComp = ({ objBid }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Penawaran</Text>
        <View style={styles.bidInfo}>
          <Text style={styles.label}>Jumlah:</Text>
          <Text style={styles.value}>Rp {objBid.amount}</Text>
        </View>
        <View style={styles.bidInfo}>
          <Text style={styles.label}>Fee:</Text>
          <Text style={styles.value}>Rp {objBid.fee}</Text>
        </View>
        <View style={styles.bidInfo}>
          <Text style={styles.label}>Status:</Text>
          <Text
            className={`font-bold ${
              objBid.status === "PENDING"
                ? "text-yellow-400"
                : objBid.status === "ACCEPTED"
                ? "text-green-400"
                : objBid.status === "REJECTED"
                ? "text-red-400"
                : objBid.status === "FINISH"
                ? "text-blue-400"
                : "text-purple-400"
            }`}
          >
            {objBid.status}
          </Text>
        </View>
        <View style={styles.bidInfo}>
          <Text style={styles.label}>Dibuat:</Text>
          <Text style={styles.value}>{formatDate(objBid.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pemilik Postingan</Text>
        <View style={styles.userInfo}>
          <Image
            source={
              objBid.post?.user?.photoUrl
                ? { uri: objBid.post.user.photoUrl }
                : require("../../../assets/userImgPlaceholder.png")
            }
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {objBid.post?.user?.name ?? "Tidak ada nama"}
            </Text>
            <Text style={styles.userUsername}>
              {objBid.post?.user?.username}
            </Text>
            <Text style={styles.userAbout}>
              {objBid.post?.user?.about || "Tidak ada deskripsi"}
            </Text>
            <View className="mt-4">
              <View className="flex flex-row">
                <Ionicons name="map-outline" size={16} color="#666" />
                <Text style={styles.postMetaText}>
                  Alamat: {objBid.post?.district?.districtName ?? "-"}
                </Text>
              </View>
              <View className="flex flex-row">
                <Ionicons name="call-outline" size={16} color="#666" />
                <Text style={styles.postMetaText}>
                  No Telp: {objBid.post?.user?.phone ?? "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Postingan</Text>
        <View style={styles.postInfo}>
          <Text style={styles.postTitle}>{objBid.post?.title}</Text>
          <Text style={styles.postDescription}>{objBid.post?.description}</Text>
          <View style={styles.postMeta}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.postMetaText}>
              Deadline: {formatDate(objBid.post?.deadline)}
            </Text>
          </View>
          <View style={styles.postMeta}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.postMetaText}>
              Budget: Rp {objBid.post?.budgetMin} - Rp {objBid.post?.budgetMax}
            </Text>
          </View>
          {objBid.post?.isUrgent && (
            <View style={styles.urgentTag}>
              <Text style={styles.urgentText}>URGENT</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  bidInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userUsername: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  userAbout: {
    fontSize: 14,
    color: "#333",
  },
  postInfo: {
    marginTop: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  postMetaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  urgentTag: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  urgentText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

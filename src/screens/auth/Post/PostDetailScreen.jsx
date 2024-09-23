import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Divider from "../../../components/Divider";
import BottomSheetAddBid from "../../../components/Post/BottomSheetAddBid";
import BottomSheetPostDeleteAlert from "../../../components/Post/BottomSheetPostDeleteAlert";
import BottomSheetPostDetailBid from "../../../components/Post/BottomSheetPostDetailBid";
import BottomSheetPostStatusChange from "../../../components/Post/BottomSheetPostStatusChange";
import BottomSheetReportPost from "../../../components/Post/BottomSheetReportPost";
import BottomSheetUserDetail from "../../../components/User/BottomSheetUserDetail";
import PostApi from "../../../apis/PostApi";

export default function PostDetailScreen({ route }) {
  const { post: postParam, resetPostItems } = route.params;
  const { item: post } = useSelector((state) => state.post);
  // const [post, setPost] = useState(postParam)

  const { user } = useSelector((state) => state.auth);

  console.log("LALALLAA: ", post.bids);

  const [alreadyBid, setAlreadyBid] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [canDelPost, setCanDelPost] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigation();

  const refSheetAddBid = useRef();
  const refSheetReportPost = useRef();
  const refSheetPostDetailBid = useRef();
  const refSheetUserDetail = useRef();
  const refSheetAlertDeletePost = useRef();
  const refSheetPostStatusChange = useRef();

  const hanldeTambahPenawaran = () => {
    if (
      user.name != null &&
      user.about != null &&
      user.address != null &&
      user.nik != null &&
      user.birthDate != null &&
      user.district != null &&
      user.phone != null &&
      user.userGender != null
    ) {
      refSheetAddBid.current?.open();
    } else {
      ToastAndroid.show("Lengkapi terlebih dahulu profile anda!", 1500);
      navigate.navigate("EditProfile");
    }
  };

  const handleUserDetail = (userDetail) => {
    setUserDetail(userDetail);
    refSheetUserDetail.current?.open();
  };

  const handleDeleteButton = () => {
    if (canDelPost) refSheetAlertDeletePost.current?.open();
    else
      ToastAndroid.show(
        "Tidak bisa menghapus postingan ini. Karena terdapat penawaran yang sudah berjalan!",
        5000
      );
  };

  const handleCheckCanDelPost = () => {
    post.bids?.some((bid) => {
      if (
        bid.bidStatus === "REVIEWED" ||
        bid.bidStatus === "ACCEPTED" ||
        bid.bidStatus === "FINISH"
      )
        setCanDelPost(false);
    });
  };

  //

  const fetch = async () => {
    console.log("FETCHHHH");
    await PostApi.getPostById(postParam.id);
  };

  useEffect(() => {
    fetch();
    handleCheckCanDelPost();
  }, [postParam]);

  useFocusEffect(
    useCallback(() => {
      fetch();
      handleCheckCanDelPost();
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const hasBid = post?.bids?.some((bid) => bid.user.id === user.id);
    setAlreadyBid(hasBid);
  }, [post.bids]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="min-h-screen bg-white"
      contentContainerStyle={{ paddingBottom: 10 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {post.id ? (
        <>
          <View className=" flex-row justify-between items-center p-3">
            <View className="flex-row justify-start items-center gap-x-2">
              <TouchableOpacity
                onPress={() => navigate.goBack()}
                activeOpacity={0.5}
                className="flex-row justify-start items-center"
              >
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text className="text-xl text-[#343434] font-semibold ml-1">
                  Kembali
                </Text>
              </TouchableOpacity>
            </View>
            {post.user.id !== user.id ? (
              <TouchableOpacity
                onPress={() => refSheetReportPost.current?.open()}
                activeOpacity={0.7}
                className="flex-row justify-center items-center bg-red-500 px-2 py-1 rounded"
              >
                <Ionicons name="megaphone-outline" size={24} color={"#fff"} />
                <Text className="text-white ml-2 font-semibold">Laporkan</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => refSheetPostStatusChange.current?.open()}
                activeOpacity={0.7}
                className="flex-row justify-center items-center bg-indigo-500 px-2 py-1.5 rounded"
              >
                <Ionicons name="brush-outline" size={18} color={"#fff"} />
                <Text className="text-white ml-2 font-semibold">
                  Ganti Status
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="p-3">
            <Text className="text-xl font-semibold text-[#343434]">
              {post.title}
            </Text>
            <Divider color="#9ca3af" twClass="my-2" />
            <Text className="mb-6 text-base font-normal text-[#343434]">
              {post.description}
            </Text>

            {post.imageUrl && (
              <Image
                source={{
                  uri: post.imageUrl,
                }}
                alt=""
                className="w-full h-[350px] mb-5 rounded-xl"
              />
            )}

            <View className="flex-row flex-wrap justify-start items-center gap-2">
              {post.postCategories.map((cat, i) => (
                <TouchableOpacity
                  key={i + "cat" + cat.id}
                  className="bg-blue-100 rounded-full px-3.5 py-1"
                >
                  <Text className="text-blue-500 font-semibold">
                    {cat.category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {post.isUrgent && (
              <View className="flex-row mt-2">
                <TouchableOpacity className="bg-red-100 rounded-full px-3.5 py-1">
                  <Text className="text-red-500 font-semibold">Mendesak</Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="mt-3 flex-row justify-start items-center">
              <Text className="text-[17px] font-medium text-[#343434]">
                Bayaran:{" "}
              </Text>
              <Text className="text-[17px] font-normal text-[#343434]">
                Rp {post.budgetMin.toLocaleString("id-ID")} -{" "}
                {post.budgetMax.toLocaleString("id-ID")}
              </Text>
            </View>

            {/* <View className="mt-1.5 flex-row justify-start items-center">
          <Text className="text-[17px] font-medium text-[#343434]">
            Tenggat Pilih Pekerja:{" "}
          </Text>
          <Text className="text-[17px] font-normal text-[#343434]">
            {new Date(post.deadline).toLocaleDateString("id-ID")}
          </Text>
        </View> */}
            <View className="mt-1.5 flex-row justify-start items-center">
              <Text className="text-[17px] font-medium text-[#343434]">
                Kota:{" "}
              </Text>
              <Text className="text-[17px] font-normal text-[#343434]">
                {post.district.districtName} ({post.district.province})
              </Text>
            </View>

            <View className="flex-row justify-evenly items-center mt-6">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row justify-center items-center gap-x-2"
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#343434"
                />
                <Text>
                  {post.status === "AVAILABLE"
                    ? "Tersedia"
                    : post.status === "NOT_AVAILABLE"
                    ? "Tidak Tersedia"
                    : "Expired"}
                </Text>
              </TouchableOpacity>
              <Divider color="#9ca3af" orientation="vertical" />

              <View className="flex-row justify-center items-center gap-x-2">
                <Ionicons name="person-outline" size={24} color="#343434" />
                <Text>{post.bids?.length} Bids</Text>
              </View>
              <Divider color="#9ca3af" orientation="vertical" />
              <View className="flex-row justify-center items-center gap-x-2">
                <Ionicons name="time-outline" size={24} color="#343434" />
                <Text>{post.finishDay} Hari</Text>
              </View>
            </View>

            <View className="mt-6">
              {post.user.id === user.id ? (
                <View className="flex-row justify-between items-center">
                  <TouchableOpacity
                    onPress={() => refSheetPostDetailBid.current?.open()}
                    activeOpacity={0.7}
                    className="bg-primary w-[32%] py-2.5 rounded-full "
                  >
                    <Text className="text-base text-white text-center font-semibold">
                      Penawaran
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigate.push("UpdatePost", { post })}
                    activeOpacity={0.7}
                    className="bg-green-500 w-[32%] py-2.5 rounded-full "
                  >
                    <Text className="text-base text-white text-center font-semibold">
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteButton}
                    activeOpacity={0.7}
                    className="bg-red-500 w-[32%] py-2.5 rounded-full "
                  >
                    <Text className="text-base text-white text-center font-semibold">
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={hanldeTambahPenawaran}
                  activeOpacity={0.7}
                  disabled={
                    alreadyBid ||
                    post.status === "NOT_AVAILABLE" ||
                    post.status === "EXPIRED"
                  }
                  className={`${
                    alreadyBid ||
                    post.status === "NOT_AVAILABLE" ||
                    post.status === "EXPIRED"
                      ? "bg-gray-400"
                      : "bg-primary"
                  } w-full py-3.5 rounded-full`}
                >
                  <Text className="text-base text-white text-center font-semibold">
                    Tambah Penawaran
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="mt-6">
              <Text className="mb-3 text-[18px] font-medium text-[#343434]">
                Penawar Saat Ini
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {post?.bids?.length > 0 ? (
                  post.bids.map((bid, i) => {
                    console.log(bid.user);
                    return (
                      <TouchableOpacity
                      className="border border-gray-200 justify-center items-center rounded-full mr-2.5"
                        key={i + "image"}
                        activeOpacity={0.7}
                        onPress={() => handleUserDetail(bid.user)}
                      >
                        <Image
                          source={bid.user.photoUrl ? { uri: bid.user.photoUrl } : require("../../../../assets/userImgPlaceholder.png")}
                          alt={bid.user.photoUrl}
                          className="w-[70px] h-[70px] rounded-full"
                          style={{
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.0,

                            elevation: 1,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text className="text-[#343434]">Tidak ada penawar</Text>
                )}
              </ScrollView>
            </View>

            <View className="mt-6">
              <Text className="mb-2 text-[18px] font-medium text-[#343434]">
                Pemilik
              </Text>
              <View className="flex-row justify-start items-start gap-x-3.5">
                <View className="border border-gray-200 justify-center items-center rounded-full">
                  <Image
                    source={post.user.photoUrl ? { uri: post.user.photoUrl } : require("../../../../assets/userImgPlaceholder.png")}
                    alt=""
                    className="w-[68px] h-[68px] rounded-full"
                  />
                </View>
                <View className="">
                  <Text className="text-base font-medium text-[#343434]">
                    {post.user.name}
                  </Text>
                  <Text className="text-sm font-normal text-[#606060]">
                    {post.user.username}
                  </Text>
                  <Text className="text-sm font-normal text-[#606060]">
                    {post.user.district ? post.user.district.districtName : "-"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <BottomSheetReportPost refRBSheet={refSheetReportPost} post={post} />
          <BottomSheetUserDetail
            refRBSheet={refSheetUserDetail}
            user={userDetail}
          />

          {canDelPost && (
            <BottomSheetPostDeleteAlert
              refRBSheet={refSheetAlertDeletePost}
              post={post}
              resetPostItems={resetPostItems}
            />
          )}

          {post.user.id === user.id ? (
            <>
              <BottomSheetPostDetailBid
                refRBSheet={refSheetPostDetailBid}
                post={post}
              />
              <BottomSheetPostStatusChange
                refRBSheet={refSheetPostStatusChange}
                post={post}
              />
            </>
          ) : (
            <BottomSheetAddBid refRBSheet={refSheetAddBid} post={post} />
          )}
        </>
      ) : (
        <View className="min-h-screen justify-center items-center">
          <Text className="text-xl text-[#343434] font-semibold">
            Loading...
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

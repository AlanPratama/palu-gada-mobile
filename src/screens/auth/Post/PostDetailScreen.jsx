import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Divider from "../../../components/Divider";
import BottomSheetAddBid from "../../../components/Post/BottomSheetAddBid";
import BottomSheetReportPost from "../../../components/Post/BottomSheetReportPost";
import { useSelector } from "react-redux";
import BottomSheetPostDetailBid from "../../../components/Post/BottomSheetPostDetailBid";
import BottomSheetUserDetail from "../../../components/User/BottomSheetUserDetail";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  const { user } = useSelector((state) => state.auth);
  // const { item: post } = useSelector((state) => state.post);
  // console.log("ZUL JERK OFF: ", post);

  const [alreadyBid, setAlreadyBid] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const navigate = useNavigation();

  const refSheetAddBid = useRef();
  const refSheetReportPost = useRef();
  const refSheetPostDetailBid = useRef();
  const refSheetUserDetail = useRef();

  // const fetch = async () => {
  //   await PostApi.getPostById(postParam.id);
  // };

  // useEffect(() => {
  //   (async () => {
  //     await PostApi.getPostById(postParam.id);
  //   })();
  // }, []);

  useEffect(() => {
    const hasBid = post.bids.some((bid) => bid.user.id === user.id);
    setAlreadyBid(hasBid);
  }, [post.bids]);

  const hanldeTambahPenawaran = () => {
    /*
      UNTUK SEMENTARA TAK TARUH DISINI:
      
    */
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
      alert("Lengkapi terlebih dahulu profile anda!");
      navigate.navigate("EditProfile");
    }
  };

  const handleUserDetail = (userDetail) => {
    setUserDetail(userDetail);
    refSheetUserDetail.current?.open();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="min-h-screen bg-white"
    >
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
        {
          post.user.id !== user.id ? (
            <TouchableOpacity
              onPress={() => refSheetReportPost.current?.open()}
              activeOpacity={0.7}
              className="flex-row justify-center items-center bg-red-500 px-2 py-1 rounded"
            >
              <Ionicons name="megaphone-outline" size={24} color={"#fff"} />
              <Text className="text-white ml-2 font-semibold">Laporkan</Text>
            </TouchableOpacity>
          ) : null
          // <TouchableOpacity
          //   onPress={() => refSheetReportPost.current?.open()}
          //   activeOpacity={0.7}
          //   className="flex-row justify-center items-center bg-red-500 px-2 py-1 rounded"
          // >
          //   {/* <Ionicons name="trash-outline" size={24} color={"#fff"} /> */}
          //   <Text className="text-white ml-2 font-semibold">Hapus Postingan</Text>
          // </TouchableOpacity>
        }
      </View>

      <View className="p-3">
        {/* <View className="flex-row justify-start items-start gap-x-3 mb-4">
          <Image source={{ uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg" }} alt="" className="w-[68px] h-[68px] rounded-full" />
        <View>
        <Text className="text-base font-normal text-[#343434]">
          Alan Pratama Rusfi
        </Text>
        <Divider color="#9ca3af"/>
          <Text className="text-[17px] font-semibold text-[#343434]">
            Kuburin kucing aku, aku tidak kuat kalau ngubur kucing kesayangan aku sendiri
          </Text>
        </View>
        </View> */}
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
              uri: post.imageUrl
                ? post.imageUrl
                : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
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
          <Text className="text-[17px] font-medium text-[#343434]">Kota: </Text>
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
                onPress={() => navigate.navigate("UpdatePost", { post })}
                activeOpacity={0.7}
                className="bg-green-500 w-[32%] py-2.5 rounded-full "
              >
                <Text className="text-base text-white text-center font-semibold">
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate.navigate("UpdatePost", { post })}
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
                alreadyBid ? "bg-gray-400" : "bg-primary"
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
            {post.bids.length > 0 ? (
              post.bids.map((bid, i) => {
                console.log(bid.user);
                return (
                  <TouchableOpacity
                    key={i + "image"}
                    activeOpacity={0.7}
                    onPress={() => handleUserDetail(bid.user)}
                  >
                    <Image
                      source={{
                        uri: bid.user.photoUrl
                          ? bid.user.photoUrl
                          : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
                      }}
                      alt={bid.user.photoUrl}
                      className="w-[70px] h-[70px] mr-2.5 rounded-full"
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
          <Text className="mb-3 text-[18px] font-medium text-[#343434]">
            Pemilik
          </Text>
          <View className="flex-row justify-start items-start gap-x-3.5">
            <Image
              source={{
                uri: post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt=""
              className="w-[68px] h-[68px] rounded-full"
            />
            <View className="">
              <Text className="text-base font-medium text-[#343434]">
                {post.user.name}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <BottomSheetReportPost refRBSheet={refSheetReportPost} postId={post.id} />
      <BottomSheetUserDetail
        refRBSheet={refSheetUserDetail}
        user={userDetail}
      />
      {post.user.id === user.id ? (
        <>
          <BottomSheetPostDetailBid
            refRBSheet={refSheetPostDetailBid}
            post={post}
          />
        </>
      ) : (
        <BottomSheetAddBid refRBSheet={refSheetAddBid} post={post} />
      )}
    </ScrollView>
  );
}

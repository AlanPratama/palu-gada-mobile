import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Linking,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PagerView from "react-native-pager-view";

import Divider from "../../components/Divider";
import BottomSheetAddPost from "../../components/Post/BottomSheetAddPost";
import { useSelector } from "react-redux";
import CategoryApi from "../../apis/CategoryApi";
import PostApi from "../../apis/PostApi";
import DistrictApi from "../../apis/DistrictApi";
import store from "../../redux/store";
import { login, logout } from "../../redux/slice/authSlice";
import AuthApi from "../../apis/AuthApi";
import PostCard from "../../components/Post/PostCard";
import ChipCategory from "../../components/Post/ChipCategory";
import NotificationApi from "../../apis/NotificationApi";
import { pushLocalNotification } from "../../utils/notification.util";
import PostsListOnFiltered from "../../components/Post/PostsListOnFiltered";

export default function HomeScreen() {
  const navigate = useNavigation();

  // const [postClosest, setPostClosest] = useState([]);
  // const [postLatest, setPostLatest] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  const refSheetAddPost = useRef();

  const { user } = useSelector((state) => state.auth);
  const { items: catItems } = useSelector((state) => state.category);
  const { totalNotRead } = useSelector((state) => state.notification);

  const fetchAllData = async () => {
    await CategoryApi.getCategories();
    await DistrictApi.getDistricts();
    // const resPostClosest = await PostApi.getPostsReturn(
    //   0,
    //   5,
    //   "",
    //   "title",
    //   "asc",
    //   "",
    //   user.district?.id
    // );
    // setPostClosest(resPostClosest);
    // const resPostLatest = await PostApi.getPostsReturn(
    //   0,
    //   5,
    //   "",
    //   "createdAt",
    //   "desc"
    // );
    // setPostLatest(resPostLatest);
  };

  const fetchNotification = async () => {
    const { totalNotRead: total } = await NotificationApi.getNotification();
    console.log("totalNotRead dari home", total);
    // console.log('totalNotRead dari home', total);

    if (total > 0) {
      await pushLocalNotification(
        `${total}${total >= 10 && "+"} Notifikasi belum terbaca`,
        "Ada kabar baru buat kamu, yuk liat. ada apa ya?"
      );
    }
  };

  const setUser = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("tokenn: ", token);

    if (token) {
      store.dispatch(login());
      await AuthApi.getAuthenticated();
    } else {
      store.dispatch(logout());
    }
  };

  useEffect(() => {
    setUser();
    fetchNotification();
  }, []);
  // useFocusEffect to refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [])
  );

  // Function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };

  const handleNavigateAddPost = () => {
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
      navigate.navigate("AddPost");
    } else {
      alert("Lengkapi terlebih dahulu profile anda!");
      navigate.navigate("EditProfile");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 110 }}
      className="bg-white min-h-screen "
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="bg-[#fff] px-3 pt-4 flex-row justify-between items-center">
        <Text className="text-[26px] font-bold text-primary">Kerjain Aja</Text>
        <View className="flex-row justify-center items-center gap-x-2">
          <TouchableOpacity
            onPress={() => navigate.push("MyReportPost")}
            activeOpacity={0.5}
          >
            <Ionicons name="alert-circle-outline" size={26} color="#343434" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate("Notification")}
            activeOpacity={0.5}
            className="relative"
          >
            <Ionicons name="notifications-outline" size={26} color="#343434" />
            {totalNotRead > 0 && (
              <View className="absolute h-2 w-2 bg-red-500 top-0 right-0 rounded-full" />
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => Linking.openURL("https://wa.wizard.id/b8dd7a")}
            activeOpacity={0.5}
          >
            <Ionicons name="logo-whatsapp" size={26} color="#343434" />
          </TouchableOpacity> */}
        </View>
      </View>

      <PagerView className="h-52 mt-4" initialPage={0}>
        <View
          className="h-52 mx-3 rounded-[13px] justify-center items-center"
          key="1"
        >
          <Image
            source={require("../../../assets/pager1.png")}
            alt="Pager1"
            className="w-full h-52 rounded-[13px]"
          />
        </View>
        <View
          className="h-52 mx-3 rounded-[13px] justify-center items-center"
          key="2"
        >
          <Image
            source={require("../../../assets/pager2.png")}
            alt="Pager1"
            className="w-full h-52 rounded-[13px]"
          />
        </View>
        <View
          className="h-52 mx-3 rounded-[13px] justify-center items-center"
          key="3"
        >
          <Image
            source={require("../../../assets/pager3.png")}
            alt="Pager1"
            className="w-full h-52 rounded-[13px]"
          />
        </View>
      </PagerView>

      <View
        className="mx-8 py-3 mb-6 -mt-8 bg-white flex-row justify-center items-center rounded-[13px]"
        style={{
          shadowColor: "#343434",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate.navigate("Wallet")}
          activeOpacity={0.5}
          className="flex-row justify-evenly items-center w-[52%]"
        >
          {/* <View className=""><Ionicons name='wallet-outline' size={28} color='#303030' /></View> */}
          <View>
            <View className="flex-row justify-start items-center">
              <Ionicons name="wallet-outline" size={15} color="#303030" />
              <Text className="text-[15.5px] font-semibold"> Saldo</Text>
            </View>
            <Text className="text-[16px] leading-6 font-bold">
              Rp. {user.balance ? user.balance.toLocaleString("id-ID") : 0}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex-row justify-evenly items-center w-[48%]"
        >
          {/* <View className=""><Ionicons name='wallet-outline' size={28} color='#303030' /></View> */}
          <View>
            <View className="flex-row justify-start items-center">
              <Ionicons name="wallet-outline" size={15} color="#303030" />
              <Text className="text-[15.5px] font-semibold"> Bekerja</Text>
            </View>
            <Text className="text-[16px] leading-6 font-bold">90x</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="px-3 mb-4 flex-row justify-center items-center gap-x-2">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-orange-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center"
        >
          <Ionicons name="information-outline" size={20} color="white" />
          <Text className="text-white font-semibold text-center">
            Cara Kerja
          </Text>
        </TouchableOpacity>

        {/* #24bd5c */}
        <TouchableOpacity
          // onPress={() => refSheetAddPost.current?.open()}
          onPress={handleNavigateAddPost}
          activeOpacity={0.7}
          className="bg-indigo-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center"
        >
          <Ionicons name="add-outline" size={20} color="white" />
          <Text className="text-white font-semibold text-center">
            Buat Postingan
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-3 mb-4 flex-row justify-center items-center gap-x-2">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Linking.openURL("https://wa.wizard.id/b8dd7a")}
          className="bg-green-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center gap-x-1"
        >
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text className="text-white font-semibold text-center">
            Hubungi Admin
          </Text>
        </TouchableOpacity>

        {/* #24bd5c */}
        <TouchableOpacity
          // onPress={() => refSheetAddPost.current?.open()}
          onPress={() => navigate.push("MyReview")}
          activeOpacity={0.7}
          className="bg-yellow-500 py-2.5 rounded-lg w-[48%] flex-row justify-center items-center gap-x-1"
        >
          <Ionicons name="star-outline" size={20} color="white" />
          <Text className="text-white font-semibold text-center">
            Review Saya
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-center text-[#343434] font-bold text-[20px]">
            Kategori
          </Text>
          {/* <Ionicons name="chevron-forward-outline" size={18} /> */}
        </View>
        <ScrollView
          className="py-3.5"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {catItems.map((cat, i) => (
            <ChipCategory cat={cat} key={cat.id + "-category" + i} />
          ))}
        </ScrollView>
      </View>

      {/* <View className="px-3 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-center text-[#343434] font-bold text-[20px]">
            Terdekat ({user.district ? user.district.districtName : "-"})
          </Text>
        </View>

        {postClosest.length > 0 ? (
          postClosest.map((post, i) => {
            return <PostCard post={post} key={post.id + "-post-" + i} />;
          })
        ) : (
          <Text className="text-center text-[#606060] font-medium my-6 text-[16px] capitalize">
            Tidak ada postingan terdekat
          </Text>
        )}
      </View> */}

      <PostsListOnFiltered districtId={user.district?.id} title={'Terdekat'} districtName={user.district ? user.district.districtName : "-"} />

      <View className="px-3 mt-2">
        <Divider color="#d9d9d9" width={2} />
      </View>

      {/* <View className="px-3 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-center text-[#343434] font-bold text-[20px]">
            Kerjain Aja: Terbaru
          </Text>
        </View>

        {postLatest.length > 0 ? (
          postLatest.map((post, i) => (
            <PostCard post={post} key={post.id + "-post-" + i} />
          ))
        ) : (
          <Text className="text-center text-[#606060] font-medium my-6 text-[16px] capitalize">
            Tidak ada postingan terbaru
          </Text>
        )}
      </View> */}
      <PostsListOnFiltered sortField={'createdAt'} sortDirection={'desc'} title={'Terbaru'} />

      <BottomSheetAddPost refRBSheet={refSheetAddPost} />
    </ScrollView>
  );
}

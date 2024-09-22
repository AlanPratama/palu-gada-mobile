import { Animated, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { FadeIn } from "react-native-reanimated";

import store from "../../redux/store";
import NotificationApi from "../../apis/NotificationApi";
import { clearNotification } from "../../redux/slice/notificationSlice";
import { calculateTimeAgo } from "../../utils/time.util";

export default function NotificationScreen() {
  const navigate = useNavigation();
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const { items, isLoading } = useSelector((state) => state.notification);

  const loadNotification = async (pageNumber = 0) => {
    if (!isLoading) {
      const result = await NotificationApi.getNotification(pageNumber);
      if (result.length < 10) {
        setEndPage(true);
      }
    }
  };

  const resetNotificationItem = () => {
    store.dispatch(clearNotification());
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadNotification(page);
    }
  }

  const handleLoadMore = () => {
    if (!isLoading && !endPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadNotification(page);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    resetNotificationItem()
    setRefreshing(false);
  };

  const handleMarkAllReadPress = async () => {
    await NotificationApi.readAllNotification()
    resetNotificationItem()
  }

  return (
    <View
      className="min-h-screen bg-white flex-1"
    >
      <View className="flex-row justify-between items-center p-3">
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
        <TouchableOpacity
          onPress={handleMarkAllReadPress}
          activeOpacity={0.5}
          className="flex-row justify-start items-center"
        >
          <Text className="text-xl text-[#343434] font-semibold ml-1">
            Mark All Read
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(notif, i) => notif.id + "-" + i}
        renderItem={({ item, index }) => {
          // console.log(index)
          return (
            <Animated.View
              entering={FadeIn.delay(280 * index)}
              className={`${item.isRead ? 'bg-transparent' : 'bg-slate-50'} px-6 py-4 flex-row justify-start items-start gap-x-4 border-y border-slate-200`}
            >
              <View className="border border-gray-200 rounded-full p-2">
                <Ionicons name="notifications-outline" size={32} color="#343434" />
              </View>

              <View>
                <Text>
                  {calculateTimeAgo(item.createdAt)}
                </Text>
                <Text className="text-[#343434] font-semibold text-lg">
                  {item.title}
                </Text>
                <Text classNam="text-[#343434]">
                  {item.description}
                </Text>
              </View>
            </Animated.View>
          )
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && page != 0 ? <Text className='text-center'>Loading...</Text> : null}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={(
          <View className='flex-1 h-96 items-center justify-center'>
            <Text className='text-lg'>{isLoading && page == 0 ? 'Loading...' : 'Tidak ada notifikasi'}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
}

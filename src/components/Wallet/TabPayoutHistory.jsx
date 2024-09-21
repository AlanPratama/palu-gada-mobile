import { useEffect, useState } from "react";
import PayoutApi from "../../apis/PayoutApi";
import { Animated, FlatList, RefreshControl, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeIn } from "react-native-reanimated";

const TabPayoutHistory = () => {
  const [payoutItems, setPayoutItems] = useState([])
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)

  const loadPosts = async (pageNumber = 0) => {
    if (!loading) {
      setLoading(true)
      const resPost = await PayoutApi.getAllMyPayout(
        pageNumber,
        10,
      );
      setPayoutItems(prevPost => [...prevPost, ...resPost]);
      if (resPost.length < 10) {
        setEndPage(true);
      }
      setLoading(false)
    }
  };

  const handleLoadMore = () => {
    if (!loading && !endPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPayoutItems([])
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts()
    }
    setRefreshing(false);
  };

  return (
    <View className="p-4 bg-white flex-1 gap-y-4">
      <FlatList
        data={payoutItems}
        keyExtractor={(payout) => payout.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn.delay(280 * index)}
            className="flex-row justify-between items-center my-2"
          >
            <View className='flex-row items-center gap-x-2'>
              <View className="bg-orange-500 p-2 rounded-full">
                <Ionicons name="chevron-back-outline" size={24} color={"#fff"} />
              </View>
              <View>
                <Text className="text-orange-600 font-semibold text-[17px]">
                  -Rp {item.amount.toLocaleString('id-ID')}
                </Text>
                <Text className="text-[#343434] font-medium text-[14px]">
                  23 Sept 2024
                </Text>
              </View>
            </View>
            <View>
              <Text>
                {item.payoutStatus}
              </Text>
            </View>
          </Animated.View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && page != 0 ? <Text className='text-center'>Loading...</Text> : null}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={(
          <View className='flex-1 h-96 items-center justify-center'>
            <Text className='text-lg'>{loading && page == 0 ? 'Loading...' : 'Data tidak di temukan'}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default TabPayoutHistory
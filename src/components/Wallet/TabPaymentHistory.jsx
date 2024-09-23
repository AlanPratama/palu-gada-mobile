import { useEffect, useState } from "react";
import { Animated, FlatList, RefreshControl, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeIn } from "react-native-reanimated";
import WalletApi from "../../apis/WalletApi";

const TabPaymentHistory = () => {
  const [paymentItems, setPaymentItems] = useState([])
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)

  const loadItems = async (pageNumber = 0) => {
    if (!loading) {
      setLoading(true)
      const resItems = await WalletApi.fetchPayments(
        pageNumber,
        10,
      );
      setPaymentItems(prevItems => [...prevItems, ...resItems]);
      if (resItems.length < 10) {
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
    loadItems(page);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPaymentItems([])
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadItems()
    }
    setRefreshing(false);
  };

  return (
    <View className="p-4 bg-white flex-1 gap-y-4">
      <FlatList
        data={paymentItems}
        keyExtractor={(payment) => payment.id}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn.delay(280 * index)}
            className="flex-row justify-between items-center my-2"
          >
            <View className='flex-row items-center gap-x-2'>
              <View className="bg-blue-500 p-2 rounded-full">
                <Ionicons name="chevron-forward-outline" size={24} color={"#fff"} />
              </View>
              <View>
                <Text className="text-green-600 font-semibold text-[17px]">
                  +Rp {item.amount.toLocaleString('id-ID')}
                </Text>
                <Text className="text-[#343434] font-medium text-[14px]">
                  {new Date(item?.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </Text>
              </View>
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

export default TabPaymentHistory
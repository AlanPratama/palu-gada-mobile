import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import PostApi from "../../../apis/PostApi";
import PostCard from "../../../components/Post/PostCard";

export default function PostByCategory({ route }) {
  const navigate = useNavigation()
  const categoryName = route?.params?.name
  const { isLoading } = useSelector((state) => state.post);
  const [postItems, setPostItems] = useState([])
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(false)
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const loadPosts = async (pageNumber = 0) => {
    if (!isLoading) {
      const resPost = await PostApi.getPostsReturn(
        pageNumber,
        10,
        "",
        "createdAt",
        "desc",
        route?.params?.id
      );
      setPostItems(prevPost => [...prevPost, ...resPost]);
      if (resPost.length < 10) {
        setEndPage(true);
      }
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && !endPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPostItems([])
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts()
    }
    setRefreshing(false);
  };

  return (
    <View showsVerticalScrollIndicator={false} className="min-h-screen bg-white p-3">
      <View className="flex-row justify-between items-center mb-4">
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
      </View>

      <View className="mt-2">
        <View className="flex-row justify-start items-center mb-1">
          <Text className="text-xl pb-0.5 border-b-2 border-gray-400 font-semibold text-[#343434]">{categoryName}</Text>
        </View>

        <FlatList
          className="h-[650px] pb-[200px]"
          data={postItems}
          keyExtractor={(post, i) => post.id + "-post-" + i}
          renderItem={({ item, index }) => {
            // console.log(index)
            return <PostCard post={item} />
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && page != 0 ? <Text className='text-center'>Loading...</Text> : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={(
            <View className='flex-1 h-96 items-center justify-center'>
              <Text className='text-lg'>{isLoading && page == 0 ? 'Loading...' : 'Data tidak di temukan'}</Text>
            </View>
          )}
        />
      </View>

    </View>
  );
}

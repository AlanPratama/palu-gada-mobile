import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import PostApi from "../../apis/PostApi";
import PostCard from "./PostCard";

export default function PostsListOnFiltered({ districtId, sortField, sortDirection, title }) {
  const { isLoading } = useSelector((state) => state.post);
  const [postItems, setPostItems] = useState([])
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(false)

  const resetPostItems = () => {
    setPostItems([])
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts()
    }
  }

  const loadPosts = async (pageNumber = 0) => {
    if (!isLoading) {
      const resPost = await PostApi.getPostsReturn(pageNumber, 5, "", sortField ?? '', sortDirection ?? '', '', districtId ?? '');
      setPostItems(prevPost => [...prevPost, ...resPost]);
      if (resPost.length < 5) {
        setEndPage(true);
      }
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  return (
    <View className="px-3 mt-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-center text-[#343434] font-bold text-[20px]">
          Kerjain Aja: {title}
        </Text>
        {/* <Ionicons name="chevron-forward-outline" size={18} /> */}
      </View>

      {postItems.length != 0 ? postItems.map(item => (
        <PostCard post={item} resetPostItems={resetPostItems} key={item.id + '-' + title} />
      )) : (
        <View className='flex-1 h-96 items-center justify-center'>
          <Text className='text-lg'>{isLoading && page == 0 ? 'Loading...' : 'Data tidak di temukan'}</Text>
        </View>
      )}
      {
        isLoading && page != 0 && (
          <Text className='text-center'>Loading...</Text>
        )
      }
      {
        !endPage && !isLoading && (
          <TouchableOpacity onPress={() => setPage((prev) => prev + 1)} className="flex-row justify-center items-center gap-x-1 mb-4">
            <Ionicons name="chevron-down-circle-outline" size={20} />
            <Text className="text-center text-base font-medium">Load More</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}
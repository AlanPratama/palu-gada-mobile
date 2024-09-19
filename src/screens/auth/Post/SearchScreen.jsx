import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import PostApi from "../../../apis/PostApi";
import PostCard from "../../../components/Post/PostCard";
import ChipCategory from "../../../components/Post/ChipCategory";
import store from "../../../redux/store";
import { clearPost } from "../../../redux/auth/postSlice";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const { items: postItems, loading } = useSelector((state) => state.post);
  const { items: catItems } = useSelector((state) => state.category);

  const searchPost = async () => {
    Keyboard.dismiss()
    store.dispatch(clearPost());
    setPage(0);
  }

  const handleSearchClear = () => {
    setSearch('')
    store.dispatch(clearPost());
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts()
    }
  }

  const loadPosts = async (pageNumber = 0, searchQuery = "") => {
    if (!loading) {
      await PostApi.getPosts(pageNumber, 10, searchQuery);
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    loadPosts(page, search);
  }, [page]);

  return (
    <View className='bg-white min-h-screen p-3'>
      <View className='relative'>
        <TextInput
          value={search}
          onChangeText={setSearch}
          className='bg-[#f6f6f6] rounded-full text-[#303030] py-2 px-9'
          placeholder='Cari...'
          returnKeyType='search'
          onSubmitEditing={searchPost}
        />
        <View className='absolute left-2.5 top-3'>
          <Ionicons name='search-outline' size={20} color='#303030' />
        </View>
        {search.length > 0 && (
          <TouchableOpacity onPress={handleSearchClear} className='absolute right-4 top-3'>
            <Ionicons name='close-outline' size={20} color='#303030' />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <ScrollView className='py-3.5' horizontal={true} showsHorizontalScrollIndicator={false}>
          {catItems.map((cat, i) => (
            <ChipCategory cat={cat} key={cat.id + "-category" + i} />
          ))}
        </ScrollView>
      </View>

      <View>
        <FlatList
          data={postItems}
          keyExtractor={(post, i) => post.id + "-post-" + i}
          renderItem={({ item, index }) => {
            // console.log(index)
            return <PostCard post={item} />
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <Text>Loading...</Text> : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 280 }}
          ListEmptyComponent={(
            <View className='flex-1 h-96 items-center justify-center'>
              <Text className='text-lg'>{loading ? 'Loading...' : 'Data tidak di temukan'}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

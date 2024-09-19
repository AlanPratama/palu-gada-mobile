import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "use-debounce";

import PostApi from "../../../apis/PostApi";
import PostCard from "../../../components/Post/PostCard";
import { useSelector } from "react-redux";
import ChipCategory from "../../../components/Post/ChipCategory";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 1000);

  const { items: postItems } = useSelector((state) => state.post);
  const { items: catItems } = useSelector((state) => state.category);

  useEffect(() => {
    PostApi.getPosts(0, 9999, searchDebounce)
  }, [searchDebounce])

  return (
    <View className='bg-white min-h-screen p-3'>
      <View className='relative'>
        <TextInput
          value={search}
          onChangeText={setSearch}
          className='bg-[#f6f6f6] rounded-full text-[#303030] py-2 px-9'
          placeholder='Cari...'
        />
        <View className='absolute left-2.5 top-3'>
          <Ionicons name='search-outline' size={20} color='#303030' />
        </View>
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")} className='absolute right-4 top-3'>
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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }}>
          {postItems.map((post, i) => (
            <PostCard post={post} key={post.id + "-post-" + i} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

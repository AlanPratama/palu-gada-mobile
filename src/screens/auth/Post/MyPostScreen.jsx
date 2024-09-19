import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import PostCard from '../../../components/Post/PostCard'

export default function MyPostScreen() {
  const navigate = useNavigation()
  const { myPost } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");


  const calculateTimeAgo = (date) => {
    const now = new Date();
    const pastDate = new Date(date);
    const diff = now - pastDate; // selisih dalam milidetik

    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diff / (1000 * 60));

    if (diffInHours > 0) {
      return `${diffInHours} jam lalu`;
    } else {
      return `${diffInMinutes} menit lalu`;
    }
  };

  return (
    <ScrollView className="min-h-screen bg-white">
      <Animated.View entering={FadeIn.delay(100)} className="flex-row justify-between items-center p-3">
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
      </Animated.View>

      <View className="p-3  pb-28">
        <Text className="text-2xl font-bold text-[#343434]">Postingan Kamu</Text>

        <View className='relative mt-2 mb-1'>
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

        {myPost.filter(post => post.title.toLowerCase().includes(search.toLowerCase())).map((post, i) => {
          return (
            <PostCard post={post} key={post.id + "-post-" + i} />
          );
        })}

      </View>
    </ScrollView>
  )
}
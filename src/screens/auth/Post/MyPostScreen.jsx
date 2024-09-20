import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import PostCard from '../../../components/Post/PostCard'
import PostApi from '../../../apis/PostApi'
import store from '../../../redux/store'
import { clearMyPost } from '../../../redux/auth/postSlice'

export default function MyPostScreen() {
  const navigate = useNavigation()
  const { myPost, loading } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const searchPost = async () => {
    Keyboard.dismiss()
    store.dispatch(clearMyPost());
    setPage(0);
  }

  const handleSearchClear = () => {
    setSearch('')
    store.dispatch(clearMyPost());
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts()
    }
  }

  const loadPosts = async (pageNumber = 0, searchQuery = "") => {
    if (!loading) {
      await PostApi.getMyPosts(pageNumber, 10, searchQuery);
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
    <View className="min-h-screen bg-white">
      {/* <Animated.View entering={FadeIn.delay(100)} className="flex-row justify-between items-center p-3">
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
      </Animated.View> */}

      <View className="p-3  pb-28">
        <Text className="text-2xl font-bold text-[#343434]">Postingan Kamu</Text>

        <View className='relative mt-2 mb-1'>
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
        <FlatList
          data={myPost}
          keyExtractor={(post, i) => post.id + "-post-" + i}
          renderItem={({ item, index }) => {
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
  )
}
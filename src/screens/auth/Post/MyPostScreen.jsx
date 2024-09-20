import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, Keyboard, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

import PostApi from '../../../apis/PostApi'
import PostCard from '../../../components/Post/PostCard'
import { clearMyPost } from '../../../redux/auth/postSlice'
import store from '../../../redux/store'

export default function MyPostScreen() {
  const { myPost, isLoading } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [endPage, setEndPage] = useState(false)
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const searchPost = async () => {
    Keyboard.dismiss()
    resetPostItems()
  }

  const handleSearchClear = () => {
    setSearch('')
    resetPostItems()
  }

  const resetPostItems = () => {
    store.dispatch(clearMyPost());
    setEndPage(false);
    if (page !== 0) {
      setPage(0);
    } else {
      loadPosts(page, search);
    }
  }

  const loadPosts = async (pageNumber = 0, searchQuery = "") => {
    if (!isLoading) {
      const result = await PostApi.getMyPosts(pageNumber, 10, searchQuery);
      if (result.length < 10) {
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
    loadPosts(page, search);
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    resetPostItems()
    setRefreshing(false);
  };

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
          ListFooterComponent={isLoading && page != 0 ? <Text className='text-center'>Loading...</Text> : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 320 }}
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
  )
}
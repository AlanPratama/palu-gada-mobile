import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

export default function MyPostScreen() {
  return (
    <ScrollView className="min-h-screen bg-white">
        <Animated.View entering={FadeIn.delay(100)} className="flex-row justify-between items-center p-3 mb-4">
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

        <View className="p-3">
          <Text className="text-2xl font-bold text-[#343434]">My Post</Text>
            
        </View>
    </ScrollView>
  )
}
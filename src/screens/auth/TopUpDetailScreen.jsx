import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function TopUpDetailScreen() {
  return (
    <View className="bg-white min-h-screen p-3 items-center justify-center">
      <View className="border border-gray-200 rounded-xl p-3">
        <Text className="text-3xl font-medium text-[#343434]">88839203491</Text>
      </View>

      <View className="absolute bottom-2 w-full">
        <TouchableOpacity className="bg-primary py-2.5 rounded-lg">
          <Text className="text-white text-center font-extrabold text-base">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
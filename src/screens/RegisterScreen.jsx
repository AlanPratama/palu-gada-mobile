import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen() {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigation()

  return (
    <View className="justify-start items-center min-h-screen">
      <View className="bg-[#d7e9ff] w-full justify-start items-center -mb-6">
        <Image source={require("../../assets/login.png")} alt='Login' className="w-64 h-64" />
      </View>
      <Animated.View entering={FadeInDown.delay(50)} className="bg-white rounded-t-[35px] h-full w-full px-8 pt-12">
        <Text className="text-lg font-semibold mb-2">Email</Text>
        <View className="flex-row justify-start items-center w-full mb-4">
          <Ionicons name='mail-outline' size={24} color='#303030' />
          <TextInput className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]" placeholder='Masukkan Email' />
        </View>

        <Text className="text-lg font-semibold mb-2">Username</Text>
        <View className="flex-row justify-start items-center w-full mb-4">
          <Ionicons name='accessibility-outline' size={24} color='#303030' />
          <TextInput className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]" placeholder='Masukkan Username' />
        </View>

        <Text className="text-lg font-semibold mb-2">Password</Text>
        <View className="flex-row justify-start items-center w-full mb-4">
          <Ionicons name='lock-closed-outline' size={24} color='#303030' />
          <View className="relative w-[90%]">
          <TextInput className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2" placeholder='Masukkan Password' secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute top-3 right-0">
          <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color='#303030' />
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity className="bg-[#4f6def] py-2 rounded-full w-full mt-2">
          <Text className="text-center text-white text-lg font-semibold">Register</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-center text-[#404040]">Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigate.push("Login")}><Text className="text-center text-[#4f6def] font-semibold">Login</Text></TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}
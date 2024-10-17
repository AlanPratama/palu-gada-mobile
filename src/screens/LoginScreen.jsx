import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Controller, Form, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthApi from "../apis/AuthApi";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigation();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await AuthApi.login(data.credential, data.password);
    reset();
  };

  return (
    <KeyboardAwareScrollView>
      <View className='justify-start items-center min-h-screen'>
        <View className='bg-[#d7e9ff] w-full justify-start items-center -mb-6'>
          <Image source={require("../../assets/login.png")} alt='Login' className='w-64 h-64' />
        </View>
        <Animated.View entering={FadeInDown.delay(50)} className='bg-white rounded-t-[35px] h-full w-full px-8 pt-12'>
          <Text className='text-lg font-semibold mb-2'>Username / Email</Text>
          <View className='flex-row justify-start items-center w-full'>
            <Ionicons name='accessibility-outline' size={24} color='#303030' />
            <Controller
              control={control}
              name='credential'
              rules={{ required: "Username / Email wajib diisi!" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]'
                  placeholder='Masukkan Username atau Email'
                />
              )}
            />
          </View>
          {errors.credential && <Text style={{ color: "red" }}>{errors.credential.message}</Text>}

          <Text className='text-lg font-semibold mb-2 mt-4'>Password</Text>
          <View className='flex-row justify-start items-center w-full'>
            <Ionicons name='lock-closed-outline' size={24} color='#303030' />
            <View className='relative w-[90%]'>
              <Controller
                control={control}
                name='password'
                rules={{ required: "Password wajib diisi!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2'
                    placeholder='Masukkan Password'
                    secureTextEntry={!showPassword}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute top-3 right-0'>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#303030' />
              </TouchableOpacity>
            </View>
          </View>
          {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}

          <TouchableOpacity onPress={handleSubmit(onSubmit)} className={`${isLoading ? "bg-[#d1d1d1]" : "bg-primary"} py-2 rounded-full w-full mt-6`} disabled={isLoading}>
            <Text className='text-center text-white text-lg font-semibold'>Login</Text>
          </TouchableOpacity>
          <View className='flex-row justify-center items-center mt-4'>
            <Text className='text-center text-[#404040]'>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigate.push("Register")}>
              <Text className='text-center text-primary font-semibold'>Register</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}

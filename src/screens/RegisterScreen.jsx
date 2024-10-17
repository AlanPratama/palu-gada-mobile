import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import AuthApi from "../apis/AuthApi";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigation();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await AuthApi.register(data);
    reset();
    console.log('message: ', res.message);

    if (!(res?.message).includes('404')) {
      navigate.navigate("Login");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View className='justify-start items-center min-h-screen'>
        <View className='bg-[#d7e9ff] w-full justify-start items-center -mb-6'>
          <Image source={require("../../assets/login.png")} alt='Login' className='w-64 h-64' />
        </View>
        <Animated.View entering={FadeInDown.delay(50)} className='bg-white rounded-t-[35px] h-full w-full px-8 pt-12'>
          {/* Email */}
          <Text className='text-lg font-semibold mb-2'>Email</Text>
          <View className='flex-row justify-start items-center w-full'>
            <Ionicons name='mail-outline' size={24} color='#303030' />
            <Controller
              control={control}
              name='email'
              rules={{
                required: "Email wajib diisi",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Format email tidak valid",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]'
                  placeholder='Masukkan Email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

          {/* Username */}
          <Text className='text-lg font-semibold mb-2 mt-4'>Username</Text>
          <View className='flex-row justify-start items-center w-full'>
            <Ionicons name='accessibility-outline' size={24} color='#303030' />
            <Controller
              control={control}
              name='username'
              rules={{
                required: "Username wajib diisi",
                minLength: { value: 6, message: "Username minimal 6 karakter" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]'
                  placeholder='Masukkan Username'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.username && <Text style={{ color: "red" }}>{errors.username.message}</Text>}

          {/* Password */}
          <Text className='text-lg font-semibold mb-2 mt-4'>Password</Text>
          <View className='flex-row justify-start items-center w-full'>
            <Ionicons name='lock-closed-outline' size={24} color='#303030' />
            <View className='relative w-[90%]'>
              <Controller
                control={control}
                name='password'
                rules={{
                  required: "Password wajib diisi",
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2'
                    placeholder='Masukkan Password'
                    secureTextEntry={!showPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute top-3 right-0'>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#303030' />
              </TouchableOpacity>
            </View>
          </View>
          {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}

          {/* Register Button */}
          <TouchableOpacity className={`${isLoading ? "bg-[#d1d1d1]" : "bg-primary"} py-2 rounded-full w-full mt-6`} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
            <Text className='text-center text-white text-lg font-semibold'>Register</Text>
          </TouchableOpacity>

          <View className='flex-row justify-center items-center mt-4'>
            <Text className='text-center text-[#404040]'>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigate.push("Login")}>
              <Text className='text-center text-primary font-semibold'>Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}

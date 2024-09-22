import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import UserApi from "../../apis/UserApi";

export default function ChangePasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await UserApi.changePassword({
      oldPassword: data.oldPassword,
      password: data.newPassword,
      passwordConfirm: data.confirmPassword,
    });
    if (res) {
      reset();
      navigate.navigate("Profile");
    }
  };

  return (
    <ScrollView className='bg-white'>
      <View className='justify-start items-center px-4 flex-1'>
        <View className='mt-8'>
          <Text className='text-2xl font-bold'>Ganti Password</Text>
        </View>
        <View className='flex-1'>
          {/* Password Lama */}
          {/* <View className='mb-4 mt-6'>
            <Text className='text-lg font-semibold text-start'>Password Lama</Text>
            <View className='flex-row justify-start items-center w-full mb-1'>
              <Ionicons name='lock-closed-outline' size={24} color='#303030' />
              <Controller
                control={control}
                name='oldPassword'
                rules={{ required: "Password lama wajib diisi!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]'
                    placeholder='Masukkan password lama...'
                    secureTextEntry
                  />
                )}
              />
            </View>
            {errors.oldPassword && <Text style={{ color: "red" }}>{errors.oldPassword.message}</Text>}
          </View> */}

          {/* Password Baru */}
          <View className='mb-4 mt-6'>
            <Text className='text-lg font-semibold text-start'>Password Baru</Text>
            <View className='mb-4'>
              <View className='flex-row justify-start items-center w-full mb-1'>
                <Ionicons name='lock-closed-outline' size={24} color='#303030' />
                <View className='relative w-[90%]'>
                  <Controller
                    control={control}
                    name='newPassword'
                    rules={{ required: "Password baru wajib diisi!" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2'
                        placeholder='Masukkan password baru...'
                        secureTextEntry={!showPassword}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute top-3 right-0'>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#303030' />
                  </TouchableOpacity>
                </View>
              </View>
              {errors.newPassword && <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>}
            </View>
          </View>

          {/* Konfirmasi Password Baru */}
          <View className='mb-4'>
            <Text className='text-lg font-semibold text-start'>Konfirmasi Password Baru</Text>
            <View className='mb-4'>
              <View className='flex-row justify-start items-center w-full mb-1'>
                <Ionicons name='lock-closed-outline' size={24} color='#303030' />
                <View className='relative w-[90%]'>
                  <Controller
                    control={control}
                    name='confirmPassword'
                    rules={{
                      required: "Konfirmasi password baru wajib diisi!",
                      validate: (value) => value === watch("newPassword") || "Password tidak sama",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className='border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2'
                        placeholder='Konfirmasi password baru...'
                        secureTextEntry={!showConfirmPassword}
                      />
                    )}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute top-3 right-0'>
                    <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color='#303030' />
                  </TouchableOpacity>
                </View>
              </View>
              {errors.confirmPassword && <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>}
            </View>
          </View>
        </View>

        <View className='mb-4 flex-row justify-center items-center gap-x-2 mt-3'>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigate.goBack()} className='w-[48%] bg-[#fff] py-3.5 rounded-full'>
            <Text className='text-[#3f45f9] text-lg font-semibold text-center'>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8} className='w-[48%] bg-[#3f45f9] py-3.5 rounded-full'>
            <Text className='text-white text-lg font-semibold text-center'>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

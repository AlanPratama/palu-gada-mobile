import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddPostScreen() {
  const navigate = useNavigation();
  const [isUrgent, setIsUrgent] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="p-3 min-h-screen bg-white"
    >
      <View className="flex-row justify-between items-center mb-4">
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
      </View>

      <View className="mb-4 mt-4">
        <Text className="text-lg font-semibold text-start">
          Judul Postingan
        </Text>
        <View className="flex-row justify-start items-center w-full">
          <Ionicons name="accessibility-outline" size={24} color="#303030" />
          <Controller
            control={control}
            name="title"
            rules={{ required: "Judul wajib diisi!" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                placeholder="Bantuin buang mayat kucing..."
              />
            )}
          />
        </View>
        {errors.title && (
          <Text style={{ color: "red" }}>{errors.title.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold text-start">Deskripsi</Text>
        <View className="flex-row justify-start items-center w-full">
          <Ionicons name="accessibility-outline" size={24} color="#303030" />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Deskripsi wajib diisi!" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                placeholder="Masukkan deskripsi..."
              />
            )}
          />
        </View>
        {errors.description && (
          <Text style={{ color: "red" }}>{errors.description.message}</Text>
        )}
      </View>

      {/* Budget */}
      <View className="flex-row justify-between items-end gap-x-2">
        <View className="w-[42%]">
          <Text className="text-lg font-semibold text-start">Budget</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="accessibility-outline" size={24} color="#303030" />
            <Controller
              name="minBudget"
              control={control}
              rules={{
                required: "Minimal budget wajib diisi!",
                validate: (value) =>
                  value >= 1 || "Minimal budget harus lebih besar dari 0",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="Masukkan budget..."
                  keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        <View className="w-[45%]">
          <View className="flex-row justify-start items-center w-full">
            <Controller
              name="maxBudget"
              control={control}
              rules={{
                required: "Maksimal budget wajib diisi!",
                validate: (value, { minBudget }) =>
                  value >= 1 || "Maksimal budget harus lebih besar dari 0",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="Max budget..."
                />
              )}
            />
          </View>
        </View>
      </View>
      {errors.minBudget && (
        <Text style={{ color: "red" }}>{errors.minBudget.message}</Text>
      )}
      {errors.maxBudget && (
        <Text style={{ color: "red" }}>{errors.maxBudget.message}</Text>
      )}
      {watch("minBudget") >= watch("maxBudget") && (
        <Text style={{ color: "red" }}>
          Max budget harus lebih besar dari min budget
        </Text>
      )}

      {/* Tenggat Hari Pengerjaan */}
      <View className="mb-4 mt-4">
        <Text className="text-lg font-semibold text-start">
          Tenggat Hari Pengerjaan
        </Text>
        <View className="flex-row justify-between items-end gap-x-2">
          <View className="w-[42%]">
            <View className="flex-row justify-start items-center w-full">
              <Ionicons
                name="accessibility-outline"
                size={24}
                color="#303030"
              />
              <Controller
                name="finishDay"
                control={control}
                rules={{
                  required: "Tenggat wajib diisi!",
                  validate: (value) =>
                    value >= 1 || "Tenggat hari pengerjaan minimal 1 hari",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                    placeholder="5..."
                  />
                )}
              />
            </View>
          </View>
          <View className="w-[45%]">
            <View className="flex-row justify-start items-center w-full">
              {/* <Ionicons name="accessibility-outline" size={24} color="#303030" /> */}
              {/* <TextInput
                className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                placeholder="Is Urgent..."
              /> */}
              <TouchableOpacity
                onPress={() => setIsUrgent(!isUrgent)}
                className={`${
                  isUrgent
                    ? "border-[#3f45f9] text-[#3f45f9] bg-[#eff6ff71]"
                    : "border-[#d1d1d1] text-[#303030]"
                } rounded-[10px] border-2 ml-2 py-2 w-[90%]`}
              >
                <Text
                  className={`${
                    isUrgent ? "text-[#3f45f9]" : "text-[#a1a1a1]"
                  } text-center font-medium uppercase`}
                >
                  Darurat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {errors.finishDay && (
          <Text style={{ color: "red" }}>{errors.finishDay.message}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
        className="bg-[#3f45f9] mt-4 py-3 rounded-full"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Sebarkan Postingan
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

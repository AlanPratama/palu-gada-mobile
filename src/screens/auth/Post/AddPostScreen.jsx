import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import PostApi from "../../../apis/PostApi";

export default function AddPostScreen() {
  const navigate = useNavigation();
  const [isUrgent, setIsUrgent] = useState(false);
  const { items: catItems } = useSelector((state) => state.category);

  const { district } = useSelector((state) => state.district);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [selected, setSelected] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();

  const districtData = district.map((item) => ({
    key: item.id,
    value: item.districtName,
  }));
  const data = catItems.map((item) => ({ key: item.id, value: item.name }));

  // console.log("SELECTED: ", selected);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (image) {
      formData.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }

    data.isUrgent = isUrgent;
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("districtId", selectedDistrict);
    formData.append("categoriesId", selected);

    // console.log("KNTLLLLLLLLLLLLL", formData);
    // console.log("ojan coli", selected);

    const res = await PostApi.createPost(formData);
    if(res) {
      alert("Post Success!")
      navigate.goBack()
    }
    // reset();
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Meminta izin akses galeri
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Izin untuk mengakses galeri diperlukan!");
      return;
    }

    // Buka galeri untuk memilih gambar
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileType = imageUri.substring(imageUri.lastIndexOf(".") + 1);

      // setImage(result);
      setImage({
        uri: imageUri,
        type: `image/${fileType}`, // Mendapatkan tipe file dari ekstensi
        name: `photo.${fileType}`, // Nama file untuk dikirim ke server
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
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

        <View className="mb-4 mt-1">
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
              <Ionicons
                name="accessibility-outline"
                size={24}
                color="#303030"
              />
              <Controller
                name="budgetMin"
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
                name="budgetMax"
                control={control}
                rules={{
                  required: "Maksimal budget wajib diisi!",
                  validate: (value, { budgetMin }) =>
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
        {errors.budgetMin && (
          <Text style={{ color: "red" }}>{errors.budgetMin.message}</Text>
        )}
        {errors.budgetMax && (
          <Text style={{ color: "red" }}>{errors.budgetMax.message}</Text>
        )}
        {watch("budgetMin") >= watch("budgetMax") && (
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

        <View className="mb-4 mt-4">
          <Text className="text-lg font-semibold text-start">
            {/* {date.toDateString()} */}
            Tenggat Pilih Pekerja
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="accessibility-outline" size={24} color="#303030" />
            <TouchableOpacity
              onPress={() => setShow(true)}
              className="flex-row justify-start items-center border border-gray-200 p-2 rounded-lg mr-1"
            >
              <Text>Pilih Tanggal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowTime(true)}
              className="flex-row justify-start items-center border border-gray-200 p-2 rounded-lg mr-1"
            >
              <Text>Pilih Waktu</Text>
            </TouchableOpacity>
            {show && (
              <RNDateTimePicker
                testID="date"
                value={date}
                is24Hour={true}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(e) => {
                  setShow(false);
                  setDate(new Date(e.nativeEvent.timestamp));
                  // console.log("ASASA: ", e.nativeEvent.timestamp);
                }}
              />
            )}
            {showTime && (
              <RNDateTimePicker
                testID="time"
                value={date}
                is24Hour={true}
                mode="time"
                display="default"
                onChange={(e) => {
                  setShowTime(false);
                  setTime(new Date(e.nativeEvent.timestamp));
                  console.log("ASASA: ", e);
                }}
              />
            )}
          </View>
          <Text className="text-sm text-[#343434] mt-1">
            {date.toDateString()} | {time.toLocaleTimeString()}
          </Text>
          {/* {errors.title && (
          <Text style={{ color: "red" }}>{errors.title.message}</Text>
        )} */}
        </View>

        {/* Image Upload Section */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Upload Gambar
          </Text>
          <View className="mb-3 mt-1 flex-row justify-start items-center">
            <TouchableOpacity
              onPress={pickImage}
              className="flex-row justify-start items-center border border-gray-200 p-2 rounded-lg mr-1"
            >
              <Text className="text-base">Pilih Gambar</Text>
            </TouchableOpacity>
          </View>
          {image && (
            <Image
              source={{ uri: image.uri }}
              className="rounded-[13px]"
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Pilih Kategori
          </Text>
          <View className="h-auto flex-row justify-start items-center w-full">
            <SelectList
              maxHeight={500}
              setSelected={(key) => setSelectedDistrict(key)}
              data={districtData}
              save="key"
              // onSelect={() => alert(selected)}
              label="District"
            />
          </View>
          {errors.title && (
            <Text style={{ color: "red" }}>{errors.title.message}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Pilih Kategori
          </Text>
          <View className="h-auto flex-row justify-start items-center w-full">
            <MultipleSelectList
              maxHeight={500}
              setSelected={(key) => setSelected(key)}
              data={data}
              save="key"
              // onSelect={() => alert(selected)}
              label="Kategori"
            />
          </View>
          {errors.title && (
            <Text style={{ color: "red" }}>{errors.title.message}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
          className="bg-[#3f45f9] mt-4 py-3 rounded-full"
          // disabled={
          //   watch("budgetMin") >= watch("budgetMax") || watch("finishDay") <= 0
          // }
        >
          <Text className="text-white text-lg font-semibold text-center">
            Sebarkan Postingan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
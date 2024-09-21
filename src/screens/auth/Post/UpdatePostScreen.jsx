import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import PostApi from "../../../apis/PostApi";
import { MultiSelect } from "react-native-element-dropdown";
import { SelectList } from "react-native-dropdown-select-list";

export default function UpdatePostScreen({ route }) {
  const { post } = route.params;
  const navigate = useNavigation();
  const [isUrgent, setIsUrgent] = useState(post.isUrgent);
  const { items: catItems } = useSelector((state) => state.category);

  const { district } = useSelector((state) => state.district);

  console.log("ojan", post);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: post.id,
      title: post.title,
      description: post.description,
      budgetMin: post.budgetMin.toString(),
      budgetMax: post.budgetMax.toString(),
      finishDay: post.finishDay.toString(),
    },
  });

  const selectedCategories = post.postCategories?.map((item) => item.id)
  console.log("POST CAT: ", selectedCategories);
  
  const [selected, setSelected] = useState(selectedCategories);
  const [selectedDistrict, setSelectedDistrict] = useState(post.district.id);

  const districtData = district.map((item) => ({
    key: item.id,
    value: item.districtName,
  }));
  const data = catItems.map((item) => ({ label: item.name, value: item.id }));
  console.log("POST CATTT: ", post.postCategories);
  console.log("CATTTT: ", catItems);
  console.log("DATA: ", data);

  const onSubmit = async (data) => {
    console.log("LKALSKA: ", selected);
    
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

    const res = await PostApi.updatePost(post.id, formData);

    if (res) {
      console.log(res);

      alert("Berhasil Update Postingan");
      navigate.navigate("PostDetail", { post: res });
    } else {
      alert("Gagal Update Postingan");
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
        className="p-4 min-h-screen bg-gray-50"
      >
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            activeOpacity={0.7}
            className="flex-row justify-start items-center bg-white rounded-full px-4 py-2 shadow-sm"
          >
            <Ionicons name="chevron-back" size={24} color="#3f45f9" />
            <Text className="text-lg text-[#3f45f9] font-semibold ml-1">
              Kembali
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Ubah Postingan
          </Text>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Upload Gambar
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              className="rounded-lg mb-3 justify-center items-center bg-gray-100"
              style={{
                width: "100%",
                height: 200,
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: "#ccc",
              }}
            >
              {image || post.imageUrl ? (
                <Image
                  source={{ uri: image?.uri ?? post.imageUrl }}
                  className="rounded-lg"
                  style={{ width: "100%", height: 200 }}
                />
              ) : (
                <Text className="text-gray-500">Upload Gambar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Judul Postingan
            </Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
              <Ionicons name="create-outline" size={24} color="#3f45f9" />
              <Controller
                control={control}
                name="title"
                rules={{ required: "Judul wajib diisi!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 ml-2 text-gray-800"
                    placeholder="Bantuin buang mayat kucing..."
                  />
                )}
              />
            </View>
            {errors.title && (
              <Text className="text-red-500 mt-1">{errors.title.message}</Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Deskripsi
            </Text>
            <View className="bg-gray-100 rounded-lg px-3 py-2">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Deskripsi wajib diisi!" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="text-gray-800"
                    placeholder="Masukkan deskripsi..."
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
            </View>
            {errors.description && (
              <Text className="text-red-500 mt-1">
                {errors.description.message}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Budget
            </Text>
            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Ionicons name="cash-outline" size={24} color="#3f45f9" />
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
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="Min budget"
                        keyboardType="numeric"
                      />
                    )}
                  />
                </View>
              </View>
              <View className="w-[48%]">
                <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Ionicons name="cash-outline" size={24} color="#3f45f9" />
                  <Controller
                    name="budgetMax"
                    control={control}
                    rules={{
                      required: "Maksimal budget wajib diisi!",
                      validate: (value) =>
                        value >= 1 ||
                        "Maksimal budget harus lebih besar dari 0",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="Max budget"
                        keyboardType="numeric"
                      />
                    )}
                  />
                </View>
              </View>
            </View>
            {errors.budgetMin && (
              <Text className="text-red-500 mt-1">
                {errors.budgetMin.message}
              </Text>
            )}
            {errors.budgetMax && (
              <Text className="text-red-500 mt-1">
                {errors.budgetMax.message}
              </Text>
            )}
            {watch("budgetMin") >= watch("budgetMax") && (
              <Text className="text-red-500 mt-1">
                Max budget harus lebih besar dari min budget
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Waktu Pengerjaan
            </Text>
            <View className="flex-row justify-between items-center">
              <View className="w-[48%]">
                <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Ionicons name="calendar-outline" size={24} color="#3f45f9" />
                  <Controller
                    name="finishDay"
                    control={control}
                    rules={{
                      required: "Waktu wajib diisi!",
                      validate: (value) =>
                        value >= 1 || "Waktu pengerjaan minimal 1 hari",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        className="flex-1 ml-2 text-gray-800"
                        placeholder="hari"
                      />
                    )}
                  />
                </View>
              </View>
              <View className="w-[48%]">
                <TouchableOpacity
                  onPress={() => setIsUrgent(!isUrgent)}
                  className={`${
                    isUrgent ? "bg-red-500" : "bg-gray-300"
                  } rounded-lg py-3 px-4`}
                >
                  <Text className="text-white text-center font-semibold uppercase">
                    {isUrgent ? "Mendesak" : "Tidak Mendesak"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {errors.finishDay && (
              <Text className="text-red-500 mt-1">
                {errors.finishDay.message}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Pilih Kota
            </Text>
            <View className="bg-gray-100 rounded-lg">
              <SelectList
                boxStyles={{ backgroundColor: "transparent", borderWidth: 0 }}
                maxHeight={800}
                inputStyles={{ color: "#4a5568" }}
                dropdownStyles={{ backgroundColor: "#f7fafc" }}
                dropdownItemStyles={{ backgroundColor: "transparent" }}
                dropdownTextStyles={{ color: "#4a5568" }}
                setSelected={(key) => setSelectedDistrict(key)}
                defaultOption={{
                  key: post.district.id,
                  value: post.district.districtName,
                }}
                data={districtData}
                save="key"
                placeholder="Pilih kota"
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Pilih Kategori
            </Text>
            <MultiSelect
              className="w-full"
              style={{ marginTop: 20 }}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select Categories"
              search
              value={selected}
              onChange={(item) => {
                setSelected(item);
              }}
              selectedStyle={{ backgroundColor: "#e0e0e0" }}
            />

            {/* <MultipleSelectList
              boxStyles={{ backgroundColor: "#f3f4f6", borderWidth: 0 }}
              maxHeight={800}
              inputStyles={{ color: "#4a5568" }}
              dropdownStyles={{ backgroundColor: "#f7fafc" }}
              dropdownItemStyles={{
                backgroundColor: "transparent",
              }}
              dropdownTextStyles={{ color: "#4a5568" }}
              setSelected={(key) => setSelected(key)}
              defaultOption={post.postCategories.flatMap((category) => ({
                key: category.id,
                value: category.category,
              }))}
              data={data}
              save="key"
              placeholder="Pilih kategori"
            /> */}
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            className="bg-[#3f45f9] mt-4 py-4 rounded-lg"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import UserApi from "../../apis/UserApi";
import { MultiSelect } from "react-native-element-dropdown";
import { SelectList } from "react-native-dropdown-select-list";

export default function EditProfileScreen() {
  const navigate = useNavigation();

  const { items: catItems } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const { district } = useSelector((state) => state.district);

  // console.log("USER: ", user);

  const categoriesData = catItems.map((item) => ({
    label: item.name,
    value: item.id,
  }));



  const districtData = district.map((item) => ({
    key: item.id,
    value: item.districtName,
  }));

  console.log("USER: ", user);
  
  const defaultSelectedCategories = user.userCategories.map((item) => item.id);
  console.log("categoriesData: ", defaultSelectedCategories);
  
  const [showDate, setShowDate] = useState(false);

  const [gender, setGender] = useState(
    user.userGender.charAt(0).toUpperCase() +
      user.userGender.slice(1).toLowerCase()
  );
  const [birthDate, setBirthDate] = useState(new Date(user.birthDate));
  const [selectedDistrict, setSelectedDistrict] = useState(user.district.id);
  const [selectedCategories, setSelectedCategories] =
    useState(user.userCategories.map((item) => item.category.id));
    console.log(categoriesData);
    

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user.name,
      about: user.about,
      phone: user.phone,
      address: user.address,
      nik: user.nik,
      bankAccount: user.bankAccount,
    },
  });

  const onSubmit = async (data) => {
    console.log("SELECTED: ", selectedCategories);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("phone", data.phone);
    formData.append("nik", data.nik);
    formData.append("bankAccount", data.bankAccount);
    formData.append("address", data.address);
    formData.append("birthDate", birthDate.toISOString().split("T")[0]);
    formData.append("userGender", gender);
    formData.append("userCategoriesId", selectedCategories);
    formData.append("districtId", selectedDistrict);

    if (image) {
      // formData.append("file", image);
      formData.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }

    const res = await UserApi.updateProfile(formData, user.id);
    // const res = await axiosInstance.put(`/users/${user.id}`, formData, {
    //   headers: {
    //       "Content-Type": "multipart/form-data",
    //   }
    // });

    // console.log("RES: ", res);

    if (res?.status === "OK") {
      alert("Update profile success!");
      await UserApi.getAuthenticated();
      navigate.goBack();
      // reset();
    } else {
      alert("ada yang aneh coy!");
    }
  };

  const [image, setImage] = useState(null);
  console.log("asasa: ", image);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Izin untuk mengakses galeri diperlukan!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
    <ScrollView>
      <View className="bg-white min-h-screen justify-start items-center px-4">
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={pickImage}
            className="rounded-full border-2 border-gray-100 my-6"
          >
            <Image
              source={{
                uri: image
                  ? image.uri
                  : user.photoUrl
                  ? user.photoUrl
                  : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
              }}
              alt="Profile Pic"
              className="w-32 h-32 rounded-full"
            />
          </TouchableOpacity>
          {image ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setImage(null)}
              className="absolute bottom-5 right-5 bg-primary p-1.5 rounded-full"
            >
              <Ionicons name="close-circle-outline" size={22} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pickImage}
              className="absolute bottom-5 right-5 bg-primary p-1.5 rounded-full"
            >
              <Ionicons name="camera" size={22} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Nama Lengkap</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="accessibility-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="name"
              rules={{ required: "Nama wajib diisi!" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="Masukkan nama lengkap..."
                />
              )}
            />
          </View>
          {errors.name && (
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Tentang Kamu</Text>
          <View className="mt-2 flex-row justify-start items-start w-full">
            <Ionicons name="information-circle-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="about"
              rules={{ required: "Tentang wajib diisi!" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 w-[90%]"
                  placeholder="Masukkan deskripsi diri kamu..."
                />
              )}
            />
          </View>
          {errors.about && <Text style={{ color: "red" }}>{errors.about.message}</Text>}
        </View>

        {/* <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Username</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="person-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan username..."
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Email</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="mail-outline" size={24} color="#303030" />
            <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan email..."
            />
          </View>
        </View> */}

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Nomor Telepon
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="call-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Nomor telepon wajib diisi!",
                validate: (value) =>
                  value.length >= 10 || "Nomor telepon minimal 10 digit!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="08xxxxxxxxxx..."
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          {errors.phone && (
            <Text style={{ color: "red" }}>{errors.phone.message}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Nomor Induk Kependudukan (NIK)
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="id-card-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="nik"
              rules={{
                required: "NIK wajib diisi!",
                validate: (value) =>
                  value.length >= 16 ||
                  "Nomor Induk Kependudukan (NIK) minimal 16 digit!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="317503xxxxxxxxxx..."
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          {errors.nik && (
            <Text style={{ color: "red" }}>{errors.nik.message}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Bank Account</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="card-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="bankAccount"
              rules={{
                required: "Bank Account wajib diisi!",
                validate: (value) =>
                  value.length >= 8 || "Bank Account minimal 8 digit!",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
                  placeholder="0790xxxxxxx..."
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          {errors.bankAccount && (
            <Text style={{ color: "red" }}>{errors.bankAccount.message}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">
            Tanggal Lahir
          </Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="calendar-outline" size={24} color="#303030" />
            <TouchableOpacity
              onPress={() => setShowDate(true)}
              className="border-b-2 border-[#d1d1d1] ml-2 py-2 w-[90%]"
            >
              {/* <Text className="text-[#909090]">{birthDate !== new Date() ? birthDate.toDateString() : "Tanggal Lahir"}</Text> */}
              <Text className="text-[#909090]">
                {birthDate.toISOString().split("T")[0]}
              </Text>
            </TouchableOpacity>
          </View>
          {showDate && (
            <RNDateTimePicker
              testID="date"
              value={birthDate}
              is24Hour={true}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(e) => {
                setShowDate(false);
                setBirthDate(new Date(e.nativeEvent.timestamp));
                // console.log("ASASA: ", e.nativeEvent.timestamp);
              }}
            />
          )}
        </View>

        <View className="w-full mb-4">
          <Text className="text-lg font-semibold text-start">
            Jenis Kelamin
          </Text>
          <View className="flex-row justify-start items-center w-full mt-1.5">
            <Ionicons name="male-female-outline" size={24} color="#303030" />
            <TouchableOpacity
              onPress={() => setGender("Male")}
              className={`${
                gender === "Male"
                  ? "border-[#3f45f9] text-[#3f45f9] bg-[#eff6ff71]"
                  : "border-[#d1d1d1] text-[#303030]"
              } rounded-[4px] border-2 ml-2 py-1 px-2.5`}
            >
              <Text
                className={`${
                  gender === "Male" ? "text-[#3f45f9]" : "text-[#858585]"
                } text-center text-sm font-normal uppercase`}
              >
                Pria
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender("Female")}
              className={`${
                gender === "Female"
                  ? "border-[#3f45f9] text-[#3f45f9] bg-[#eff6ff71]"
                  : "border-[#d1d1d1] text-[#303030]"
              } rounded-[4px] border-2 ml-2 py-1 px-2.5`}
            >
              <Text
                className={`${
                  gender === "Female" ? "text-[#3f45f9]" : "text-[#858585]"
                } text-center text-sm font-normal uppercase`}
              >
                Wanita
              </Text>
            </TouchableOpacity>
            {/* <TextInput
              className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-2 w-[90%]"
              placeholder="Masukkan jenis kelamin..."
            /> */}
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold text-start">Alamat</Text>
          <View className="flex-row justify-start items-center w-full">
            <Ionicons name="location-outline" size={24} color="#303030" />
            <Controller
              control={control}
              name="address"
              rules={{ required: "Alamat wajib diisi!" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border-b-2 border-[#d1d1d1] text-[#303030] ml-2 py-0.5 w-[90%]"
                  placeholder="Masukkan alamat..."
                  numberOfLines={3}
                  multiline
                />
              )}
            />
          </View>
          {errors.address && (
            <Text style={{ color: "red" }}>{errors.address.message}</Text>
          )}
        </View>

        <View className="w-full mb-4">
          <Text className="text-lg font-semibold text-start">Pilih Kota</Text>
          <View className="mt-2 h-auto flex-row justify-start items-center w-full">
            <SelectList
              defaultOption={{ key: user.district?.id, value: user.district?.districtName }}
              maxHeight={500}
              setSelected={(key) => setSelectedDistrict(key)}
              data={districtData}
              save="key"
              // onSelect={() => alert(selected)}
              label="District"
              placeholder="Pilih kota..."
              searchPlaceholder="Cari kota..."
            />
          </View>
        </View>

        <View className="w-full mb-4">
          <Text className="text-lg font-semibold text-start">
            Pilih Kategori Pilihanmu
          </Text>
          <View className="mt-2 h-auto flex-row flex-wrap justify-start items-center w-full">
            <MultiSelect
              className="w-full"
              style={{ marginTop: 20 }}
              data={categoriesData}
              labelField="label"
              valueField="value"
              placeholder="Pilih Kategori"
              search
              value={selectedCategories}
              onChange={(item) => {
                setSelectedCategories(item);
              }}
              selectedStyle={{ backgroundColor: "#e0e0e0" }}
            />
          </View>
        </View>

        <View className="mb-4 flex-row justify-center items-center gap-x-2 mt-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate.goBack()}
            className="w-[48%] bg-[#fff] py-3.5 rounded-full"
          >
            <Text className="text-[#3f45f9] text-lg font-semibold text-center">
              Batal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            className="w-[48%] bg-[#3f45f9] py-3.5 rounded-full"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SearchScreen() {

    const [search, setSearch] = useState("");
    const l = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


  return (
    <View className="bg-white min-h-screen p-3">
        <View className="relative">
            <TextInput 
                value={search}
                onChangeText={setSearch}
                className="bg-[#f6f6f6] rounded-full text-[#303030] py-2 px-9"
                placeholder="Cari..."
            />
            <View className="absolute left-2.5 top-3">
                <Ionicons name='search-outline' size={20} color='#303030' />
            </View>
            {
                search.length > 0 && (
                    <TouchableOpacity onPress={() => setSearch("")} className="absolute right-4 top-3">
                        <Ionicons name='close-outline' size={20} color='#303030' />
                    </TouchableOpacity>
                )
            }
        </View>
        <View>
            <ScrollView
            className="py-3.5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >
            {l.map((_, i) => (
                <TouchableOpacity
                key={i}
                className="bg-blue-100 rounded-full px-3.5 py-1 mr-2 justify-center items-center"
                >
                <Text className="text-[14.5px] font-semibold text-[#4f6def]">
                    Kurir
                </Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>

        <View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }} >
        {
          l.map((_, i) => (
            <TouchableOpacity
            key={i + "kerjainaja"}
          activeOpacity={0.5}
          className="my-3.5 flex-row justify-start items-start gap-x-2.5"
        >
          <Image
            source={{
              uri: "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
            }}
            alt=""
            className="w-[88px] h-[88px] border border-gray-200 rounded-xl"
          />
          <View className="w-[68%]">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-bold text-[#4f6def]">
                Serba Bisa
              </Text>
              <View className="flex-row justify-center items-center gap-x-1">
                <Text className="text-sm font-normal text-[#343434]">
                  2 jam lalu
                </Text>
                <Ionicons name="time-outline" size={18} />
              </View>
            </View>
            <Text
              numberOfLines={1}
              className="text-[17px] font-bold text-[#343434]"
            >
              Kuburin kucing aku
            </Text>
            <Text
              numberOfLines={2}
              className="text-sm font-normal text-[#343434]"
            >
              halo banh, jadi ada kucing aku yang namanya Boni, dia kucing
              kesayanganku, tolong bantu kuburin dong :(
            </Text>
          </View>
        </TouchableOpacity>
          )) 
        }
            </ScrollView>

        </View>

    </View>
  )
}
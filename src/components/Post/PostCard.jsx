import { Image, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

import { calculateTimeAgo } from "../../utils/time.util"

const PostCard = ({ post }) => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate("PostDetail", {
          post
        })
      }
      activeOpacity={0.5}
      className="my-3.5 flex-row justify-start items-start gap-x-2.5"
    >
      <Image
        source={{
          uri: post.imageUrl
            ? post.imageUrl
            : "https://www.waifu.com.mx/wp-content/uploads/2023/05/Rei-Ayanami-20.jpg",
        }}
        alt=""
        className="w-[88px] h-[88px] border border-gray-200 rounded-xl"
      />
      <View className="w-[68%]">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-bold text-primary">
            {post ? post.postCategories[0].category : "Apa Aja"}
          </Text>
          <View className="flex-row justify-center items-center gap-x-1">
            <Text className="text-sm font-normal text-[#343434]">
              {calculateTimeAgo(post.createdAt)}
            </Text>
            <Ionicons name="time-outline" size={18} />
          </View>
        </View>
        <Text
          numberOfLines={1}
          className="text-[17px] font-bold text-[#343434]"
        >
          {post.title}
        </Text>
        <Text
          numberOfLines={2}
          className="text-sm font-normal text-[#343434]"
        >
          {post.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostCard
import { View, Text, FlatList, Animated as Anim } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import slides from "../constants/slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Anim.Value(0)).current;
  const slidesRef = useRef(null);

  const navigate = useNavigation()

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async (isFirst = false) => {
    if(isFirst){
        slidesRef.current.scrollToIndex({ index: currentIndex })
    } else {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
        } else {
          try {
            await AsyncStorage.setItem("@viewedOnBoarding", "true");
            navigate.replace("Welcome")
          } catch (error) {
            console.log("ERROR FILLING ONBOARDING: ", error);
          }
        }
    }
  }

  useEffect(() => {
    scrollTo(true)
  }, [])

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Animated.View entering={FadeIn.delay(150)} className="flex-[3]">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          onScroll={Anim.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </Animated.View>

        <Animated.View entering={FadeIn.delay(150)}>
          <Paginator data={slides} scrollX={scrollX} />
        </Animated.View>
        <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
}

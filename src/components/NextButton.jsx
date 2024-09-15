import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Circle, G, Svg } from "react-native-svg";

export default function NextButton({ percentage, scrollTo }) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset = circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset: strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  return (
    <View className='flex-1 justify-center items-center'>
      <Svg height={size} width={size}>
        <G rotation={-90} origin={center}>
          <Circle cx={center} cy={center} r={radius} stroke='#E6E7E8' strokeWidth={strokeWidth} fill='transparent' />
          <Circle
            ref={progressRef}
            cx={center}
            cy={center}
            r={radius}
            stroke='#4f6def'
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            fill={"transparent"}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={() => scrollTo(false)} activeOpacity={0.6} className='absolute bg-primary rounded-[100px] p-[20px]'>
        <Ionicons name='arrow-forward' size={32} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

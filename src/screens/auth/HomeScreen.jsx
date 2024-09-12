import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {

  const clearOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnBoarding");
    } catch (error) {
      console.log("ERROR CLEARING ONBOARDING: ", error);
    }
  }

  return (
    <View className="min-h-screen">
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={clearOnBoarding}><Text>REMOVE ONBOARDING</Text></TouchableOpacity>
    </View>
  )
}
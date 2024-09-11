import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';

export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
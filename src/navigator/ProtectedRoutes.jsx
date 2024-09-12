import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfileScreen from '../screens/auth/EditProfileScreen';
import HomeScreen from '../screens/auth/HomeScreen';
import ProfileScreen from '../screens/auth/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ProtectedRoutes() {
  const Tab = createBottomTabNavigator();

  // Custom button for center "+" icon
  const CustomAddButton = ({ onPress }) => (
    <View>
      <TouchableOpacity
        style={{
          top: -25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#3e55ff',
          width: 60,
          height: 60,
          margin: 6,
          borderRadius: 30,
        }}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );

  const Stack = createNativeStackNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          height: 70,
          borderRadius: 200,
          margin: 12,
          // shadowColor: '#4f6def',
          shadowColor: '#343434',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.1,
          shadowRadius: 3.5,
          elevation: 4,
          borderTopWidth: 0.15,
          borderLeftWidth: 0.15,
          borderRightWidth: 0.15,
          // borderColor: "#4f6def"
          borderColor: "#909090"
        },
      }}
      // screenOptions={{
      //   headerShown: false,
      //   tabBarShowLabel: false,
      //   tabBarStyle: {
      //     position: 'absolute',
      //     backgroundColor: 'white',
      //     height: 70,
      //     borderTopStartRadius: 50,
      //     borderTopEndRadius: 50,
      //     // shadowColor: '#4f6def',
      //     shadowColor: '#343434',
      //     shadowOffset: { width: 0, height: -10 },
      //     shadowOpacity: 0.1,
      //     shadowRadius: 3.5,
      //     elevation: 4,
      //     borderTopWidth: 0.15,
      //     borderLeftWidth: 0.15,
      //     borderRightWidth: 0.15,
      //     // borderColor: "#4f6def"
      //     borderColor: "#909090"
      //   },
      // }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />

      {/* Search Tab */}
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search-outline"
              size={24}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />

      {/* Add Tab with custom button */}
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomAddButton {...props} />,
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Setting"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cog-outline"
              size={24}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Learn from "../screen/Learn";
import Settings from "../screen/Settings";
import HomeScreen from "../screen/HomeScreen";
import { useRoute } from "@react-navigation/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();

const Home = ({ logout }) => {
  const route = useRoute();
  // const {data} = route.params
  return (
    <Tab.Navigator
      
      screenOptions={({ route, focused }) => ({
        tabBarIcon: ({ color , size }) => {
          let iconName;

          if (route.name === "Learn") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } else if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
      // screenOptions={{
      //   activeTintColor: "blue",
      //   inactiveTintColor: "gray",
      // }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        // initialParams={{data: data}}
      />
      {/* <Tab.Screen name="Learn" component={Learn} /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitleAlign: "center" }}
        initialParams={{ logout: logout }}
      />
    </Tab.Navigator>
  );
};

export default Home;

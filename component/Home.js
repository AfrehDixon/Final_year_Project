import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Learn from "../screen/Learn";
import Settings from "../screen/Settings";
import HomeScreen from "../screen/HomeScreen";
// import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Homepage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, focused }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Learn") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Learn" component={Learn} /> */}
      <Tab.Screen name="Settings" component={Settings} options={{headerTitleAlign:'center'}}/>
    </Tab.Navigator>
  );
};

export default Homepage;

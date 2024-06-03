import { View, Text, Button } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "./screen/Onbording1";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import Homepage from "./component/Home";
import SplashScreen from "./screen/SplashScreen";
import TestOneScreen from "./screen/TestOneScreen";
import OTPScreen from "./screen/OTPScreen";
import ForgetPassword from "./screen/ForgetPassword";
import RegisterChild from "./screen/RegisterChild";
import TestTwoScreen from "./screen/TestTwoScreen";
import TestThreeScreen from "./screen/TestThreeScreen";
import TestFourScreen from "./screen/TestFourScreen";
import TestResult from "./screen/TestResult";
import TestOneInitialScreen from "./screen/TestOneInitialScreen";
import TestTwoInitialScreen from "./screen/TestTwoInitialScreen";
import TestThreeInitialScreen from "./screen/TestThreeInitialScreen";
import TestFourInitialScreen from "./screen/TestFourInitialScreen";

const Stack = createNativeStackNavigator();
export default function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onbording"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            headerShown: true,
            title: "Forget Password",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{
            headerShown: true,
            headerLeft: null,
            // headerBackVisible: false,
            title: "OTP Verification",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="RegisterChild"
          component={RegisterChild}
          options={{
            headerShown: true,
            title: "Register Child",
            headerTitleAlign: "center",
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestOneInitial"
          component={TestOneInitialScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="TestOne"
          component={TestOneScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="TestTwoInitial"
          component={TestTwoInitialScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="TestTwo"
          component={TestTwoScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="TestThreeInitial"
          component={TestThreeInitialScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="TestThree"
          component={TestThreeScreen}
          options={{ headerShown: true, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="TestFourInitial"
          component={TestFourInitialScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="TestFour"
          component={TestFourScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Result"
          component={TestResult}
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => null,
            headerRight: () => (
              <Button title="Home" onPress={navigation.navigate("Home")} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // } else {
  // 	return <LoginScreen />;
  // }
}

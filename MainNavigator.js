import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./component/Home";
import TestOneInitialScreen from "./screen/TestOneInitialScreen";
import TestOneScreen from "./screen/TestOneScreen";
import TestTwoInitialScreen from "./screen/TestTwoInitialScreen";
import TestTwoScreen from "./screen/TestTwoScreen";
import TestThreeInitialScreen from "./screen/TestThreeInitialScreen";
import TestThreeScreen from "./screen/TestThreeScreen";
import TestFourInitialScreen from "./screen/TestFourInitialScreen";
import TestFourScreen from "./screen/TestFourScreen";
import TestResult from "./screen/TestResult";
import HomeScreen from "./screen/HomeScreen";
import RegisterChild from "./screen/RegisterChild";
import HandwritingInitial from "./screen/HandwritingInitial";
import HandwwritingScreen from "./screen/HandwritingScreen";
import OnboardingScreen from "./screen/Onbording1";
import LoginScreen from "./screen/LoginScreen";

const MainStack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="HandwritingInitial"
        component={HandwritingInitial}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Handwriting"
        component={HandwwritingScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="TestOneInitial"
        component={TestOneInitialScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TestOne"
        component={TestOneScreen}
        options={{
          headerShown: true,
          title: "Test One",
          headerTitleAlign: "center",
        }}
      />
      <MainStack.Screen
        name="TestTwoInitial"
        component={TestTwoInitialScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TestTwo"
        component={TestTwoScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name="TestThreeInitial"
        component={TestThreeInitialScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TestThree"
        component={TestThreeScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name="TestFourInitial"
        component={TestFourInitialScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TestFour"
        component={TestFourScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name="Result"
        component={TestResult}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
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
    </MainStack.Navigator>
  );
}

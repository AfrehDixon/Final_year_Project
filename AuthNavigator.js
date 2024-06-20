import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screen/Onbording1";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import ForgetPassword from "./screen/ForgetPassword";
import OTPScreen from "./screen/OTPScreen";
import RegisterChild from "./screen/RegisterChild";
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
import Home from "./component/Home";
import HandwritingInitial from "./screen/HandwritingInitial";
import HandwritingScreen from "./screen/HandwritingScreen";
import CaptureImage from "./screen/CaptureImage";

const AuthStack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="HandwritingInitial"
        component={HandwritingInitial}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="Handwriting"
        component={HandwritingScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Capture"
        component={CaptureImage}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: true,
          title: "Forget Password",
          headerTitleAlign: "center",
        }}
      />
      <AuthStack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerShown: true,
          headerLeft: null,
          headerBackVisible: false,
          title: "OTP Verification",
          headerTitleAlign: "center",
        }}
      />
      <AuthStack.Screen
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
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="TestOneInitial"
        component={TestOneInitialScreen}
        // options={{
        //   headerShown: true,
        //   title: "Test One Initial",
        //   headerTitleAlign: "center",
        // }}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="TestOne"
        component={TestOneScreen}
        options={{
          headerShown: true,
          title: "Test One",
          headerTitleAlign: "center",
        }}
      />
      <AuthStack.Screen
        name="TestTwoInitial"
        component={TestTwoInitialScreen}
        // options={{
        //   headerShown: true,
        //   headerLeft: () => null,
        //   gestureEnabled: false,
        // }}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="TestTwo"
        component={TestTwoScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <AuthStack.Screen
        name="TestThreeInitial"
        component={TestThreeInitialScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="TestThree"
        component={TestThreeScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <AuthStack.Screen
        name="TestFourInitial"
        component={TestFourInitialScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="TestFour"
        component={TestFourScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <AuthStack.Screen
        name="Result"
        component={TestResult}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
    </AuthStack.Navigator>
  );
}

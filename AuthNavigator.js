import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screen/Auth/Onbording1";
import LoginScreen from "./screen/Auth/LoginScreen";
import SignupScreen from "./screen/Auth/SignupScreen";
import ForgetPassword from "./screen/Auth/ForgetPassword";
import OTPScreen from "./screen/Auth/OTPScreen";
import RegisterChild from "./screen/Auth/RegisterChild";
import TestOneInitialScreen from "./screen/TestOne/TestOneInitialScreen";
import TestOneScreen from "./screen/TestOne/TestOneScreen";
import TestTwoInitialScreen from "./screen/TestOne/TestTwoInitialScreen";
import TestTwoScreen from "./screen/TestOne/TestTwoScreen";
import TestThreeInitialScreen from "./screen/TestOne/TestThreeInitialScreen";
import TestThreeScreen from "./screen/TestOne/TestThreeScreen";
import TestFourInitialScreen from "./screen/TestOne/TestFourInitialScreen";
import TestFourScreen from "./screen/TestOne/TestFourScreen";
import TestResult from "./screen/TestOne/TestResult";
import HomeScreen from "./screen/HomeScreen";
import Home from "./component/Home";
import HandwritingInitial from "./screen/TestTwo/HandwritingInitial";
// import HandwritingScreen from "./screen/TestTwo/HandwritingScreen";
import CaptureImage from "./screen/TestTwo/CaptureImage";
import AlphabetScreen from "./screen/TestTwo/AlphabetScreen";
import ReadingScreenIntial from "./screen/TestThree/ReadingScreenInitial";
import ReadingScreen from "./screen/TestThree/ReadingScreen";
import HandwritinResult from "./screen/TestTwo/HandwritingResult";
import CaptureVideo from "./screen/TestThree/CaptureVideo";


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
        name="Alphabet"
        component={AlphabetScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ReadingInitial"
        component={ReadingScreenIntial}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={{ headerShown: false }}
      />
      {/* <AuthStack.Screen
        name="Handwriting"
        component={HandwritingScreen}
        options={{ headerShown: false }}
      /> */}
      <AuthStack.Screen
        name="Capture"
        component={CaptureImage}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="ResultTwo"
        component={HandwritinResult}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="CaptureVideo"
        component={CaptureVideo}
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

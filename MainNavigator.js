import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./component/Home";
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
import RegisterChild from "./screen/Auth/RegisterChild";
import HandwritingInitial from "./screen/TestTwo/HandwritingInitial";
// import HandwwritingScreen from "./screen/TestTwo/HandwritingScreen";
import OnboardingScreen from "./screen/Auth/Onbording1";
import LoginScreen from "./screen/Auth/LoginScreen";
import CaptureImage from "./screen/TestTwo/CaptureImage";
import SignupScreen from "./screen/Auth/SignupScreen";
import ForgetPassword from "./screen/Auth/ForgetPassword";
import AlphabetScreen from "./screen/TestTwo/AlphabetScreen";
import HandwritinResult from "./screen/TestTwo/HandwritingResult";
import ReadingScreenIntial from "./screen/TestThree/ReadingScreenInitial";
import ReadingScreen from "./screen/TestThree/ReadingScreen";
import CaptureVideo from "./screen/TestThree/CaptureVideo";

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
        name="ResultTwo"
        component={HandwritinResult}
        options={{ headerShown: false }}
      />
      {/* <MainStack.Screen
        name="Handwriting"
        component={HandwwritingScreen}
        options={{ headerShown: false }}
      /> */}
      <MainStack.Screen
        name="ReadingInitial"
        component={ReadingScreenIntial}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="Alphabet"
        component={AlphabetScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: true }}
      />
      <MainStack.Screen
        name="Capture"
        component={CaptureImage}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CaptureVideo"
        component={CaptureVideo}
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
          headerBackTitleVisible: false,
          preventRemove: true,
        }}
      />
      <MainStack.Screen name="Signup" component={SignupScreen} />
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
          headerBackTitleVisible: false,
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
          headerTitleAlign: "center",
          headerLeft: () => null,
          gestureEnabled: false,
          headerBackTitleVisible: false,
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

// import { View, Text, Button } from "react-native";
// import React from "react";
// import { useState, useEffect, useContext } from "react";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import OnboardingScreen from "./screen/Onbording1";
// import LoginScreen from "./screen/LoginScreen";
// import SignupScreen from "./screen/SignupScreen";
// import Homepage from "./component/Home";
// import SplashScreen from "./screen/SplashScreen";
// import TestOneScreen from "./screen/TestOneScreen";
// import OTPScreen from "./screen/OTPScreen";
// import ForgetPassword from "./screen/ForgetPassword";
// import RegisterChild from "./screen/RegisterChild";
// import TestTwoScreen from "./screen/TestTwoScreen";
// import TestThreeScreen from "./screen/TestThreeScreen";
// import TestFourScreen from "./screen/TestFourScreen";
// import TestResult from "./screen/TestResult";
// import TestOneInitialScreen from "./screen/TestOneInitialScreen";
// import TestTwoInitialScreen from "./screen/TestTwoInitialScreen";
// import TestThreeInitialScreen from "./screen/TestThreeInitialScreen";
// import TestFourInitialScreen from "./screen/TestFourInitialScreen";
// import { AuthProvider } from "./Context";

// const Stack = createNativeStackNavigator();
// export default function Navigation({
//   navigation,
//   handleLogout,
//   isLoggedIn,
//   setIsLoggedIn,
// }) {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem("userToken");
//       token ? setIsLoading(true) : setIsLoading(false);
//       // token ? setIsLoggedIn(true) : setIsLoggedIn(false);
//     };
//     checkToken();
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isLoading ? (
//           <>
//             <Stack.Screen
//               name="HomeScreen"
//               options={{ headerShown: false }}
//               component={Homepage}
//             >
//               {/* {(props) => <Homepage {...props} logout={handleLogout} />} */}
//             </Stack.Screen>
//             <Stack.Screen
//               name="TestOneInitial"
//               component={TestOneInitialScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One Initial",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestOne"
//               component={TestOneScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestTwoInitial"
//               component={TestTwoInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestTwo"
//               component={TestTwoScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThreeInitial"
//               component={TestThreeInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThree"
//               component={TestThreeScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestFourInitial"
//               component={TestFourInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestFour"
//               component={TestFourScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="Result"
//               component={TestResult}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//           </>
//         ) : (
//           <>
//             <Stack.Screen
//               name="Onboarding"
//               component={OnboardingScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Signup"
//               component={SignupScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="ForgetPassword"
//               component={ForgetPassword}
//               options={{
//                 headerShown: true,
//                 title: "Forget Password",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="OTP"
//               component={OTPScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: null,
//                 headerBackVisible: false,
//                 title: "OTP Verification",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="RegisterChild"
//               component={RegisterChild}
//               options={{
//                 headerShown: true,
//                 title: "Register Child",
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestOneInitial"
//               component={TestOneInitialScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One Initial",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestOne"
//               component={TestOneScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestTwoInitial"
//               component={TestTwoInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestTwo"
//               component={TestTwoScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThreeInitial"
//               component={TestThreeInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThree"
//               component={TestThreeScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestFourInitial"
//               component={TestFourInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestFour"
//               component={TestFourScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="Result"
//               component={TestResult}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//           </>
//         )}
//         {/* {/* <Stack.Screen name="Home" options={{ headerShown: false }}>
//               {(props) => <Homepage {...props} logout={handleLogout} />}
//             </Stack.Screen>
//             <Stack.Screen
//               name="TestOneInitial"
//               component={TestOneInitialScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One Initial",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestOne"
//               component={TestOneScreen}
//               options={{
//                 headerShown: true,
//                 title: "Test One",
//                 headerTitleAlign: "center",
//               }}
//             />
//             <Stack.Screen
//               name="TestTwoInitial"
//               component={TestTwoInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestTwo"
//               component={TestTwoScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThreeInitial"
//               component={TestThreeInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestThree"
//               component={TestThreeScreen}
//               options={{
//                 headerShown: true,
//                 headerTitleAlign: "center",
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//             <Stack.Screen
//               name="TestFourInitial"
//               component={TestFourInitialScreen}
//               options={{
//                 headerShown: true,
//                 headerLeft: () => null,
//                 gestureEnabled: false,
//               }}
//             />
//           */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// //


import React, { useState, useEffect,useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { AuthContext } from "./Context";

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  
  const { setToken } = useContext(AuthContext);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const tokenn = await AsyncStorage.getItem("userToken");
  //     const neww = setToken(tokenn)
  //     console.log(neww)
  //     tokenn ? setIsLoading(  false) : setIsLoading(true)
  //     setIsLoading(!tokenn);
  //   };
  //   checkToken();
  // }, []);

   useEffect(() => {
     const checkTokenInAsyncStorage = async () => {
       try {
         const storedToken = await AsyncStorage.getItem("userToken");
         setToken(storedToken);
         console.log(storedToken)
          storedToken ? setIsLoading(false) : setIsLoading(true);
       } catch (error) {
         console.log("Error retrieving token from AsyncStorage:", error);
       }
     };

     checkTokenInAsyncStorage();
   }, []);

  return (
    <NavigationContainer>
      {isLoading ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}

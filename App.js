// import { StatusBar } from "expo-status-bar";
// import { ImageBackground, StyleSheet, Text, View } from "react-native";
// //#endregion
// import { useCallback } from "react";
// // import Onbording1 from "./screen/Onbording1";
// import Navigation from "./Navigation";
// import { useEffect, useState } from "react";
// import LoginScreen from "./screen/Auth/LoginScreen";
// import { ToastProvider } from "react-native-toast-notifications";
// import { AuthProvider } from "./Context";

// const image = require("./assets/splashscreen.jpeg");
// export default function App() {

//   return (
//     <View style={styles.container}>
//       <ToastProvider offsetBottom={40}>
//         <AuthProvider>
//           <Navigation />
//         </AuthProvider>
//       </ToastProvider>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",

//   },

//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });

import React, { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import Navigation from "./Navigation";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "./Context";
import Toast from "react-native-toast-message";
// import { SplashScreen } from "./screen/Auth/SplashScreen";

const image = require("./assets/logo2.jpeg");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onbording");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo2.jpeg")} style={styles.image} />
    </View>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    // "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    // "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto_Slab/static/RobotoSlab-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto_Slab/static/RobotoSlab-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    //    <View style={styles.container}>
    // //       <ToastProvider offsetBottom={40}>
    // //         <AuthProvider>
    // //           <Navigation />
    // //         </AuthProvider>
    // //       </ToastProvider>
    // //     </View>

    <View style={styles.container}>
      <AuthProvider>
        <Navigation />
        <Toast />
      </AuthProvider>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  // image: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
});


import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
//#endregion
import { useCallback } from "react";
// import Onbording1 from "./screen/Onbording1";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import LoginScreen from "./screen/Auth/LoginScreen";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "./Context";

const image = require("./assets/splashscreen.jpeg");
export default function App() {


  return (
    <View style={styles.container}>
      <ToastProvider offsetBottom={40}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ToastProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});

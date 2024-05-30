// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// import Navigation from './Navigation'
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up Appp.js totototi start working on your app!</Text>
//       <Navigation />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
//#endregion

import Onbording1 from "./screen/Onbording1";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import LoginScreen from "./screen/LoginScreen";

const image = require("./assets/splashscreen.jpeg");
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // width:'100%'
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },
});

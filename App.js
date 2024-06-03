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
import { useCallback } from "react";
import Onbording1 from "./screen/Onbording1";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import LoginScreen from "./screen/LoginScreen";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
const image = require("./assets/splashscreen.jpeg");
export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync(Entypo.font);

  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
    // if (appIsReady) {
    //   await SplashScreen.hideAsync();
    // }

  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }
  return (
    <View style={styles.container} >
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

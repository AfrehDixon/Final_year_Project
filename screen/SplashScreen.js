import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onbording"); // Navigate to the OnboardingScreen after 10 seconds
    }, 5000); // 10 seconds delay

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo2.jpeg")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red'
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;

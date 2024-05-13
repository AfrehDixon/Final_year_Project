import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Colors from "../config/Colors";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? Colors.background : "#808080";
  return (
    <View
      style={{
        height: 10,
        width: 10,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 10,
      }}
    />
  );
};

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginRight: 19,
    }}
    {...props}
  >
    <Text style={{ color: Colors.background }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      DotComponent={Dots}
      DoneButtonComponent={Done}
      bottomBarColor="#ffffff"
      controlStatusBar
      containerStyles={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.bluedemo,
        marginTop: -50,
      }}
      titleStyles={{ color: Colors.background, marginTop: -50 }}
      transitionAnimationDuration={500}
      // imageContainerStyles={ { alignItems: 'center' ,justifyContent:'center',marginBottom:0} }
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/bookreading2.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to LexAfriq",
          subtitle:
            "Empowering parents and educators to identify dyslexia early",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/education.png")}
              style={styles.image}
            />
          ),
          title: "Simple Assessment",
          subtitle:
            "Complete easy-to-follow assessments to evaluate reading, writing, and language skills ",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Colors from "../../config/Colors";

const Dots = ({ selected, backgroundColor = Colors.background }) => (
  <View>
    <View
      style={{
        height: 10,
        width: 10,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 10,
      }}
    />
    <StatusBar hidden={true} />
  </View>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginRight: 19,
    }}
    {...props}
  >
    <StatusBar hidden={true} />
    <Text style={{ color: Colors.background, fontSize: 18 }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate("RegisterChild")}
      DotComponent={Dots}
      DoneButtonComponent={Done}
      bottomBarColor="#ffffff"
      controlStatusBar
      containerStyles={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -50,
      }}
      transitionAnimationDuration={500}
      subTitleStyles={{ fontSize: 17 }}
      titleStyles={{
        fontSize: 30,
        color: Colors.background,
        fontWeight: "bold",
        marginTop: -50,
      }}
      SkipButtonComponent={(props) => (
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("Login")}
          {...props}
        >
          <Text style={{ color: Colors.background, fontSize: 18 }}>Skip</Text>
        </TouchableOpacity>
      )}
      NextButtonComponent={(props) => (
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("Login")}
          {...props}
        >
          <Text style={{ color: Colors.background, fontSize: 18 }}>Next</Text>
        </TouchableOpacity>
      )}
      pageIndexCallback={(index) => {
        console.log(index);
      }}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/bookreading2.png")}
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
              source={require("../../assets/education.png")}
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

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Colors from "../../config/Colors";

const Dots = ({ selected=true  }) => {
  let backgroundColor;
  backgroundColor = selected ? Colors.background : "#808080";
  return (
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
};

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
    // <View>
    // <StatusBar hidden={true} />
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      DotComponent={Dots}
      DoneButtonComponent={Done}
      bottomBarColor="#ffffff"
      controlStatusBar
      containerStyles={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -39,
      }}
      // titleStyles={{ color: Colors.background, marginTop: -50 }}
      transitionAnimationDuration={500}
      subTitleStyles={{
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        paddingHorizontal: 20,
      }}
      titleStyles={{
        fontSize: 22,
        color: Colors.background,
        fontWeight: "bold",
        marginTop: -30,
        fontFamily: "Poppins-Bold",
        // fontFamily: 'Poppins-Regular',
      }}
      SkipButtonComponent={(SkipButton) => (
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: Colors.background, fontSize: 18 }}>Skip</Text>
        </TouchableOpacity>
      )}
      NextButtonComponent={(Next) => (
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: Colors.background, fontSize: 18 }}>Next</Text>
        </TouchableOpacity>
      )}
      pageIndexCallback={(index) => {
        console.log(index);
      }}
      // imageContainerStyles={ { alignItems: 'center' ,justifyContent:'center',marginBottom:0} }
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              // source={require("../../assets/signupimage.jpg")}
              source={require("../../assets/welcome.jpg")}
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
              source={require("../../assets/ass.jpg")}
              style={styles.image}
            />
          ),
          title: "Simple Assessment",
          subtitle:
            "Complete easy-to-follow assessments to evaluate reading, writing, and language skills ",
        },
      ]}
    />
    // </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 300,
  },
});



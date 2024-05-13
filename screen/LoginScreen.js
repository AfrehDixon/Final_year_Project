import React, { useState } from "react";
import {
  // Button,
  // TextInput,
  // Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import AppInput from "../component/AppInput";
import AppButton from "../component/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
import OTPScreen from "./OTPScreen";
// import AppPicker from "../component/AppPicker";
// import CheckBox from "react-native-check-box";

export default function LoginScreen({ navigation }) {
  // const [cheked, isChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [role, setRole] = useState("parent");

  const handlelogin = ({ navigation }) => {
    // console.log(textinput);
    Alert.alert(password, email);
    console.log({ email, password });

    // navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.loginPage}>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.background,
              // fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Sign In To Your Account
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppInput
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            handleTextChange={(text) => setEmail(text)}
            icon="email"
            placeholder="Your email"
            value={email}
            id={email}
          />
          <AppInput
            keyboardType="default" // Changed to default keyboard type
            autoCapitalize="none"
            autoCorrect={false} // Corrected prop name
            textContentType="password"
            onChangeText={(text) => setPassword(text)} // Fixed typo in the function name
            secureTextEntry
            id={password}
            icon="lock"
            placeholder="Password"
            value={password}
          />

          {/* <AppPicker placeholder="Select Role" /> */}
        </View>

        <TouchableOpacity onPress={navigation.navigate("ForgetPassword")}>
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.background,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
          onPress={handlelogin}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-semiBold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.bluedemo,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons name="logo-google" color={"red"} size={Spacing * 2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginPage: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fff",
  },
});

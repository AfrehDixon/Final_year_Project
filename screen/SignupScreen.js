import React, { useState } from "react";
import {
  Button,
  // TextInput,
  // Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  // ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  TextInput,
  Text,
  //   TouchableWithFeedback,
  ActivityIndicator,
} from "react-native-paper";
// import AppInput from "../component/AppInput";
// import AppButton from "../component/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
// import AppPicker from "../component/AppPicker";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [confirmPassord, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";
const handlesignup = async () => {
  setError(""); // Reset error message

  if (!name || !email || !password) {
    setError("Please fill in all fields.");
    return;
  }
  setLoading(true);
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

      const data = await res.json();
      const {message} = data
    console.log(data);
    navigation.navigate("OTP", { email });

    // if (res.status === 200) {
    //   // Signup successful, navigate to OTP screen
    // } else  {
    //   // Specific validation errors from the backend
    //   setError(message);
    // }
    // else {
    //   // Generic server error
    //   setError(message);
    // }
    // else {
    //   // Handle any other unexpected status codes
    //   setError("An unexpected error occurred.");
    // }
  } catch (error) {
    // console.error("Signup error:", error);
    setError(message);
  } finally {
    setLoading(false);
  }
};

    
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.white,
      }}
    >
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
            Create account as Parent
          </Text>
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Create an account so you can explore!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <TextInput
              placeholder="UserName"
              value={name}
              onChangeText={setUsername}
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              autoCapitalize="none"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              width: "100%",
            }}
          >
            {/* <View style={{ marginTop: 10 }}></View> */}
            <TextInput
              placeholder=" Password"
              value={password}
              onChangeText={setPassword}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              style={{ width: "100%" }}
            />
            <TouchableWithoutFeedback
              onPress={() => setShowPassword(!showPassword)}
            >
              <View style={{ position: "absolute", right: 10 }}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              width: "100%",
            }}
          >
            {/* <View style={{ marginTop: 10 }}></View> */}
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassord}
              onChangeText={setconfirmPassword}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              style={{ width: "100%" }}
            />
            <TouchableWithoutFeedback
              onPress={() => setShowPassword(!showPassword)}
            >
              <View style={{ position: "absolute", right: 10 }}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}
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
            onPress={handlesignup}
            disabled={loading}
          >
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ActivityIndicator size="small" color="white" />
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Loading...
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                // fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Already have an account
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
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons name="logo-google" color={"red"} size={Spacing * 2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

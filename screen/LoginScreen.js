import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, Text, ActivityIndicator } from "react-native-paper";
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = "https://dyslexia-backend.onrender.com/api/v1/user";
  const handlelogin = async () => {
    setError(""); // Reset error message

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Set loading state

    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        // Check for backend error message
        setError(data.error);
      } else if (!data.verified) {
        // Check if user is not verified
        setError("Please check your inbox to verify your email.");
      } else {
        // If everything is successful, navigate to Home screen
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.loginPage}>
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
              marginVertical: Spacing * 3,
            }}
          >
            Sign In To Your Account
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 5,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="email-address"
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
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              passwordRules={8}
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
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword", { email })}
        >
          {error ? (
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
          ) : null}
          <Text
            style={{
              fontSize: FontSize.medium,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </TouchableOpacity>
        <View>
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
                Sign In
              </Text>
            )}
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
      </View>
      
    </View>
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
    input: {
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      height: 30,
    },
  });

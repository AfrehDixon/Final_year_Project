import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  // ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  TextInput,
  Text,
  //   TouchableWithFeedback,
  ActivityIndicator,
  PaperProvider,
} from "react-native-paper";
// import AppInput from "../component/AppInput";
// import AppButton from "../component/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
// import AppPicker from "../component/AppPicker";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  //  useEffect(() => {
  //    toast.show("Sign up page", {
  //      type: "success",
  //    });
  //  }, []);

  const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";

  const handlesignup = async () => {
    // }
    // setError("");
    setLoading(true);
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      // console.log(data.message);
      console.log(data);

      if (res.status === 400) {
        toast.show(data.error, {
          type: "danger",
          position: "top",
        });
        // setError(data.error);
        // navigation.replace("OTP", { email });
      } else {
        // await AsyncStorage.setItem("userToken", data.token); // Save token if needed
        navigation.replace("OTP", { email });
        toast.show(data.message, {
          type: "success",
          position: "top",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Signup error:", data.error);
      // setError(data.error);
      toast.show(data.error, {
        type: "danger",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PaperProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#fff",
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
                  marginVertical: Spacing * 2,
                }}
              >
                Create account as Parent
              </Text>
              <Text
                style={{
                  // fontFamily: Font["poppins-regular"],
                  fontSize: 13,
                  maxWidth: "80%",
                  textAlign: "center",
                }}
              >
                Create an account so you can explore!
              </Text>
            </View>
            <View
              style={{
                marginVertical: Spacing * 2,
              }}
            >
              <View style={{ marginBottom: 7.5 }}>
                <TextInput
                  placeholder="username"
                  value={name}
                  onChangeText={setUsername}
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    backgroundColor: Colors.lightPrimary,
                    height: 60,
                  }}
                  // right={<TextInput.Icon icon="eye" onPress={()=>setShowPassword(!showPassword)}/>}
                />
              </View>
              <View style={{ marginBottom: 7.5 }}>
                <TextInput
                  placeholder="email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  // leftIcon={{ type: "font-awesome", name: "envelope" }}
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    backgroundColor: Colors.lightPrimary,
                    height: 60,
                  }}
                />
              </View>

              <View
                style={{
                  // flexDirection: "row",
                  // alignItems: "center",
                  marginBottom: 7.5,
                  // width: "100%",
                }}
              >
                <TextInput
                  placeholder=" password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword1}
                  style={{
                    width: "100%",
                    backgroundColor: Colors.lightPrimary,
                    height: 60,
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword1 ? "eye-off" : "eye"}
                      onPress={() => setShowPassword1(!showPassword1)}
                      style={{ color: "black" }}
                    />
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 7.5,
                  width: "100%",
                }}
              >
                <TextInput
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChangeText={setconfirmPassword}
                  secureTextEntry={!showPassword2}
                  style={{
                    width: "100%",
                    backgroundColor: Colors.lightPrimary,
                    height: 60,
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword2 ? "eye-off" : "eye"}
                      onPress={() => setShowPassword2(!showPassword2)}
                      style={{ color: "black" }}
                    />
                  }
                />
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
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
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
                    color: Colors.background,
                    textAlign: "center",
                    fontSize: FontSize.medium,
                  }}
                >
                  Log in to your account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

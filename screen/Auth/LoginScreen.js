import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Platform,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TextInput, Text, ActivityIndicator } from "react-native-paper";
import AppInput from "../../component/AppInput";
import AppButton from "../../component/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

import Colors from "../../config/Colors";
import FontSize from "../../config/FontSize";
import Spacing from "../../config/Spacing";
import OTPScreen from "./OTPScreen";
import ForgetPassword from "./ForgetPassword";
import { AuthContext, UserContext } from "../../Context";

export default function LoginScreen({ navigation, setUserToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  // const {setUserToken} = route.params
  const toast = useToast();

 

  const { setToken } = useContext(AuthContext);



  const api = "https://dyslexia-backend.onrender.com/api/v1/user/signin";
  const handlelogin = async () => {
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setLoading(false); // Update loading state immediately
        return toast.show("Please enter both email and password.", {
          type: "danger",
        });
      }

      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (res.ok === true) {
        toast.show("Login successful", {
          type: "success",
          placement: "top",
        });

        // Move navigation outside of AsyncStorage operation
        navigation.navigate("RegisterChild", { token: data.token });

        try {
          await AsyncStorage.setItem("userToken", data.token);
          console.log(await AsyncStorage.getItem("userToken"));
        } catch (e) {
          toast.show("An error occurred", {
            type: "danger",
          });
        }
      } else if (!data.verified) {
        toast.show(data.error, {
          type: "danger",
        });
      } else {
        toast.show(data.error, {
          type: "danger",
        });
      }
    } catch (error) {
      toast.show("Network error", {
        type: "danger",
      });
    } finally {
      setLoading(false); // Ensure loading state is updated at the end
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.loginPage}>
        <View
          style={{
            padding: Spacing * 2,
            justifyContent: "center",
            flex: 1,
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
                fontWeight: "medium",
              }}
            >
              Sign In To Your Account
            </Text>
          </View>
          <View
            style={
              {
                // marginVertical: Spacing * 5,
              }
            }
          >
            <View style={{ marginBottom: 15 }}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                leftIcon={{ type: "font-awesome", name: "envelope" }}
                keyboardType="email-address"
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
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                width: "100%",
              }}
            >
              <TextInput
                placeholder=" Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{
                  width: "100%",
                  backgroundColor: Colors.lightPrimary,
                  height: 60,
                }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ color: "black" }}
                  />
                }
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword", { email })}
          >
            {error ? (
              <Text style={{ color: "red", marginBottom: 15, marginTop: 15 }}>
                {error}
              </Text>
            ) : null}
            <Pressable
              onPress={() => navigation.navigate("ForgetPassword")}
              style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
            >
              <Text
                style={{
                  fontSize: FontSize.medium,
                  color: Colors.primary,
                  alignSelf: "flex-end",
                  marginTop: 10,
                }}
              >
                Forgot your password ?
              </Text>
            </Pressable>

            {/* <ForgetPassword visible={modalVisible} onClose={closeModal} /> */}
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
                  fontSize: FontSize.medium,
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
                  <Ionicons
                    name="logo-google"
                    color={"red"}
                    size={Spacing * 2}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // width: "100%",
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

import React, { useState } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import {
  TextInput,
  // Text,
  ActivityIndicator,
  PaperProvider,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Checkbox from "expo-checkbox";
import * as Haptics from "expo-haptics";
import Colors from "../../config/Colors";
import FontSize from "../../config/FontSize";
import Spacing from "../../config/Spacing";
import Toast from "react-native-toast-message";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toast = useToast();

  const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";

  const handlesignup = async () => {
    // navigation.replace("OTP", { email });
    setError("");
    setLoading(true);
    try {
      if (!email || !password || !name || !password || !confirmPassword) {
        // setError("Please enter both email and password.");
           Toast.show({
             type: "error",
             text1: "Please enter all the fields.",
             // text2: "This is some something 👋",
           });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
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
      console.log(data);

      if (res.status === 400) {
        Toast.show({
          type: "error",
          text1: data.error,
          // text2: "This is some something 👋",
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        // setError(data.error);
      } else {
        Toast.show({
          type: "success",
          text1: data.message,
          // text2: "This is some something 👋",
        });
        console.log(data.message);
        navigation.replace("OTP", { email });
      }
    } catch (error) {
      // console.error("Network error");
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Network error",
        // text2: "This is some something 👋",
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  // const handlesignup = async () => {
  //   setError("");
  //   setLoading(true);
  //   if (!email || !password || !name || !confirmPassword) {
  //     return toast.show("Please enter all the fields.", {
  //       type: "danger",
  //     });
  //     setLoading(false);
  //   }
  //   try {
  //     const res = await fetch(api, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: name.trim(),
  //         email: email.trim(),
  //         password: password.trim(),
  //       }),
  //     });

  //     const data = await res.json();
  //     console.log(data);

  //     if (res.status === 400) {
  //       toast.show(data.error, {
  //         type: "danger",
  //         position: "top",
  //       });
  //       setError(data.error);
  //     } else {
  //       toast.show(data.message, {
  //         type: "success",
  //         position: "top",
  //         icon: "success",
  //       });
  //       navigation.replace("OTP", { email });
  //     }
  //   } catch (error) {
  //     console.error("Network error");
  //     setLoading(false);
  //     toast.show("Network error", {
  //       type: "danger",
  //       position: "top",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PaperProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: 20,
          }}
        >
          <View
            style={{
              padding: Spacing * 2,
              // backgroundColor: "red",
              // marginTop:5
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: Colors.background,
                  marginVertical: Spacing * 2,
                  fontFamily: "Roboto-Regular",
                }}
              >
                Create account as Parent
              </Text>
            </View>
            <View
              style={{
                marginVertical: Spacing * 2,
              }}
            >
              <View style={{ marginBottom: 7.5 }}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={"grey"}
                  value={name}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    height: 60,
                  }}
                />
              </View>
              <View style={{ marginBottom: 7.5 }}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={"grey"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    height: 60,
                  }}
                />
              </View>

              <View style={{ width: "100%" }}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={"grey"}
                  secureTextEntry={!showPassword1}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    height: 60,
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword1 ? "eye-off" : "eye"}
                      onPress={() => setShowPassword1(!showPassword1)}
                      style={{ color: "black" }}
                      size={17}
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
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChangeText={setconfirmPassword}
                  secureTextEntry={!showPassword2}
                  placeholderTextColor={"grey"}
                  placeholderTextStyle={'fontFamily: "Roboto-Regular"'}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    height: 60,
                    fontFamily: "Roboto-Regular",
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword2 ? "eye-off" : "eye"}
                      onPress={() => setShowPassword2(!showPassword2)}
                      style={{ color: "black" }}
                      size={17}
                    />
                  }
                />
              </View>
              {/* <View style={styles.checkboxContainer}>
                <Checkbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  color={rememberMe ? Colors.primary : undefined}
                />
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </View> */}

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
                      fontFamily: "Roboto-Regular",
                    }}
                  >
                    <ActivityIndicator size="small" color="white" />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                        fontFamily: "Roboto-Regular",
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
                      // fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: "Roboto-Regular",
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
                    color: Colors.background,
                    textAlign: "center",
                    fontSize: FontSize.medium,
                    fontFamily: "Roboto-Regular",
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

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxLabel: {
    marginLeft: 4,
    // fontSize: FontSize.large,
    fontSize: 15,
    color: Colors.text,
    fontFamily: "Roboto-Regular",
  },
});

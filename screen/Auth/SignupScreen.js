import React, { useState } from "react";
import {
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text
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

import Colors from "../../config/Colors";
import FontSize from "../../config/FontSize";
import Spacing from "../../config/Spacing";

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
        toast.show(data.error, {
          type: "danger",
          position: "top",
        });
        setError(data.error);
      } else {
        toast.show(data.message, {
          type: "success",
          position: "top",
        });
        console.log(data.message)
        navigation.replace("OTP", { email });
      }
    } catch (error) {
      console.error("Network error");
      setLoading(false);
      toast.show("Network error", {
        type: "danger",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  }

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
                  marginVertical: Spacing * 2,
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
                  placeholder="username"
                  value={name}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  style={{
                    width: "100%",
                    backgroundColor: Colors.lightPrimary,
                    height: 60,
                  }}
                />
              </View>
              <View style={{ marginBottom: 7.5 }}>
                <TextInput
                  placeholder="email"
                  value={email}
                  onChangeText={setEmail}
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
                  marginBottom: 7.5,
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
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  color={rememberMe ? Colors.primary : undefined}
                />
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </View>

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
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: FontSize.medium,
    color: Colors.text,
  },
});

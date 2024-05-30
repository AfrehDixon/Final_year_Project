import React, { useState } from "react";
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

  const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";

  const handlesignup = async () => {
    setError(""); // Reset error message
    setLoading(true);

    // try {
    // Email validation
    // const emailRegex = '!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/';
    // Set loading state
    //     if (!name || !email || !password || !confirmPassword) {
    //       setError("Please fill in all fields.");
    //     } else if (!/^[a-zA-Z ]*$/.test(name)) {
    //       setError("Invalid name format. Please enter a valid name.");
    //     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //       setError("Invalid email format. Please enter a valid email address.");
    //     } else if (password.length < 8) {
    //       setError(
    //         "Password is too short. Please enter a password with at least 8 characters."
    //       );
    //     } else (password !== confirmPassword) {
    //       setError("Passwords do not match");
    //     }
    //   }
    // }
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
      console.log(data.message);
      if (res.status !== 200) {
        // Signup successful, navigate to OTP screen
        // Check if the error message indicates that the email already exists
        if (data.message === "User with the provided email already exists") {
          setError(
            "User with this email already exists. Please use a different email."
          );
        } else {
          // await AsyncStorage.setItem("userToken", data.token); // Save token if needed
          navigation.replace("OTP", { email });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";
  // const handleSignup = async () => {
  //   setError(""); // Reset error message

  //   if (!name || !email || !password) {
  //   setError("Please fill in all fields.");
  //   return;
  // }
  //   setLoading(true); // Set loading state

  //   try {
  //      if (!(name && email && password)) {
  //        throw Error("Empty input fields!");
  //      } else if (!/^[a-zA-Z ]*$/.test(name)) {
  //        throw Error("Invalid name entered");
  //      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  //        throw Error("Invalid email entered");
  //      } else if (password.length < 8) {
  //        throw Error("Password is too short");
  //      } else if (password !== confirmPassord) {
  //         throw Error("Passwords do not match");
  //     }
  //      else {

  //     }

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

  //     if (res.status !== 200) {
  //       // Check if the error message indicates that the email already exists
  //       if (data.message === "User with the provided email already exists") {
  //         setError(
  //           "User with this email already exists. Please use a different email."
  //         );
  //       } else {
  //         // Handle other error messages
  //         setError(data.message || "An unexpected error occurred.");
  //       }
  //     } else {
  //       await AsyncStorage.setItem("userToken", data.token); // Save token if needed
  //       navigation.replace("Home");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     setError("An unexpected error occurred. Please try again later.");
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };
  // const handlesignup = async () => {
  //   setError(""); // Reset error message

  //   if (!name || !email || !password) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const res = await fetch(api, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         name,
  //       }),
  //     });

  //       const data = await res.json();
  //       const {message} = data
  //     console.log(data);
  //     navigation.navigate("OTP", { email });

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
  //   } catch (error) {
  //     // console.error("Signup error:", error);
  //     setError(message);
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
            backgroundColor: '#fff',
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
                    color: Colors.text,
                    textAlign: "center",
                    fontSize: FontSize.medium,
                  }}
                >
                  Log in to your account
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginVertical: Spacing * 2,
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
      </PaperProvider>
    </ScrollView>
  );
}

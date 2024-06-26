import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
  ScrollView,
  Keyboard,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import AppTextInput from "../component/AppInput"; // Adjust the import path
import AppButton from "../component/AppButton"; // Adjust the import path
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Colors from "../config/Colors";
import { Button, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Spacing } from "../config/Spacing";
// import { KeyboardAvoidingView } from "react-native-web";
// import {TextInput} from 'react-native-paper'

export default function ForgetPassword({ visible, onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOTP] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  // const email = useRoute().params.email;

  const searchEmail = async () => {
    const resetPasswordlink =
      "https://dyslexia-backend.onrender.com/api/v1/forgot_password/reset";

    try {
      const res = await fetch(resetPasswordlink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newpassword: newPassword,
          otp,
        }),
      });
      const data = await res.json();
      console.log(otp, newPassword);
    } catch (e) {
      console.log(e);
    }
  };

  const sendOtp = async () => {
    const optlink =
      "https://dyslexia-backend.onrender.com/api/v1/forgot_password";

    try {
      const res = await fetch(optlink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log("OTP Sent");
    } catch (e) {
      console.log(e);
    }
  };


  const handleOtpInput = (otp) => {
    setOTP(otp);
  };

  return (
   
     
        <View style={styles.modalContainer}>
          
            <View style={styles.content}>
              <SafeAreaView>
                <Text style={styles.head}>Forget Password</Text>
                <Text style={styles.title}>
                  Enter your email for the verification process.we will send 4
                  digits code to your email
                </Text>

                <View style={{ marginBottom: 20, width: "100%" }}>
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
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Continue
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  {/* <AppButton label="Continue" onPress={handleContinueEmail} /> */}
                </View>
              </SafeAreaView>
            </View>
     

            <View style={styles.content2}>
              <SafeAreaView>
                <Text style={styles.head}>Enter 5 Digits Code</Text>
                <Text style={styles.title}>
                  Enter the 4 digit code that you received on your email
                </Text>

                <KeyboardAvoidingView>
                  <OTPInputView
                    style={styles.otpInputView}
                    pinCount={4}
                    codeInputFieldStyle={styles.otpInputField}
                    codeInputHighlightStyle={styles.otpInputHighlight}
                    placeholderTextColor="gray"
                    keyboardType="number-pad"
                    onCodeChanged={handleOtpInput}
                  />
                  <View style={{ width: "100%" }}>
                    {/* <AppButton label="Continue" onPress={handleContinueOtp} /> */}
                  </View>
                </KeyboardAvoidingView>
                <Pressable onPress={sendOtp}>
                  <Text style={styles.resendOtpText}>Resend OTP</Text>
                </Pressable>
              </SafeAreaView>
            </View>
    
         
            <View style={styles.content}>
              <SafeAreaView>
                <Text style={styles.title}>Reset your password</Text>
                {/* <View style={styles.passwordInputContainer}> */}
                  <TextInput
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                    style={styles.textInput}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ color: "black" }}
                      />
                    }
                  />
                  
                
              </SafeAreaView>
            </View>
         
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
    
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 2,
    // justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    backgroundColor: "red",
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn: {
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
  },
  content: {
    // backgroundColor: "yellow",
    width: "100%",
    height: "70%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginBottom: 0,
  },
  content2: {
    backgroundColor: "white",
    width: "100%",
    height: 450,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    marginBottom: 40,
    color: "#ccccc",
  },
  // otpInputView: {
  //   width: "100%",
  //   height: 200,
  //   paddingHorizontal: 32,
  // },
  // otpInputField: {
  //   width: 50,
  //   height: 55,
  //   color: "#f4a135",
  //   borderWidth: 0,
  //   borderBottomWidth: 3,
  //   borderBottomColor: "#111",
  // },
  // otpInputHighlight: {
  //   borderColor: Colors.success,
  // },
  otpContainer: {
    width: "100%",
    paddingHorizontal: 22,
    borderBottomColor: Colors.success,
  },
  otpInputView: {
    width: "100%",
    height: 200,
    paddingHorizontal: 32,
    borderBottomColor: Colors.success,
    // borderColor: Colors.success,
    // borderWidth: 1,
  },
  otpInputField: {
    width: 50,
    height: 55,
    color: Colors.success,
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 3,
    borderRadius: 8,
    // borderColor: "red",
    borderBottomWidth: 3,
    borderBottomColor: Colors.success,
  },
  otpInputHighlight: {
    borderColor: "red",
    // padding:20,
    // width: 30,
  },
  resendOtpText: {
    color: "red",
    marginTop: 5,
    fontSize: 15,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // width: "100%",
  },
  textInput: {
    width: "90%",
    backgroundColor: "white",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "red",
    fontSize: 18,
  },
});

// export default ForgetPassword;

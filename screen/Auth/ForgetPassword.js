import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppTextInput from "../../component/AppInput";
import AppButton from "../../component/AppButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Colors from "../../config/Colors";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useRoute } from "@react-navigation/native";
// import forget from "../../assets/forget.png";
import * as Haptics from "expo-haptics";

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOTP] = useState("");
  const [showotp, setShowotp] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  // const image1 = require();
  // const toast = useToast();

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
          newPassword,
          otp,
        }),
      });
      const data = await res.json();
      if (res.status === 400) {
        Toast.show({
          type: "error",
          text1: data.error,
          // text2: "Login Error.👋",
        });
        navigation.navigate("Login");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "Password Reset Sucsessfull",
          // text2: "Login Error.👋",
        });
        navigation.navigate("Login");
        // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      console.log(e);
      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const sendOtp = async () => {
    const optlink =
      "https://dyslexia-backend.onrender.com/api/v1/forgot_password";
    setShowotp(!showotp);

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
      setShowotp(!showotp);

      Toast.show({
        type: "success",
        text1: "OTP sent to email",
        // text2: "Login Error.👋",
      });
      // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      console.log(e);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleOtpInput = (otp) => {
    setOTP(otp);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.modalContainer}>
          <View
            style={{
              justifyContent: "center",
              alignItems: " center",
              backgroundColor: "white",
              marginTop: 145,
            }}
          >
            {showotp ? (
              <View style={styles.content}>
                <Text style={styles.head}>Forget Password</Text>
                <Image
                  source={require("../../assets/forget.png")}
                  style={styles.image}
                />
                <Text style={styles.title1}>
                  Enter your email for the verification process.we will send 4
                  digits code to your email.
                </Text>

                <View
                  style={{
                    // marginBottom: 10,
                    width: "100%",
                  }}
                >
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    leftIcon={{ type: "font-awesome", name: "envelope" }}
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
                  <AppButton label="Continue" onPress={sendOtp} />
                </View>
              </View>
            ) : (
              <View style={styles.content}>
                <Text style={styles.head}>Enter 4 Digits Code</Text>
                <Image
                  source={require("../../assets/codepic.png")}
                  style={styles.image}
                />
                <Text style={styles.title1}>
                  Enter the 4 digit code that was sent to your email
                </Text>

                <OTPInputView
                  style={styles.otpInputView}
                  pinCount={4}
                  codeInputFieldStyle={styles.otpInputField}
                  codeInputHighlightStyle={styles.otpInputHighlight}
                  placeholderTextColor="gray"
                  keyboardType="number-pad"
                  onCodeChanged={handleOtpInput}
                />
                <View style={{ width: "80%" }}>
                  <AppButton
                    label="Confirm OTP"
                    onPress={() => setModalVisible(true)}
                  />
                </View>

                <Pressable onPress={sendOtp}>
                  <Text style={styles.resendOtpText}>Resend OTP</Text>
                </Pressable>
              </View>
            )}

            <View style={styles.container}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer2}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Image
                      source={require("../../assets/codepic.png")}
                      style={styles.image}
                    />

                    <TextInput
                      placeholder="New Password"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor={"grey"}
                      style={styles.textInput}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? "eye-off" : "eye"}
                          onPress={() => setShowPassword(!showPassword)}
                          style={{ color: "black" }}
                        />
                      }
                    />
                    <TextInput
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor={"grey"}
                      style={styles.textInput}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? "eye-off" : "eye"}
                          onPress={() => setShowPassword(!showPassword)}
                          style={{ color: "black" }}
                        />
                      }
                    />

                    {error ? (
                      <Text style={styles.errorText}>{error}</Text>
                    ) : null}

                    <View style={{ width: "90%" }}>
                        <ActivityIndicator />
                      <AppButton label="Reset Password" onPress={searchEmail}>
                      </AppButton>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    // backgroundColor: "red",
  },
  modalBackground: {
    // flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title1: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  modalContainer2: {
    width: 350,
    height: 800,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    // width: "100%",
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom:100,

    alignItems: "center",
    // backgroundColor: " yellow",
  },
  title: {
    fontSize: 15,
    marginBottom: 40,
    color: "#ccccc",
  },
  otpContainer: {
    width: "100%",
    // paddingHorizontal: 22,
    borderBottomColor: Colors.success,
  },
  otpInputView: {
    width: "100%",
    height: 200,
    paddingHorizontal: 32,
    borderBottomColor: Colors.success,
  },
  otpInputField: {
    width: 50,
    height: 55,
    color: Colors.success,
    fontWeight: "bold",
    fontSize: 20,
    borderWidth: 3,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: Colors.success,
  },
  otpInputHighlight: {
    borderColor: "red",
  },

  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    width: "90%",
    backgroundColor: "white",
    marginBottom: 20,
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

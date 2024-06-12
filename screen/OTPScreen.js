import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  // TouchableWithoutFeedback
} from "react-native";
import Colors from "../config/Colors";
import { useRoute } from "@react-navigation/native";
// import OTPInputView from "@twotalltotems/react-native-otp-input";
import AppButton from "../component/AppButton";
import { Button, ActivityIndicator } from "react-native-paper";
import Spacing from "../config/Spacing";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useToast } from "react-native-toast-notifications";


export default function OTPScreen({ navigation }) {
  const route = useRoute();
  const { email } = route.params;
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const toast = useToast();

  useEffect(() => {
    toast.show("OTP sent to your email", {
      type: "success",
      position: "top",
    });
  }, []);

  const handleOtpInput = (otp) => {
    setOTP(otp);
    setOtpSent(true);
  };

  const optlink =
    "https://dyslexia-backend.onrender.com/api/v1/forgot_password";
  const sendOtp = async () => {
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
      // console.log("OTP Sent");
      toast.show(" New OTP sent to your email", {
        type: "success",
        position: "top",
      });
      setOtpSent(true);
    } catch (e) {
      console.log(e);
    }
  };

  const OTP =
    "https://dyslexia-backend.onrender.com/api/v1/email_verification/verify";
  const handleOTP = async () => {
    if (!otp) {
      // setMessage("OTP empty");
      toast.show("OTP empty", {
        type: "danger",
        position: "top",
      });
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      const data = await res.json();
      const { verified, token } = data;
      console.log(res);
      toast.show("User Verified", {
        type: "success",
        position: "top",
      });
      // const { ok } = data;
      console.log(data);
      console.log(email, otp);
      console.log(data.verified);
      if (res.ok === true) {
        setError(false);
        navigation.navigate("Login", { token });
      } else {
        setError(true);
        setLoading(false);
        // setMessage(data.error);
        toast.show(data.error, {
          type: "danger",
          position: "top",
        });
        console.log(data.error);
      }

      // console.log(data)
    } catch (e) {
      console.log(e);
      toast.show("Invalid OTP", {
        type: "danger",
        position: "top",
      });
      setLoading(false);
      // setError(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.keyboardAvoidingView}
        > */}
          <View style={styles.innerContainer}>
            <Image
              source={require("../assets/codepic.png")}
              style={styles.image}
            />
            <Text style={styles.title}>Verify your email address</Text>
            <Text style={styles.subtitle}>
              Enter 4 digits code received on your email
            </Text>
            <Text style={styles.emailText}>{email}</Text>

            <View style={styles.otpContainer}>
              <OTPInputView
                style={styles.otpInputView}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.otpInputField}
                codeInputHighlightStyle={styles.otpInputHighlight}
                placeholderTextColor="gray"
                keyboardType="number-pad"
                onCodeChanged={handleOtpInput}
              />

              {/* {error ? (
              <Text style={{ color: "red", marginTop: 10 }}>
                Invalid OTP. Please try again.
              </Text>
            ) : null} */}
              {/* <TouchableOpacity style={styles.submitButton} onPress={handleOTP}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  padding: Spacing * 2,
                  backgroundColor: Colors.background,
                  marginVertical: Spacing * -3,
                  borderRadius: Spacing,
                  shadowColor: Colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: Spacing,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: Spacing,
                }}
                onPress={handleOTP}
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
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
              {/* {error && <Text style={{ color: "red" }}>{message}</Text>} */}

              <Pressable onPress={sendOtp}>
                <Text style={{ color: "blue", marginTop: 50, fontSize: 15 }}>
                  Resend OTP
                </Text>
                {/* <Text> */}
              
                {/* </Text> */}
              </Pressable>
              {/* <Button label="Send OTP" onPress={sendOtp} /> */}
              {error && <Text style={{ color: "red" }}>{message}</Text>}
            </View>
          </View>
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // backgroundColor: "blue",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: "#111",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#111",
    marginBottom: 10,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#111",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    width: "100%",
    paddingHorizontal: 22,
    borderBottomColor: Colors.success,
    // backgroundColor: 'red',
    marginTop: -10,
  },
  otpInputView: {
    width: "100%",
    height: 200,
    paddingHorizontal: 32,
    marginTop: -60,
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
  submitButton: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
  },
});

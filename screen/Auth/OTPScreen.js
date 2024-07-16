import React, { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useToast } from "react-native-toast-notifications";
import Colors from "../../config/Colors";
import Spacing from "../../config/Spacing";
import Toast from "react-native-toast-message";

export default function OTPScreen({ navigation }) {
  const route = useRoute();
  const { email } = route.params;
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const [email, setemail]= useState('afreh')

  useEffect(() => {
    toast.show("OTP sent to your email", {
      type: "success",
      position: "top",
    });
  }, []);

  const handleOtpInput = (otp) => {
    setOTP(otp);
  };

  const sendOtp = async () => {
    try {
      await fetch(
        "https://dyslexia-backend.onrender.com/api/v1/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      toast.show("New OTP sent to your email", {
        type: "success",
        position: "top",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleOTP = async () => {
    if (!otp) {
      toast.show("OTP empty", {
        type: "danger",
        position: "top",
      });
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://dyslexia-backend.onrender.com/api/v1/email_verification/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        navigation.navigate("Login", { token: data.token });
      } else {
        toast.show(data.error, {
          type: "danger",
          position: "top",
        });
      }
    } catch (e) {
      console.log(e);
      toast.show("Invalid OTP", {
        type: "danger",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/codepic.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Verify your email address</Text>
          <Text style={styles.subtitle}>
            Enter 4 digits code received on your email
          </Text>
          {/* <Text style={styles.emailText}>{email}</Text> */}
          <View style={styles.otpContainer}>
            <OTPInputView
              style={styles.otpInputView}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.otpInputField}
              onCodeChanged={handleOtpInput}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleOTP}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Loading..." : "Submit"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendOtp} style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
  },
  otpInputView: {
    width: "100%",
    height: 130,
    paddingHorizontal: 32,
    marginTop: -10,
    // backgroundColor:'red'
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
    // borderBottomColor: Colors.success,
  },
  submitButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendButton: {
    // marginTop: 50,
  },
  resendButtonText: {
    color: "blue",
    fontSize: 15,
  },
});

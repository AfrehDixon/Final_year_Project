import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import AppTextInput from "../component/AppInput";
import AppButton from "../component/AppButton";
import AppInput from "../component/AppInput";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Colors from "../config/Colors";
import { TouchableOpacity } from "react-native-web";

export default function ForgetPassword() {
  const [newpassword, setnewpassword] = useState("");
  const [otp, setOTP] = useState("");
  const route = useRoute();
  const { email } = route.params;

  const searchEmail = async () => {
    // console.log("Searching email");
    const resetPasswordlink =
      "https://dyslexia-backend.onrender.com/api/v1/forgot_password/reset";

    try {
      const res = await fetch(resetPasswordlink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // email,
          newpassword,
          otp,
        }),
      });
      const data = await res.json();
      console.log(otp, newpassword);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOtpInput = (otp) => {
    setOTP(otp);
  };

  // sending otp automatically

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
      console.log("OTP Sent");
    } catch (e) {
      console.log(e);
    }
    // sendOtp();
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", paddingHorizontal: 22 }}>
        <View>
          <Text
            style={{ fontSize: 20, textAlign: "center", paddingBottom: 21 }}
          >
            <Text style={{ fontSize: 20, paddingBottom: 15 }}>
              Enter the OTP sent to{" "}
              <Text style={{ color: "red" }}>{email}</Text> and you new password
            </Text>
            {/* {email} */}
          </Text>
        </View>
        <OTPInputView
          style={{ width: "100%", height: 200, paddingHorizontal: 32 }}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={{
            width: 30,
            height: 45,
            color: "#f4a135",
            borderWidth: 0,
            borderBottomWidth: 3,
            borderBottomColor: "#111",
          }}
          codeInputHighlightStyle={{
            borderColor: Colors.success,
          }}
          // onCodeFilled={code => {
          //   setOTP(code);
          // }}
          placeholderTextColor="gray"
          keyboardType="number-pad"
          // code={otp}
          onCodeChanged={handleOtpInput}
        />
        <AppInput
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          handleTextChange={(text) => setnewpassword(text)}
          icon="lock"
          placeholder="New Password"
          value={newpassword}
          id={newpassword}
        />

        <AppButton label="Reset Password" onPress={searchEmail} />
      </View>
      <AppButton label="Send OTP" onPress={sendOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
});

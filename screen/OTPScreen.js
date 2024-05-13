// import { View, Text } from 'react-native'
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
export default function OTPScreen() {
  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          style={{
            height: "100%",
            width: "100%",
            background: "#fff",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 25, color: "#111" }}>Verify E-mail</Text>
            <Text style={{ fontSize: 15, color: "#111" }}>
              Enter 4 digits code received on your email
            </Text>

            <View style={{ width: "100%", paddingHorizontal: 22 }}>
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
                  borderColor: "#2ab12f",
                }}
                onCodeFilled={(code) => {
                  console.log(`Code is ${code}`);
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#342342",
                  paddingVertical: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  paddingVertical: 16,
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 10,
                }}
              >
                <Text>Wrong Phone Number ? </Text>3
                <TouchableOpacity
                  onPress={() =>
                    console.log("navigate to the phone number screen")
                  }
                >
                  <Text style={{ fontSize: 15, color: "#342342" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

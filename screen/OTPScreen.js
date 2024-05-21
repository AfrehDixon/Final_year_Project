// // import { View, Text } from 'react-native'
// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   Image,
//   SafeAreaView,
// } from "react-native";
// import Colors from "../config/Colors";
// import { useRoute } from "@react-navigation/native";

// import OTPInputView from "@twotalltotems/react-native-otp-input";
// import AppButton from "../component/AppButton";



// export default function OTPScreen() {
//   const route = useRoute();
//   const { email } = route.params;
//   const [otp, setOTP] = useState("");
//   // const [error, setError] = useState(false);
//   // const [success, setSuccess] = useState(false);
//   // const [loading, setLoading] = useState(false);
//   const handleOtpInput = (otp) => {
//     setOTP(otp);
//   };

//    const optlink =
//      "https://dyslexia-backend.onrender.com/api/v1/forgot_password";
//    const sendOtp = async () => {
//      try {
//        const res = await fetch(optlink, {
//          method: "POST",
//          headers: {
//            "Content-Type": "application/json",
//          },
//          body: JSON.stringify({
//            email,
//          }),
//        });
//        console.log("OTP Sent");
//      } catch (e) {
//        console.log(e);
//      }
//      // sendOtp();
//    };

//   const OTP =
//     "https://dyslexia-backend.onrender.com/api/v1/email_verification/verify";
//   const handleOTP = async () => {
//     //  if (otp.length < 4) {
//     //    setError(true);
//     //    return;
//     //  }
//     //  setLoading(true);
//     try {
//       const res = await fetch(OTP, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//         }),
//       });
//       console.log(email,otp);
//        if (res.valid === "true") {
//        setSuccess(true);
//        setError(false);
//       navigation.navigate("Login");
//        } else {
//        setError(true);
//        setSuccess(false);
//        }
//     } catch (e) {
//     //   console.log(e);
//       //  setError(true);
//     }
//     //  setLoading(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS == "ios" ? "padding" : ""}
//         style={{
//           height: "100%",
//           width: "100%",
//           background: "#fff",
//         }}
//       >
//         <View style={{ flex: 1, alignItems: "center" }}>
//           <Image
//             source={require("../assets/codepic.png")}
//             style={{ width: 200, height: 200 }}
//           />
//           <Text style={{ fontSize: 25, color: "#111" }}>
//             Verify your email address
//           </Text>
//           <Text style={{ fontSize: 15, color: "#111" }}>
//             Enter 4 digits code received on your email
//           </Text>
//           <Text style={{ fontSize: 16, color: "#111", marginTop: 14 }}>
//             {email}
//           </Text>

//           <View style={{ width: "100%", paddingHorizontal: 22 }}>
//             <OTPInputView
//               style={{ width: "100%", height: 200, paddingHorizontal: 32 }}
//               pinCount={4}
//               autoFocusOnLoad
//               codeInputFieldStyle={{
//                 width: 30,
//                 height: 45,
//                 color: "#f4a135",
//                 borderWidth: 0,
//                 borderBottomWidth: 3,
//                 borderBottomColor: "#111",
//               }}
//               codeInputHighlightStyle={{
//                 borderColor: Colors.success,
//               }}
//               // onCodeFilled={code => {
//               //   setOTP(code);
//               // }}
//               placeholderTextColor="gray"
//               keyboardType="number-pad"
//               // code={otp}
//               onCodeChanged={handleOtpInput}
//             />
//             <TouchableOpacity
//               style={{
//                 backgroundColor: Colors.background,
//                 paddingVertical: 12,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: 8,
//                 paddingVertical: 16,
//               }}
//               onPress={handleOTP}
//             >
//               <Text style={{ color: "white", fontSize: 20 }}> Submit</Text>
//             </TouchableOpacity>
//             <AppButton label="Send OTP" onPress={sendOtp} />
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   borderStyleBase: {
//     width: 30,
//     height: 45,
//   },

//   borderStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },

//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//   },

//   underlineStyleHighLighted: {
//     borderColor: "#03DAC6",
//   },
// });


import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import Colors from "../config/Colors";
import { useRoute } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import AppButton from "../component/AppButton";

export default function OTPScreen() {
  const route = useRoute();
  const { email } = route.params;
  const [otp, setOTP] = useState("");

  const handleOtpInput = (otp) => {
    setOTP(otp);
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
      console.log("OTP Sent");
    } catch (e) {
      console.log(e);
    }
  };

  const OTP =
    "https://dyslexia-backend.onrender.com/api/v1/email_verification/verify";
  const handleOTP = async () => {
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
      console.log(email, otp);
      if (res.valid === "true") {
        setSuccess(true);
        setError(false);
        navigation.navigate("Login");
      } else {
        setError(true);
        setSuccess(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}
      >
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
            <TouchableOpacity style={styles.submitButton} onPress={handleOTP}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <AppButton label="Send OTP" onPress={sendOtp} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
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
    height: 200,
    paddingHorizontal: 32,
  },
  otpInputField: {
    width: 30,
    height: 45,
    color: "#f4a135",
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: "#111",
  },
  otpInputHighlight: {
    borderColor: Colors.success,
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

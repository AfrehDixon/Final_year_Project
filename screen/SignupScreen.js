import React, { useState,useEffect } from "react";
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
import { useToast } from "react-native-toast-notifications";


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

  const toast = useToast();

  //  useEffect(() => {
  //    toast.show("Sign up page", {
  //      type: "success",
  //    });
  //  }, []);

  const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";

  const handlesignup = async () => {
    // }
    // setError("");
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
      // console.log(data.message);
      console.log(data);

      if (res.status === 400) {
        toast.show(data.error, {
          type: "danger",
          position: "top",
        });
        // setError(data.error);
        // navigation.replace("OTP", { email });
      } else {
        // await AsyncStorage.setItem("userToken", data.token); // Save token if needed
        navigation.replace("OTP", { email });
        toast.show(data.message, {
          type: "success",
          position: "top",
          icon :"success"
        });
      }
    } catch (error) {
      console.error("Signup error:", data.error);
      // setError(data.error);
      toast.show(data.error, {
        type: "danger",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };



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
                    color: Colors.background,
                    textAlign: "center",
                    fontSize: FontSize.medium,
                  }}
                >
                  Log in to your account
                </Text>
              </TouchableOpacity>

              {/* <View
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
              </View> */}
            </View>
          </View>
        </View>
      </PaperProvider>
    </ScrollView>
  );
}

// import React, { useState } from "react";
// import {
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import {
//   TextInput,
//   Text,
//   ActivityIndicator,
//   PaperProvider,
// } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import Colors from "../config/Colors";
// import FontSize from "../config/FontSize";
// import Spacing from "../config/Spacing";

// const SignupScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [showPassword1, setShowPassword1] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const api = "https://dyslexia-backend.onrender.com/api/v1/user/signup";

//   const handleSignup = async (values, { setSubmitting, setErrors }) => {
//     try {
//       const response = await fetch(api, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: values.name.trim(),
//           email: values.email.trim(),
//           password: values.password.trim(),
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//       console.log(response);

//       if (response.status === 400) {
//         setErrors({ general: data.error });
//         navigation.replace("OTP", { email });
//       } else {
//         // await AsyncStorage.setItem("userToken", data.token); // Save token if needed
//         navigation.replace("OTP", { email });
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setErrors({
//         general: data.error,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <PaperProvider>
//         <View style={styles.container}>
//           <View style={styles.content}>
//             <View style={styles.header}>
//               <Text style={styles.title}>Create account as Parent</Text>
//               {/* <Text style={styles.subtitle}>
//                 Create an account so you can explore!
//               </Text> */}
//             </View>

//             <Formik
//               initialValues={{
//                 name: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={Yup.object().shape({
//                 name: Yup.string()
//                   .matches(/^[a-zA-Z ]*$/, "Invalid name entered")
//                   .required("Name is required"),
//                 email: Yup.string()
//                   .email("Invalid email entered")
//                   .required("Email is required"),
//                 password: Yup.string()
//                   .min(8, "Password is too short")
//                   .required("Password is required"),
//                 confirmPassword: Yup.string()
//                   .oneOf([Yup.ref("password"), null], "Passwords do not match")
//                   .required("Confirm password is required"),
//               })}
//               onSubmit={handleSignup}
//             >
//               {({
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 values,
//                 errors,
//                 touched,
//                 isSubmitting,
//               }) => (
//                 <View>
//                   <TextInput
//                     placeholder="username"
//                     value={values.name}
//                     onChangeText={handleChange("name")}
//                     onBlur={handleBlur("name")}
//                     style={styles.input}
//                     error={touched.name && errors.name}
//                   />
//                   {touched.name && errors.name && (
//                     <Text style={styles.errorText}>{errors.name}</Text>
//                   )}

//                   <TextInput
//                     placeholder="email"
//                     value={values.email}
//                     onChangeText={handleChange("email")}
//                     onBlur={handleBlur("email")}
//                     keyboardType="email-address"
//                     style={styles.input}
//                     error={touched.email && errors.email}
//                   />
//                   {touched.email && errors.email && (
//                     <Text style={styles.errorText}>{errors.email}</Text>
//                   )}

//                   <TextInput
//                     placeholder="password"
//                     value={values.password}
//                     onChangeText={handleChange("password")}
//                     onBlur={handleBlur("password")}
//                     secureTextEntry={!showPassword1}
//                     style={styles.input}
//                     error={touched.password && errors.password}
//                     right={
//                       <TextInput.Icon
//                         icon={showPassword1 ? "eye-off" : "eye"}
//                         onPress={() => setShowPassword1(!showPassword1)}
//                         style={{ color: "black" }}
//                       />
//                     }
//                   />
//                   {touched.password && errors.password && (
//                     <Text style={styles.errorText}>{errors.password}</Text>
//                   )}

//                   <TextInput
//                     placeholder="confirm password"
//                     value={values.confirmPassword}
//                     onChangeText={handleChange("confirmPassword")}
//                     onBlur={handleBlur("confirmPassword")}
//                     secureTextEntry={!showPassword2}
//                     style={styles.input}
//                     error={touched.confirmPassword && errors.confirmPassword}
//                     right={
//                       <TextInput.Icon
//                         icon={showPassword2 ? "eye-off" : "eye"}
//                         onPress={() => setShowPassword2(!showPassword2)}
//                         style={{ color: "black" }}
//                       />
//                     }
//                   />
//                   {touched.confirmPassword && errors.confirmPassword && (
//                     <Text style={styles.errorText}>
//                       {errors.confirmPassword}
//                     </Text>
//                   )}

//                   {errors.general && (
//                     <Text style={styles.errorText}>{errors.general}</Text>
//                   )}

//                   <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleSubmit}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: 10,
//                         }}
//                       >
//                         <ActivityIndicator size="small" color="white" />
//                         <Text
//                           style={{
//                             color: "white",
//                             fontSize: 16,
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Loading...
//                         </Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.buttonText}>Sign Up</Text>
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </Formik>

//             <TouchableOpacity
//               onPress={() => navigation.navigate("Login")}
//               style={styles.loginLink}
//             >
//               <Text style={styles.loginText}>Log in to your account</Text>
//             </TouchableOpacity>

//             <View style={styles.socialContainer}>
//               <Text style={styles.socialText}>Or continue with</Text>
//               <View style={styles.socialIcons}>
//                 <TouchableOpacity style={styles.socialButton}>
//                   <Ionicons
//                     name="logo-google"
//                     color={"red"}
//                     size={Spacing * 2}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </PaperProvider>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   content: {
//     padding: Spacing * 2,
//   },
//   header: {
//     alignItems: "center",
//   },
//   title: {
//     fontSize: FontSize.xLarge,
//     color: Colors.background,
//     marginVertical: Spacing * 2,
//   },
//   subtitle: {
//     fontSize: 13,
//     maxWidth: "80%",
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     backgroundColor: Colors.lightPrimary,
//     height: 60,
//     marginBottom: 7.5,
//   },
//   button: {
//     padding: Spacing * 2,
//     backgroundColor: Colors.background,
//     marginVertical: Spacing * 3,
//     borderRadius: Spacing,
//     shadowColor: Colors.primary,
//     shadowOffset: {
//       width: 0,
//       height: Spacing,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: Spacing,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   loginLink: {
//     padding: Spacing,
//   },
//   loginText: {
//     color: Colors.text,
//     textAlign: "center",
//     fontSize: FontSize.medium,
//   },
//   socialContainer: {
//     marginVertical: Spacing * 2,
//   },
//   socialText: {
//     color: Colors.primary,
//     textAlign: "center",
//     fontSize: FontSize.small,
//   },
//   socialIcons: {
//     marginTop: Spacing,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   socialButton: {
//     padding: Spacing,
//     backgroundColor: Colors.gray,
//     borderRadius: Spacing / 2,
//     marginHorizontal: Spacing,
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
// });

// export default SignupScreen;

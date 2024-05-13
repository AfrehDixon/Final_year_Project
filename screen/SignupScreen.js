import React, { useState } from "react";
import {
  Button,
  TextInput,
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppInput from "../component/AppInput";
import AppButton from "../component/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
// import AppPicker from "../component/AppPicker";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [forgetpass, setForgetpass] = useState(false);
  // const handlesignup = ({navigation}) => {
  // 	// Alert.alert( confirmPassword, password )
  // 	navigation.navigate('Home')

  // }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.white,
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
              marginVertical: Spacing * 3,
            }}
          >
            Create account as Parent
          </Text>
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Create an account so you can explore!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppInput
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            onChangeText={(e) => setUsername(e)}
            icon="account"
            placeholder="UserName"
            value={username}
            id={username}
          />
          <AppInput
            keyboardType="email-address" // Corrected prop name
            autoCapitalize="none"
            textContentType="emailAddress" // Corrected value
            onChangeText={(text) => setEmail(text)} // Fixed typo in the function name
            icon="email"
            placeholder="Your email"
            value={email}
          />
          <AppInput
            keyboardType="default" // Changed to default keyboard type
            autoCapitalize="none"
            autoCorrect={false} // Corrected prop name
            textContentType=" password"
            onChangeText={(password) => setPassword(password)} // Fixed typo in the function name
            secureTextEntry
            icon="lock"
            placeholder="Password"
            value={password}
          />
          <AppInput
            keyboardType="default" // Changed to default keyboard type
            autoCapitalize="none"
            autoCorrect={false} // Corrected prop name
            textContentType="password"
            onChangeText={(password) => setconfirmPassword(password)} // Fixed typo in the function name
            secureTextEntry
            icon="lock"
            placeholder="Password"
            value={confirmPassword}
          />
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
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              // fontFamily: Font["poppins-regular"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign up
          </Text>
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
              fontSize: FontSize.small,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
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
              <Ionicons name="logo-google" color={"red"} size={Spacing * 2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../../config/Colors";
import AppButton from "../../component/AppButton";
import { Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { RadioButton, ActivityIndicator } from "react-native-paper";
import Spacing from "../../config/Spacing";
import Toast from "react-native-toast-message";

const RegisterChild = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState("");
  const [childName, setChildName] = useState("");
  const [gender, setGender] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(["Female", "Male"]);

  const toast = useToast();

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleRegisterChild = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setLoading(true);

    if (!childName || !selectedAge || !gender || !childGrade) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
        // text2: "This is some something 👋",
      });
      setLoading(false);
    }

    const registerchildlink =
      "https://dyslexia-backend.onrender.com/api/v1/user/register-child";
    try {
      const res = await fetch(registerchildlink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
        body: JSON.stringify({
          name: childName,
          age: selectedAge,
          grade: 4,
          gender: gender,
        }),
      });

      const data = await res.json();
      console.log(data);

      Toast.show({
        type: "success",
        text1: "Child registration Successful",
        // text2: "This is some something 👋",
      });

      try {
        const child = await AsyncStorage.setItem("child", JSON.stringify(data));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error Registering Child",
        // text2: "This is some something 👋",
      });
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>Register Your Child</Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              placeholder="Name"
              value={childName}
              onChangeText={setChildName}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="default"
              autoCapitalize="none"
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 60,
              }}
            />
          </View>
          <View style={{ marginBottom: 20, flexDirection: "row", gap: 4 }}>
            <TextInput
              placeholder="Age"
              value={selectedAge}
              onChangeText={setSelectedAge}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="number-pad"
              autoCapitalize="none"
              style={{
                width: "49%",
                backgroundColor: "white",
                height: 60,
              }}
            />
            <TextInput
              placeholder="Grade"
              value={childGrade}
              onChangeText={setChildGrade}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="number-pad"
              autoCapitalize="none"
              style={{
                width: "50%",
                backgroundColor: "white",
                height: 60,
              }}
            />
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton.Group
              onValueChange={handleGenderChange}
              value={gender}
            >
              <View style={styles.radioButtonItem}>
                <RadioButton value="male" />
                <Text>Male</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton value="female" />
                <Text>Female</Text>
              </View>
            </RadioButton.Group>
          </View>
          <Button title="Next" onPress={() => navigation.navigate("Home")} />

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
            onPress={handleRegisterChild}
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
                Register Child
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  radioButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor:'red'
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.background,
  },
  selectedButtonText: {
    color: Colors.white,
  },
  ageContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  ageOption: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  ageText: {
    fontSize: 18,
    color: "black",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 30,
  },
  selected: {
    backgroundColor: "blue",
    color: "white",

    // Change color for selected option
    // Change color for selected option
  },
  // input: {
  //   width: "80%",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 20,
  // },
  registerButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default RegisterChild;

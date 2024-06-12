import React, { useState } from "react";
import {
  View,
  // Text,
  // TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Colors from "../config/Colors";
import AppButton from "../component/AppButton";
import { Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";


const RegisterChild = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState("");
  const [childName, setChildName] = useState("");
  const [gender, setgender] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // const handleAgeSelection = (age) => {
  //   setSelectedAge(age);
  // };

  const handleRegisterChild = async () => {
    const token = await AsyncStorage.getItem("userToken");

    // console.log("Registered Child: ", { age: selectedAge, name: childName });

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

      toast.show("Child Registered Successfully", {
        type: "success",
        position: "top",
      });
      // const { age, name, parent, grade } = data;
      // console.log(age, name, parent, grade);
      // const text = await res.text();

      // console.log("Raw response:", text); // Log the raw response
      // const result = JSON.parse(text);
      // console.log(res);
      try {
        const child = await AsyncStorage.setItem("child", JSON.stringify(data));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      toast.show("Error Registering Child", {
        type: "danger",
        position: "top",
      });
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
              placeholder="child's name"
              value={childName}
              onChangeText={setChildName}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              keyboardType="default"
              autoCapitalize="none"
              style={{
                width: "100%",
                backgroundColor: Colors.lightPrimary,
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
                backgroundColor: Colors.lightPrimary,
                height: 60,
              }}
            />
            <TextInput
              placeholder="Gender"
              value={gender}
              onChangeText={setgender}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              // keyboardType=""
              autoCapitalize="none"
              style={{
                width: "50%",
                backgroundColor: Colors.lightPrimary,
                height: 60,
              }}
            />
          </View>

          {/* Age Selection */}
          {/* <View style={styles.ageContainer}>
          <TouchableOpacity
            style={[styles.ageOption, selectedAge === 5 && styles.selected]}
            onPress={() => handleAgeSelection(5)}
          >
            <Text
              style={[
                styles.ageText,
                selectedAge === 5 && styles.selectedButtonText,
              ]}
            >
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ageOption, selectedAge === 6 && styles.selected]}
            onPress={() => handleAgeSelection(6)}
          >
            <Text
              style={[
                styles.ageText,
                selectedAge === 6 && styles.selectedButtonText,
              ]}
            >
              6
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ageOption, selectedAge === 7 && styles.selected]}
            onPress={() => handleAgeSelection(7)}
          >
            <Text
              style={[
                styles.ageText,
                selectedAge === 7 && styles.selectedButtonText,
              ]}
            >
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ageOption, selectedAge === 8 && styles.selected]}
            onPress={() => handleAgeSelection(8)}
          >
            <Text
              style={[
                styles.ageText,
                selectedAge === 8 && styles.selectedButtonText,
              ]}
            >
              8+
            </Text>
          </TouchableOpacity>
        </View> */}
          <AppButton label="Register" onPress={handleRegisterChild} />
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
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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

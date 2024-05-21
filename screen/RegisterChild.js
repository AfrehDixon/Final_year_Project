import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../config/Colors";


const RegisterChild = ({navigation}) => {
  const [selectedAge, setSelectedAge] = useState(null);
    const [childName, setChildName] = useState("");
    const [childGrade, setChildGrade] = useState("");

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleRegisterChild = async () => {
    // Perform registration logic here, using selectedAge and childName
    console.log("Registered Child: ", { age: selectedAge, name: childName });
      // You can perform any further actions here, like sending data to backend, etc.
      const registerchildlink = "https://dyslexia-backend.onrender.com/api/v1/child";
      try {
        const res = await fetch(registerchildlink, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: childName,
            age: selectedAge,
            parentId: "66435f87bb456c37f2760a73",
            grade: childGrade,
          }),
        });
        const data = await res.json();
          console.log(data);
          // Navigate to some screen on success
          navigation.navigate("Home");
      } catch (e) {
        console.log(e);
      }


  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Your Child</Text>

      <TextInput
        value={childName}
        onChangeText={setChildName}
        placeholder="Child's Name"
        style={styles.input}
      />

      <TextInput
        value={childGrade}
        onChangeText={setChildGrade}
        placeholder="Child's Grade"
        style={styles.input}
      />

      {/* Age Selection */}
      <View style={styles.ageContainer}>
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
      </View>

      {/* Child Name Input */}

      {/* Register Button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegisterChild}
      >
        <Text style={styles.buttonText}>Register Child</Text>
      </TouchableOpacity>
    </View>
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
    },
    selectedButtonText: {
      color: Colors.white
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
  selected: {
    backgroundColor: "blue",
    color: "white",

    // Change color for selected option
    // Change color for selected option
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
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

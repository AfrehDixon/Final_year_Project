import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { IconButton, Button } from "react-native-paper";


const TestThreeInitialScreen = ({ navigation }) => {
  const route = useRoute();
  const { FinalArrayPass } = route.params;
  const handleStartTest = () => {
    navigation.navigate("TestThree", { FinalArrayPass });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconButton icon="information" size={50} style={styles.icon} />
        <Text style={styles.iconText}>Test Three</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.divider} />
        <Text style={styles.heading}>Instructions</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>You will see a scramble of 5 letter words</Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>
            Your task is to identify and click on the letter provided below that
            will make the word complete
          </Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>
            You will have 40 seconds to complete this part of the test.
          </Text>
        </View>
      </View>

      <Button mode="contained" style={styles.button} onPress={handleStartTest}>
        Start Test
      </Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: -300,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  benefit: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
  },
  icon: {
    marginRight: 10,
    color: "red",
  },
  button: {
    backgroundColor: "#0c195c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
};
export default TestThreeInitialScreen;

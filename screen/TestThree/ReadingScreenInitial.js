import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton, Button } from "react-native-paper";

const ReadingScreenIntial = ({ navigation }) => {
  const handleStartTest = () => {
    navigation.navigate("CaptureVideo");
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
          <Text>
            You will see a passage of text on the screen. Your task is to read
          </Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>
            Press the Start icon to start recording while you read and Stop to
            Stop recording when you are done reading.
          </Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>Click on the Next button to Preview the recorded video</Text>
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

export default ReadingScreenIntial;

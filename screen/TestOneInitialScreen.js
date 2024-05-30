import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton, Button } from "react-native-paper";



const TestOneInitialScreen = ({ navigation }) => {
  const handleStartTest = () => {
    navigation.navigate("TestOne");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconButton icon="information" size={50} style={styles.icon} />
        <Text style={styles.iconText}>Test One</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.divider} />
        <Text style={styles.heading}>Instructions:</Text>
        <View style={styles.divider} />
        <Text style={styles.instructionText}>
          Solve the test by selecting all the letter "b" in the 5 by 5 grid.
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.section}>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>Better understanding of your learning profile.</Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>Improved reading and writing skills.</Text>
        </View>
        <View style={styles.benefit}>
          <IconButton icon="check" size={20} style={styles.icon} />
          <Text>Enhanced cognitive abilities.</Text>
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
    padding: 20,
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
  },
  icon: {
    marginRight: 10,
    color: "red",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
};

export default TestOneInitialScreen;

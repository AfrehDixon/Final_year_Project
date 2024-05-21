import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TestTwoScreen = () => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [score, setScore] = useState(0);

  const handleLetterPress = (letter) => {
    // Convert letter to number and update state
    const letterToNumber = { E: 1, F: 2 };
    const selectedNumber = letterToNumber[letter];
    setSelectedLetters([...selectedLetters, selectedNumber]);

    // Check if the selected letter is "E"
    if (letter === "E") {
      // Increment the score
      setScore(score + 10);
    } else {
      // Decrement the score (penalize for incorrect selection)
      setScore(score - 5);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select only "E" from the list</Text>
      {[
        ["F", "E", "F", "E"],
        ["F", "E", "F", "E"],
        ["F", "E", "F", "E"],
        ["E", "F", "E", "F"],
        ["E", "F", "E", "F"],
        ["E", "F", "E", "F"],
      ].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={styles.button}
              onPress={() => handleLetterPress(letter)}
            >
              <Text>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {/* Display selected letters (for testing) */}
      <Text>Selected Letters: {selectedLetters.join(", ")}</Text>
      {/* Display user's score */}
      <Text>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
});

export default TestTwoScreen;

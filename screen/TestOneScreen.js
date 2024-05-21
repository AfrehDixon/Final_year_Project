import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TestOneScreen = () => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [score, setScore] = useState(0);

  const handleLetterPress = (letter) => {
    // Convert letter to number and update state
    const letterToNumber = { b: 1, d: 2, q: 3, p: 4 };
    const selectedNumber = letterToNumber[letter];
    setSelectedLetters([...selectedLetters, selectedNumber]);

    // Check if the selected letter is "p"
    if (letter === "p") {
      // Increment the score
      setScore(score + 10);
    } else {
      // Decrement the score (penalize for incorrect selection)
      setScore(score - 5);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select only "p" from the list</Text>
      {[
        ["d", "b", "p", "q"],
        ["d", "q", "p", "b"],
        ["d", "q", "b", "p"],
        ["b", "q", "d", "p"],
        ["b", "p", "q", "d"],
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

export default TestOneScreen;

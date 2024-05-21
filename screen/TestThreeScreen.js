import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WORDS = ["apple", "banana", "orange", "grape", "melon"]; // Example valid words

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

const TestThreeScreen = () => {
  const [scrambledWord, setScrambledWord] = useState(getRandomWord());

  const handleShuffle = () => {
    setScrambledWord(getRandomWord());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{scrambledWord}</Text>
      <TouchableOpacity onPress={handleShuffle} style={styles.button}>
        <Text style={styles.buttonText}>Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TestThreeScreen;

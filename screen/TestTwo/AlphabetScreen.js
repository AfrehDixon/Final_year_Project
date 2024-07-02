import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";

// const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabets = "AbCdEfGHIJKlMNOpQRSTUVWXYZ".split("");
const getRandomAlphabets = (count) => {
  const shuffled = alphabets.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const generateRandomLetters = (count) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomLetters = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomLetters.push(alphabet[randomIndex]);
  }

  return randomLetters;
};

const AlphabetScreen = ({ navigation }) => {
  const [currentAlphabet, setCurrentAlphabet] = useState("");
  const [alphabetIndex, setAlphabetIndex] = useState(0);
  const [randomAlphabets, setRandomAlphabets] = useState(getRandomAlphabets(5));
  const [images, setImages] = useState([]);

  const [letters, setLetters] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const randomLetters = generateRandomLetters(5);
    setLetters(randomLetters);
  }, []);

  const handleCapture = () => {
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
    navigation.navigate("Capture");
  };

  useEffect(() => {
    if (images.length === randomAlphabets.length) {
      navigation.navigate("Result");
    }
  }, [images]);

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>{letters[currentLetterIndex]}</Text>

      <Button mode="contained" style={styles.button} onPress={handleCapture}>
        Capture Alphabet
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  alphabet: {
    fontSize: 100,
    marginBottom: 20,
    color: "#333",
  },
  letter: {
    fontSize: 120,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default AlphabetScreen;

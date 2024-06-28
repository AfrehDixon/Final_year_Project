import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

  //   const letters = () => {
  //     setCurrentAlphabet(randomAlphabets[alphabetIndex]);
  //   };

  //   letters();

  const [letters, setLetters] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  useEffect(() => {
    const randomLetters = generateRandomLetters(5); // Generates 5 random letters
    setLetters(randomLetters);
  }, []);

  const handleCapture = () => {
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
    navigation.navigate(
      "Capture"
      //   {
      //   alphabet: randomAlphabets[alphabetIndex],
      //   images,
      //   setImages,
      //   alphabetIndex,
      //   setAlphabetIndex,
      //   randomAlphabets,
      // }
    );
  };

  useEffect(() => {
    if (images.length === randomAlphabets.length) {
      navigation.navigate("Result");
    }
  }, [images]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.alphabet}>{currentAlphabet}</Text> */}
      <Text style={styles.letter}>{letters[currentLetterIndex]}</Text>
      <Button title="Capture" onPress={handleCapture} />
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
});

export default AlphabetScreen;

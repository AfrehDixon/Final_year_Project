import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomAlphabets = (count) => {
  const shuffled = alphabets.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const AlphabetScreen = ({ navigation }) => {
  const [currentAlphabet, setCurrentAlphabet] = useState("");
  const [alphabetIndex, setAlphabetIndex] = useState(0);
  const [randomAlphabets, setRandomAlphabets] = useState(getRandomAlphabets(5));
  const [images, setImages] = useState([]);

   const letters =  useEffect(() => {
      setCurrentAlphabet(randomAlphabets[alphabetIndex]);
   }, [alphabetIndex]);
    
    letters


  const handleCapture = () => {
    
    navigation.navigate(
      "Capture"
      //       {
      //   alphabet: randomAlphabets[alphabetIndex],
      //   images,
      //   setImages,
      //   alphabetIndex,
      //   setAlphabetIndex,
      //   randomAlphabets,
      //       }
    );
  };

  useEffect(() => {
    if (images.length === randomAlphabets.length) {
      navigation.navigate("Result");
    }
  }, [images]);

  return (
    <View style={styles.container}>
      <Text style={styles.alphabet}>{currentAlphabet}</Text>
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

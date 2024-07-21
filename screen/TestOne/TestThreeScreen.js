

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const words = [
  ["w", "h", "o"],
  ["m", "a", "n", "y"],
  ["s", "a", "w"],
  ["d", "o", "n", "e"],
  ["l", "a", "u", "g", "h"],
  ["p", "e", "o", "p", "l", "e"],
  ["w", "i", "t", "h"],
  ["d", "o", "e", "s"],
  ["s", "a", "i", "d"],
  ["g", "r", "a", "i", "n"],
  ["t", "h", "e", "i", "r"],
  ["l", "e", "m", "o", "n"],
  ["t", "i", "g", "e", "r"],
  ["c", "l", "o", "c", "k"],
  ["g", "l", "a", "s", "s"],
  ["b", "r", "i", "c", "k"],
  ["s", "t", "o", "n", "e"],
];

const TestThreeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(words[0]);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timer, setTimer] = useState(25);
  const [timerId, setTimerId] = useState(null);
  const route = useRoute();
  const { FinalArrayPass } = route.params;

  const navigateToNext = () => {
    const TestThree = [hits, clicks, misses, score, accuracy, missRate];
    const TestThreeArray = [...FinalArrayPass, TestThree];
    const FinalArrayPassThree = [...FinalArrayPass, ...TestThreeArray[14]];
    navigation.navigate("TestFourInitial", { FinalArrayPassThree });
    console.log(FinalArrayPassThree);
  };

  const onStart = () => {
    setTimerId(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000)
    );
  };

  const onStop = () => {
    clearInterval(timerId);
  };

  useEffect(() => {
    onStart();
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timer < 1) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  useEffect(() => {
    setWord(words[index]);
    setOptions(generateOptions(words[index]));
  }, [index]);



  const generateOptions = (word) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const correctLetter = word[word.length - 1];
    const options = new Set([correctLetter]);
    while (options.size < 3) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      options.add(randomLetter);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleSelect = (letter) => {
    setClicks(clicks + 1);
    if (letter === word[word.length - 1]) {
      setScore(score + 1);
      setHits(hits + 1);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 1000);
    } else {
      setMisses(misses + 1);
    }
  };

  const accuracy = hits + misses > 0 ? hits / clicks : 0;
  const missRate = clicks > 0 ? misses / clicks : 0;

  return (
    <View style={styles.container}>
      <View style={styles.wordGrid}>
        {word.slice(0, -1).map((letter, idx) => (
          <View key={idx} style={styles.gridItem}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        ))}
        <View style={styles.gridItemEmpty}>
          <Text style={styles.letter}>_</Text>
        </View>
      </View>
      <View style={styles.optionsGrid}>
        {options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionButton}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
  

      <View style={styles.scoreContainer}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={styles.score}>Hits : {clicks}</Text>
        </View>
        <View
          style={{
            // borderWidth: 2,
            borderColor: "green",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              flexDirection: "row",
              backgroundColor: "white",
            }}
          >
            <Text style={styles.timer}>00</Text>
          </View>
          <View
            style={{
              // borderWidth: 2,
              // borderColor:''
              // borderColor: "green",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              flexDirection: "row",
              backgroundColor: "white",
            }}
          >
            <Text style={styles.timer}>{timer}</Text>
          </View>
        </View>
        {/* <CountDown
          until={16}
          size={20}
          onFinish={() => navigateToNext}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "MM", s: "SS" }}
        /> */}
      </View>
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
  wordGrid: {
    flexDirection: "row",
    marginBottom: 20,
  },
  gridItem: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7ac18a",
    borderRadius: 5,
  },
  gridItemEmpty: {
    backgroundColor: "#ffdde8",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
  },
  letter: {
    fontSize: 32,
    color: "#fff",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#4682B4",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 40,
    height: 50,
    textAlign: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  stats: {
    marginTop: 20,
  },
  statText: {
    fontSize: 18,
    marginVertical: 5,
  },
  timer: {
    fontSize: 24,
    marginTop: 20,
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  score: {
    fontSize: 24,
    color: "green",
  },
  timer: {
    fontSize: 24,
    padding: 10,
    color: "green",
    // marginTop: 10,
  },
});

export default TestThreeScreen;

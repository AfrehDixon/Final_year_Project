import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const words = [
  ["h", "o", "u", "s", "e"],
  ["t", "a", "b", "l", "e"],
  ["c", "h", "a", "i", "r"],
  ["b", "r", "e", "a", "d"],
  ["w", "a", "t", "e", "r"],
  ["s", "h", "e", "e", "p"],
  ["f", "r", "u", "i", "t"],
  ["c", "a", "m", "e", "l"],
  ["c", "h", "a", "l", "k"],
  ["g", "r", "a", "i", "n"],
  ["b", "e", "a", "c", "h"],
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
  const [message, setMessage] = useState("");
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  // const [missRate, setMissRate] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const route = useRoute();
  const { FinalArrayPass } = route.params;

  const navigateToNext = () => {
    const TestThree = [hits, clicks, misses, score, accuracy, missRate];
    const TestThreeArray = [...FinalArrayPass, TestThree];
    const FinalArrayPassThree = [...FinalArrayPass, ...TestThreeArray[14]];
    navigation.navigate("TestFourInitial", { FinalArrayPassThree });
    console.log(FinalArrayPassThree);
    // console.log(TestThree);
  };
  const onStart = () => {
    setTimerId(
      setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
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
    if (timer > 40) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  useEffect(() => {
    setWord(words[index]);
    setOptions(generateOptions(words[index][4]));
  }, [index]);

  useEffect(() => {
    if (timer > 41) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  const generateOptions = (correctLetter) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const options = new Set([correctLetter]);
    while (options.size < 4) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      options.add(randomLetter);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleSelect = (letter) => {
    setClicks(clicks + 1);
    if (letter === word[4]) {
      setMessage("Correct!");
      setScore(score + 1);
      setHits(hits + 1);
      setTimeout(() => {
        setMessage("");
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 1000);
    } else {
      setMessage("Try Again!");
      setMisses(misses + 1);
    }
  };
  const accuracy = hits + misses > 0 ? hits / clicks : 0;
  const missRate = clicks > 0 ? misses / clicks : 0;

  return (
    <View style={styles.container}>
      <View style={styles.wordGrid}>
        {word.slice(0, 4).map((letter, idx) => (
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
      <View style={styles.stats}>
        <Text style={styles.statText}>Clicks: {clicks}</Text>
      </View>
      <View>
        <Text style={styles.timer}>Time: {timer}</Text>
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
    // backgroundColor: "#4682B4",
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
    margin:5
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
    textAlign: 'center'
  },
  optionText: {
    color: "#fff",
    fontSize: 20,
    textAlign:'center'
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
  message: {
    marginTop: 20,
    fontSize: 24,
    color: "green",
  },
});

export default TestThreeScreen;

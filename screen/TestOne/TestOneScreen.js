import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../config/Colors";

const TestOneScreen = () => {
  const navigation = useNavigation();
  const charArray = ["q", "d", "p", "b"];
  const [letter, setLetter] = useState([
    "q",
    "b",
    "p",
    "q",
    "p",
    "b",
    "d",
    "d",
    "p",
    "q",
    "b",
    "d",
    "p",
    "q",
    "d",
    "p",
    "q",
    "b",
    "q",
    "p",
    "b",
    "d",
    "d",
    "p",
    "q",
    "d",
    "p",
    "q",
  ]);
  const [timerId, setTimerId] = useState();
  const [timer, setTimer] = useState(0);
  const [hits, setHits] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);

  const navigateToNext = () => {
    const stateArray = [1, 7, hits, clicks, misses, hits, accuracy, missRate];
    navigation.navigate("TestTwoInitial", { stateArray });
    console.log(stateArray);
  };

  const onStart = () => {
    setTimerId(
      setInterval(() => {
        setTimer((state) => state + 1);
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

  const updateValues = (index) => {
    if (letter[index] === "b") {
      setHits(hits + 1);
    } else {
      setMisses(misses + 1);
    }
    setClicks(clicks + 1);
  };

  const getRandomChar = () => {
    let arr = new Array(25);
    for (let i = 0; i < letter.length; i++) {
      arr[i] = charArray[Math.floor(Math.random() * charArray.length)];
    }
    return arr;
  };

  const handleClick = (index) => {
    updateValues(index);
    const randomChar = getRandomChar();
    setLetter(randomChar);
  };

  useEffect(() => {
    if (timer > 15) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  const accuracy = hits + misses > 0 ? hits / clicks : 0;
  const missRate = clicks > 0 ? misses / clicks : 0;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {letter.map((char, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={() => handleClick(index)}
          >
            <Text style={styles.letter}>{char}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Number of clicks : {clicks}</Text>
        <Text style={styles.timer}>Timer: {timer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "20%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    margin: 5,
    borderRadius: 5,
  },
  letter: {
    fontSize: 24,
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  score: {
    fontSize: 24,
  },
  timer: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default TestOneScreen;

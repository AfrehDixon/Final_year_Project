import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const TestScreenTwo = ({ navigation }) => {
  const route = useRoute();
  const charArray = ["q", "d", "p", "b"];
  const [hits, setHits] = useState(0);
  const [letter, setLetter] = useState([
    // "E",
    // "E",
    // "E",
    // "E",
    "E",
    "E",
    "E",
    "E",
    "F",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    // "E",
    // "E",
    // "E",
    // "E",
    // "E",
    // "E",
    // "E",
    // "E",
  ]);
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);
  const [score, setScore] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState(0);
  const { stateArray } = route.params;
  // const [stateArray, setStateArray] = useState(route.params.startArray);

  const navigateToNext = () => {
    const TestTwo = [hits, clicks, misses, hits, accuracy, missRate];
    const TestTwoArray = [...stateArray, TestTwo];
    const FinalArrayPass = [...stateArray, ...TestTwoArray[8]];
    navigation.navigate("TestThreeInitial", { FinalArrayPass });
    console.log(FinalArrayPass);
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
    if (timer > 15) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  const updateValues = (index) => {
    if (letter[index] === "F") {
      setHits((prevHits) => prevHits + 1);
      setScore((prevScore) => prevScore + 1);
    } else {
      setMisses((prevMisses) => prevMisses + 1);
    }
    setClicks((prevClicks) => prevClicks + 1);
  };

  const getRandomIndex = () => {
    const indexValue = Math.floor(Math.random() * 16);
    let arr = [...letter];
    arr[letter.indexOf("F")] = "E";
    arr[indexValue] = "F";
    return arr;
  };

  const handleClick = (index) => {
    updateValues(index);
    const randomIndex = getRandomIndex();
    setLetter(randomIndex);
  };

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
      <View>
        <Text style={styles.clicks}>Clicks: {clicks}</Text>

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
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    margin: 3,
    borderRadius: 5,
  },
  letter: {
    fontSize: 24,
  },
  score: {
    fontSize: 24,
    marginTop: 10,
  },
  hits: {
    fontSize: 24,
    marginTop: 10,
  },
  misses: {
    fontSize: 24,
    marginTop: 10,
  },
  clicks: {
    fontSize: 24,
    marginTop: 10,
  },
  accuracy: {
    fontSize: 24,
    marginTop: 10,
  },
  missRate: {
    fontSize: 24,
    marginTop: 10,
  },
  timer: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default TestScreenTwo;

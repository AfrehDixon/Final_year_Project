import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const TestFourScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { FinalArrayPassThree } = route.params;

  const correctWords = [
    // "yam",
    "rice",
    "fish",
    "ball",
    "pen",
    "book",
    "dog",
    "cat",
    "sun",
    "tree",
    "hat",
    "bed",
    "car",
    "cup",
    "bag",
    "shoe",
  ];

  const extraLetters = [
    "s",
    "z",
    "y",
    "r",
    "k",
    "m",
    "n",
    "p",
    "w",
    "x",
    "q",
    "v",
    "u",
    "f",
    "c",
    "j",
    "h",
    "g",
    "d",
    "b",
  ];

  const [currentWord, setCurrentWord] = useState([]);
  const [currentCorrectWord, setCurrentCorrectWord] = useState(correctWords[0]);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [index, setIndex] = useState(0);
  const [timerId, setTimerId] = useState();
  const [timer, setTimer] = useState(25);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setCurrentWord(insertExtraLetter(correctWords[0], extraLetters[0]));
  }, []);

  const insertExtraLetter = (word, extraLetter) => {
    const randomIndex = Math.floor(Math.random() * (word.length + 1));
    const wordArray = word.split("");
    wordArray.splice(randomIndex, 0, extraLetter);
    return wordArray;
  };

  const navigateToNext = () => {
    const TestFour = [hits, clicks, misses, score, accuracy, missRate];
    const TestFourArray = [...FinalArrayPassThree, TestFour];
    const data = [...FinalArrayPassThree, ...TestFourArray[20]];
    navigation.navigate("Result", { data });
    // const FinalData = JSON.stringify({
    //   data,
    // });

    // console.log(data);
    // console.log(data);
    // SendResults(FinalData);
  };

  const onStart = () => {
    setTimerId(
      setInterval(() => {
        setTimer((state) => state - 1);
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

  const handleClick = (letter) => {
    setClicks(clicks + 1);
    if (!currentCorrectWord.includes(letter)) {
      setScore(score + 1);
      setHits(hits + 1);
    } else {
      setMisses(misses + 1);
    }
    if (index < correctWords.length - 1) {
      const nextIndex = index + 1;
      setCurrentCorrectWord(correctWords[nextIndex]);
      setCurrentWord(
        insertExtraLetter(correctWords[nextIndex], extraLetters[nextIndex])
      );
      setIndex(nextIndex);
    } else {
      () => navigation.navigate("Result");
    }
  };

  useEffect(() => {
    if (timer < 1) {
      onStop();
      navigateToNext();
    }
  }, [timer]);

  const accuracy = hits + misses > 0 ? hits / clicks : 0;
  const missRate = clicks > 0 ? misses / clicks : 0;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {currentWord.map((char, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={() => handleClick(char)}
          >
            <Text style={styles.letter}>{char}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.scoreContainer}> */}
      {/* <Text style={styles.score}>Score: {score}</Text> */}
      {/* <Text style={styles.score}>Hits: {hits}</Text> */}
      {/* <Text style={styles.score}>Misses: {misses}</Text> */}
      {/* <Text style={styles.score}>Clicks: {clicks}</Text> */}
      {/* <Text style={styles.score}>Accuracy: {accuracy.toFixed(1)}</Text> */}
      {/* <Text style={styles.score}>Miss Rate: {missRate.toFixed(1)}</Text> */}
      {/* <Text style={styles.timer}>Time: {timer}</Text> */}
      {/* <TouchableOpacity onPress={navigateToNext}> */}
      {/* <Text>Next</Text> */}
      {/* </TouchableOpacity> */}
      {/* </View> */}
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
    // backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
  },
  box: {
    // width: "15%",
    width: 50,
    height: 60,
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
    padding: 10,
    textAlign: "center",
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  score: {
    fontSize: 24,
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

export default TestFourScreen;

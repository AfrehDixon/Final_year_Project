import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Colors from "../../config/Colors";
import CountDown from "react-native-countdown-component";

const TestOneScreen = () => {
  //   const navigation = useNavigation();
  //   const charArray = ["q", "d", "p", "b"];
  //   const [letter, setLetter] = useState([
  //     // "q",
  //     // "b",
  //     // "p",
  //     // "q",
  //     "b",
  //     "b",
  //     "d",
  //     "d",
  //     "p",
  //     "q",
  //     "b",
  //     "d",
  //     "b",
  //     "q",
  //     "d",
  //     "p",
  //     "b",
  //     "b",
  //     "b",
  //     "p",
  //     // "b",
  //     // "d",
  //     // "d",
  //     // "p",
  //     // "q",
  //     // "d",
  //     // "p",
  //     // "q",
  //   ]);
  //   const [timerId, setTimerId] = useState();
  //   const [timer, setTimer] = useState(0);
  //   const [hits, setHits] = useState(0);
  //   const [clicks, setClicks] = useState(0);
  //   const [misses, setMisses] = useState(0);

  //   const navigateToNext = () => {
  //     const stateArray = [1, 7, hits, clicks, misses, hits, accuracy, missRate];
  //     navigation.replace("TestTwoInitial", { stateArray });
  //     console.log(stateArray);
  //   };

  //   const getRandomColor = () =>
  //     `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  //   const onStart = () => {
  //     setTimerId(
  //       setInterval(() => {
  //         setTimer((state) => state + 1);
  //       }, 1000)
  //     );
  //   };

  //   const onStop = () => {
  //     clearInterval(timerId);
  //   };

  //   useEffect(() => {
  //     onStart();
  //     return () => clearInterval(timerId);
  //   }, []);

  //   const updateValues = (index) => {
  //     if (letter[index] === "b") {
  //       setHits(hits + 1);
  //       // styles.bom.backgroundColor = "red";
  //       // styles.bom .backgroundColor= 'red';
  //     } else {
  //       setMisses(misses + 1);
  //     }
  //     setClicks(clicks + 1);
  //   };

  //   const getRandomChar = () => {
  //     let arr = new Array(16);
  //     for (let i = 0; i < letter.length; i++) {
  //       arr[i] = charArray[Math.floor(Math.random() * charArray.length)];
  //       color: getRandomColor();
  //     }
  //     return arr;
  //   };

  //   const handleClick = (index) => {
  //     updateValues(index);
  //     const randomChar = getRandomChar();
  //     setLetter(randomChar);
  //   };

  //   useEffect(() => {
  //     if (timer > 15) {
  //       onStop();
  //       navigateToNext();
  //     }
  //   }, [timer]);

  //   const accuracy = hits + misses > 0 ? hits / clicks : 0;
  //   const missRate = clicks > 0 ? misses / clicks : 0;

  //   // useFocusEffect(
  //   //   React.useCallback(() => {
  //   //     const navigateToNext = () => {
  //   //       const stateArray = [
  //   //         1,
  //   //         7,
  //   //         hits,
  //   //         clicks,
  //   //         misses,
  //   //         hits,
  //   //         accuracy,
  //   //         missRate,
  //   //       ];
  //   //       navigation.replace("TestTwoInitial", { stateArray });
  //   //       console.log(stateArray);
  //   //     };

  //   //     return () => {
  //   //       navigation.goBack();
  //   //     };
  //   //   }, [])
  //   // );

  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.grid}>
  //         {letter.map((char, index) => (
  //           <TouchableOpacity
  //             key={index}
  //             // style={[styles.box , { backgroundColor: char.color }]}
  //             style={[styles.box, { backgroundColor: char.color }]}
  //             onPress={() => handleClick(index)}
  //           >
  //             {/* <View style={styles.bom}> */}
  //             <Text style={styles.letter}>{char}</Text>
  //             {/* </View> */}
  //           </TouchableOpacity>
  //         ))}
  //       </View>
  //       <View style={styles.scoreContainer}>
  //         <Text style={styles.score}>Hits: {clicks}</Text>
  // <Text style={styles.timer}>Time: {timer}</Text>
  //         {/* <CountDown
  //           until={16}
  //           size={20}
  //           onFinish={() => navigateToNext}
  //           digitStyle={{ backgroundColor: "#FFF" }}
  //           digitTxtStyle={{ color: "#1CC625" }}
  //           timeToShow={["M", "S"]}
  //           timeLabels={{ m: "MM", s: "SS" }}
  //         /> */}
  //       </View>
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     // backgroundColor: "red",
  //   },
  //   grid: {
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     width: "80%",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     // backgroundColor: "red",
  //   },
  //   box: {
  //     width: "20%",
  //     aspectRatio: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderWidth: 1,
  //     borderColor: "#000",
  //     margin: 3,
  //     borderRadius: 5,
  //   },
  //   letter: {
  //     fontSize: 24,
  //   },
  //   scoreContainer: {
  //     marginTop: 20,
  //     alignItems: "center",
  //     backgroundColor: "red",
  //     borderWidth: 2,
  //     borderRadius: 20,
  //     width: "70%",
  //   },
  //   score: {
  //     fontSize: 24,
  //   },
  //   timer: {
  //     fontSize: 24,
  //     marginTop: 10,
  //   },
  // });

  const navigation = useNavigation();
  const [timerId, setTimerId] = useState();
  const [timer, setTimer] = useState(0);
  const charArray = [
    "q",
    "d",
    "p",
    "b",
    // "q",
    // "d",
    // "p",
    // "b",
    // "q",
    // "d",
    // "p",
    // "b",
    // "q",
    // "d",
    // "p",
    // "b",
  ];
  const [letter, setLetter] = useState([
    // "q",
    // "b",
    // "p",
    // "q",
    "b",
    "b",
    "d",
    "d",
    "p",
    "q",
    "b",
    "d",
    "b",
    "q",
    "d",
    "p",
    "b",
    "b",
    "b",
    "p",
    // "b",
    // "d",
    // "d",
    // "p",
    // "q",
    // "d",
    // "p",
    // "q",
  ]);
  const [letters, setLetters] = useState([]);
  const [hits, setHits] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [misses, setMisses] = useState(0);

  const navigateToNext = () => {
    const stateArray = [1, 7, hits, clicks, misses, hits, accuracy, missRate];
    navigation.replace("TestTwoInitial", { stateArray });
    console.log(stateArray);
  };

  // Generate a random color
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  // Initialize letters with random characters and colors
  // useEffect(() => {
  //   const initialLetters = charArray.map((char) => ({
  //     char,
  //     color: getRandomColor(),
  //   }));
  //   setLetters(initialLetters);
  // }, []);

  const getRandomChar = () => {
    let arr = new Array(16);

    const newLetters = letters.map((letter) => ({
      ...letter,
      char: charArray[Math.floor(Math.random() * charArray.length)],
      color: getRandomColor(),
    }));
    setLetters(newLetters);
    // for (let i = 0; i < letter.length; i++) {
    //   arr[i] = charArray[Math.floor(Math.random() * charArray.length)];
    //   color: getRandomColor()
    // }
    // color: getRandomColor();
    // return arr;

      // const updateLetters = () => {
      //   const newLetters = letters.map((letter) => ({
      //     ...letter,
      //     char: charArray[Math.floor(Math.random() * charArray.length)],
      //     color: getRandomColor(),
      //   }));
      //   setLetters(newLetters);
      // };
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
  // Update letters with new random characters and colors
  // const updateLetters = () => {
  //   const newLetters = letters.map((letter) => ({
  //     ...letter,
  //     char: charArray[Math.floor(Math.random() * charArray.length)],
  //     color: getRandomColor(),
  //   }));
  //   setLetters(newLetters);
  // };

  const updateValues = (index) => {
    if (letter[index] === "b") {
      setHits(hits + 1);
      // styles.bom.backgroundColor = "red";
      // styles.bom .backgroundColor= 'red';
    } else {
      setMisses(misses + 1);
    }
    setClicks(clicks + 1);
  };

  // const getRandomChar = () => {
  //   let arr = new Array(16);
  //   for (let i = 0; i < letter.length; i++) {
  //     arr[i] = charArray[Math.floor(Math.random() * charArray.length)];
  //     color: getRandomColor();
  //   }
  //   return arr;
  // };

  const handleClick = (index) => {
    updateValues(index);
    const randomChar = getRandomChar();
    setLetter(randomChar);
  };

  // Handle box click
  // const handleClick = (index) => {
  //   updateLetters(); // Update letters state to change colors
  //   // Additional logic for handling click
  // };

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
        {/* {letters.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.box, { backgroundColor: item.color }]}
            onPress={() => handleClick(index)}
          >
            <Text style={styles.letter}>{item.char}</Text>
          </TouchableOpacity>
        ))} */}

        {letter.map((char, index) => (
          <TouchableOpacity
            key={index}
            // style={[styles.box , { backgroundColor: char.color }]}
            style={[styles.box, { backgroundColor: char.color }]}
            onPress={() => handleClick(index)}
          >
            <View style={styles.bom}>
              <Text style={styles.letter}>{char}</Text>
            </View>
          </TouchableOpacity>
        ))}

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
    aspectRatio: 1,
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
});

export default TestOneScreen;

// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";

// const TestOneScreen = () => {
//   const navigation = useNavigation();
//   const charArray = ["q", "d", "p", "b", "q", "d", "p", "b", "q", "d", "p", "b", "q", "d", "p", "b"];
//   const [letters, setLetters] = useState([]);

//   // Generate a random color
//   const getRandomColor = () =>
//     `#${Math.floor(Math.random() * 16777215).toString(16)}`;

//   // Initialize letters with random characters and colors
//   useEffect(() => {
//     const initialLetters = charArray.map((char) => ({
//       char,
//       color: getRandomColor(),
//     }));
//     setLetters(initialLetters);
//   }, []);

//   // Update letters with new random characters and colors
//   const updateLetters = () => {
//     const newLetters = letters.map((letter) => ({
//       ...letter,
//       char: charArray[Math.floor(Math.random() * charArray.length)],
//       color: getRandomColor(),
//     }));
//     setLetters(newLetters);
//   };

//   // Handle box click
//   const handleClick = (index) => {
//     updateLetters(); // Update letters state to change colors
//     // Additional logic for handling click
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.grid}>
//         {letters.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.box, { backgroundColor: item.color }]}
//             onPress={() => handleClick(index)}
//           >
//             <Text style={styles.letter}>{item.char}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   box: {
//     width: "20%",
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//     margin: 3,
//     borderRadius: 5,
//   },
//   letter: {
//     fontSize: 24,
//   },
// });

// export default TestOneScreen;

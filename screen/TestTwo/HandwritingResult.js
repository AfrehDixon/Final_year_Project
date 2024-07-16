// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useRoute } from "@react-navigation/native";
// import ConfettiCannon from "react-native-confetti-cannon";
// import { useNavigation } from "@react-navigation/native";
// import { useToast } from "react-native-toast-notifications";
// import { IconButton, Button } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function HandwritinResult({ navigation }) {
//   const route = useRoute();
//   const [newmessage2, setMessage] = useState("");
//   const { Model_Prediction } = route.params;
//   const [prediction, setPrediction] = useState("");
//   const [sendData, setSendData] = useState(true);
//   const toast = useToast();

//   useEffect(() => {
//     toast.show("Test Complete", {
//       type: "success",
//       placement: "top",
//     });
//   }, []);

//   const SendResults = async () => {
//     try {
//       setMessage(Model_Prediction);
//       const PredictionTwo = await AsyncStorage.setItem(
//         "predictionTwo",
//         Model_Prediction

//       );
//       setSendData(!sendData);
//     } catch (e) {
//       console.log("Error");
//     }
//   };

//   return (
//     // <View>
//     <View style={styles.container}>
//       <Text style={styles.text}>Test Complete!</Text>
//       <ConfettiCannon
//         count={350}
//         origin={{ x: -10, y: 0 }}
//         fallSpeed={1000}
//         autoStartDelay={5}
//         explosionSpeed={1000}
//       />

//       <Text style={styles.prediction}>{newmessage2}</Text>
//       <View style={styles.btn}>
//         {sendData ? (
//           <>
//             <Button
//               mode="contained"
//               style={styles.button}
//               onPress={SendResults}
//             >
//               Check Result
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button
//               mode="contained"
//               style={styles.button}
//               onPress={() => navigation.navigate("Home")}
//             >
//               Back to Home
//             </Button>
//           </>
//         )}
//       </View>
//     </View>
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   prediction: {
//     fontSize: 15,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 50,
//   },
//   btn: {
//     flexDirection: "row",
//     justifyContent: "center",
//     width: "90%",
//     gap: 40,
//   },
// });

import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
export default function HandwritingResult({ navigation }) {
  const route = useRoute();
  const [newMessage2, setMessage] = useState("");
  const [modelName, setModelName] = useState("");
  const { Model_Prediction } = route.params;
  const [sendData, setSendData] = useState(true);
  const toast = useToast();

  useEffect(() => {
      Toast.show({
        type: "success",
        text1: "Test Completed Successful",
        // text2: "This is some something 👋",
      });
  }, []);

  useEffect(() => {
    if (sendData) {
      SendResults();
    }
  }, [sendData]);

  const SendResults = async () => {
    try {
      setMessage(Model_Prediction);

      const newPrediction = {
        model: "Handwriting Analysis Model",
        prediction: Model_Prediction,
      };

      const storedData = await AsyncStorage.getItem("userData");
      const parsedData = storedData ? JSON.parse(storedData) : {};

      let userData = {
        ...parsedData,
        predictions: [
          ...(parsedData.predictions || []).filter(
            (prediction) => prediction && typeof prediction === "object"
          ),
          newPrediction,
        ],
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));


      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setSendData(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Complete!</Text>
      <ConfettiCannon
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
      />

      <Text style={styles.prediction}>{newMessage2}</Text>
      <View style={styles.btn}>
        {sendData ? (
          <Button mode="contained" style={styles.button} onPress={SendResults}>
            Check Result
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            Back to Home
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  prediction: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    gap: 40,
  },
});

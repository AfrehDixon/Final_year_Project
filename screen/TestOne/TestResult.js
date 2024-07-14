// // import { View, Text, StyleSheet } from "react-native";
// // import React, { useEffect, useState } from "react";
// // import { useRoute, useNavigation } from "@react-navigation/native";
// // import ConfettiCannon from "react-native-confetti-cannon";
// // import { useToast } from "react-native-toast-notifications";
// // import { IconButton, Button } from "react-native-paper";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // export default function TestResult() {
// //   const navigation = useNavigation();
// //   const [loading, setLoading] = useState(false);
// //   const route = useRoute();
// //   const [newMessage, setMessage] = useState("");
// //   const { data } = route.params;
// //   const [message, setNewMessage] = useState("");
// //   const [sendData, setSendData] = useState(true);

// //   const toast = useToast();

// //   useEffect(() => {
// //     toast.show("Game Complete", {
// //       type: "success",
// //       placement: "top",
// //     });
// //   }, []);

// //   const api = "https://game-model-2.onrender.com/predict";
// //   const SendResults = async () => {
// //     setLoading(true);

// //     try {
// //       const res = await fetch(api, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //         },
// //         body: JSON.stringify({ data }),
// //       });
// //       const result = await res.json();
// //       const { message } = result;
// //       setMessage(message);
// //       const Predictions = await AsyncStorage.setItem("prediction", newMessage);
// //       setSendData(!sendData);
// //     } catch (e) {
// //       console.error(e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text>Test Complete!</Text>
// //       <ConfettiCannon
// //         count={350}
// //         origin={{ x: -10, y: 0 }}
// //         fallSpeed={1000}
// //         autoStartDelay={5}
// //         explosionSpeed={1000}
// //       />
// //       <Text style={styles.prediction}>{newMessage}</Text>
// //       <View style={styles.btn}>
// //         {sendData ? (
// //           <>
// //             {loading ? (
// //               <>
// //                 <Button
// //                   mode="contained"
// //                   style={styles.button}
// //                   onPress={SendResults}
// //                 >
// //                   Loading.....
// //                 </Button>
// //               </>
// //             ) : (
// //               <>
// //                 <Button
// //                   mode="contained"
// //                   style={styles.button}
// //                   onPress={SendResults}
// //                 >
// //                   Send Results
// //                 </Button>
// //               </>
// //             )}
// //           </>
// //         ) : (
// //           <>
// //             <Button
// //               mode="contained"
// //               style={styles.button}
// //               onPress={() => navigation.navigate("Home", { newMessage })}
// //             >
// //               Back to Home
// //             </Button>
// //           </>
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   prediction: {
// //     fontSize: 15,
// //     marginBottom: 20,
// //   },
// //   button: {
// //     backgroundColor: "blue",
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 5,
// //     marginTop: 50,
// //   },
// //   btn: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     width: "90%",
// //     gap: 40,
// //   },
// //   text: {
// //     fontSize: 30,
// //     fontWeight: "bold",
// //     marginBottom: 20,
// //   },
// // });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useToast } from "react-native-toast-notifications";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TestResult() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [newMessage, setNewMessage] = useState("");
  // const [modelName, setModelName] = useState("");
  const [sendData, setSendData] = useState(true);
  const { data } = route.params;
  const toast = useToast();

  useEffect(() => {
    toast.show("Game Complete", {
      type: "success",
      placement: "top",
    });
  }, []);

   useEffect(() => {
     if (sendData) {
       SendResults();
     }
   }, [sendData]);

  const api = "https://game-model-2.onrender.com/predict";

  const SendResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      const { message } = result;
      setNewMessage(message);

      const newPrediction = {
        model: "Eye Tracking Model",
        prediction: message,
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
      // const newPrediction = {
      //   model: "Eye Tracking Model",
      //   prediction: message,
      // };
      // const storedData1 = storedData ? JSON.parse(storedData) : {};

      // let userData = {
      //   ...storedData1,
      //   predictions: [newPrediction],
      // };

      // // const storedData = await AsyncStorage.getItem("userData");
      // if (!storedData.predictions) {
      //   storedData.predictions = [];
      // }

      // storedData.predictions = storedData.predictions.filter(
      //   (prediction) => prediction !== ""
      // );

      //  if (storedData) {
      //  const userData1 = JSON.parse(storedData);
      // const NewData = storedData.predictions.push(newPrediction);
      // }

      // await AsyncStorage.setItem("userData", JSON.stringify(NewData));

      // const storedData = await AsyncStorage.getItem("userData");
      // const storedData1 = storedData ? JSON.parse(storedData) : {};

      //  if (!userData.predictions) {
      //    userData.predictions = [];
      // }

      // let userData = {
      //   ...storedData1,

      //   predictions: [newPrediction],
      // };

      //  userData.predictions.push(newPrediction);

      // if (!userData.predictions) {
      //   userData.predictions = [];
      // }

      // userData.predictions.push(newPrediction);
      // if (storedData) {
      //   userData = JSON.parse(storedData);
      //   userData.predictions.push(newPrediction);
      // }

      // await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setSendData(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Test Complete!</Text>
      <ConfettiCannon
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Enter Model Name"
        value={modelName}
        onChangeText={setModelName}
      /> */}
      <Text style={styles.prediction}>{newMessage}</Text>
      {/* <Text style={styles.prediction}>Hello</Text> */}
      <View style={styles.btn}>
        {sendData ? (
          loading ? (
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              Loading.....
            </Button>
          ) : (
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              Send Results
            </Button>
          )
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("Home", { newMessage })}
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
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

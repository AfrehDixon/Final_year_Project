import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image ,ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useToast } from "react-native-toast-notifications";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

      setSendData(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignContent:'center' ,justifyContent:'center'}}>
        <Image
          source={require("../../assets/congrats102.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.text}>Congratulation!!</Text>
      <Text style={{textAlign:'center',fontSize:14}}>You have completed the first test in testing for dyslexia...</Text>
      <ConfettiCannon
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
      />

      {/* <Text style={styles.prediction}>{newMessage}</Text> */}
      {/* <Text style={styles.prediction}>Hello</Text> */}
      <View style={styles.btn}>
        {sendData ? (
          loading ? (
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              <ActivityIndicator style={{marginTop:10}} />
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
    backgroundColor: "white",
    padding:40
  },
  image: {
    width: 400,
    height: 400,
    // borderRadius:'80%'
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
    justifyContent: 'center',
    alignItems:'center'
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    gap: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
  },
});

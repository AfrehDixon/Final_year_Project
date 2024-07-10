import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { IconButton, Button } from "react-native-paper";

export default function HandwritinResult({ navigation }) {
  const route = useRoute();
  const [newmessage2, setMessage] = useState("");
  const { Model_Prediction } = route.params;
  const [prediction, setPrediction] = useState("");
  const [sendData, setSendData] = useState(true);
  const toast = useToast();

  useEffect(() => {
    toast.show("Test Complete", {
      type: "success",
      placement: "top",
    });
  }, []);

  const SendResults = async () => {
    setMessage(Model_Prediction);
    setSendData(!sendData);
  };

  return (
    // <View>
    <View style={styles.container}>
      <Text style={styles.text}>Test Complete!</Text>
      <ConfettiCannon
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
      />

      <Text style={styles.prediction}>{newmessage2}</Text>
      <View style={styles.btn}>
        {sendData ? (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              Check Result
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate("Home", { newmessage2 })}
            >
              Back to Home
            </Button>
          </>
        )}
      </View>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

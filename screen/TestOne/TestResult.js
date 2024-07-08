import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useToast } from "react-native-toast-notifications";
import { IconButton, Button } from "react-native-paper";

export default function TestResult() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [newMessage, setMessage] = useState("");
  const { data } = route.params;
  const [message, setNewMessage] = useState("");

  const toast = useToast();

  useEffect(() => {
    toast.show("Game Complete", {
      type: "success",
      placement: "top",
    });
  }, []);

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
      setMessage(message);
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
      <Text style={styles.prediction}>{newMessage}</Text>
      <View style={styles.btn}>
        {loading ? (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              Loading.....
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={SendResults}
            >
              Check Result
            </Button>
          </>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          Back to Home
        </Button>
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

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

export default function HandwritinResult({ navigation }) {
  const route = useRoute();
  const [newmessage, setMessage] = useState("");
  const { Model_Prediction } = route.params;

  const toast = useToast();

  useEffect(() => {
    toast.show("Game Complete", {
      type: "success",
      placement: "top",
    });
  }, []);

  //   const newdata = { data: data };

  //   console.log(data);
  const api = "https://game-model-2.onrender.com/predict";
  const SendResults = async () => {
    setMessage("Model_Prediction");
  };

  return (
    // <View>
    <View style={styles.container}>
      <Text>Game Complete!</Text>
      <ConfettiCannon
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
      />

      <Text>{newmessage}</Text>
      <Button title="Check Result" onPress={SendResults} />
      <Button
        title="Back to home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Get Prediction"
        onPress={() => console.log(Model_Prediction)}
      />
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
});

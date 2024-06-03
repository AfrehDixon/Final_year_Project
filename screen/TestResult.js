import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import ConfettiCannon from "react-native-confetti-cannon";

export default function TestResult() {
  const route = useRoute();
  const [newmessage , setMessage]= useState('')
  const { data } = route.params;

  const newdata   = {data: data}

  console.log(data);
  const api = "https://game-model-2.onrender.com/predict";
  const SendResults = async () => {
      try {
        const res = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newdata),
        });
        // console.log(body);
        const result = await res.json();
        console.log(result);
        const {prediction ,message} = result
        setMessage(message)
      } catch (e) {
        console.log(e);
      }
  };

  return (
    // <View>
    <View style={styles.container}>
      <Text>Game Complete!</Text>
      <ConfettiCannon
        count={150}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={2}
        explosionSpeed={1000}
        
      />
      {/* <Text>{data}</Text> */}
      {/* <Text>{data[0]}</Text> */}
      {/* <Text>fdgd</Text> */}
      <Text>{newmessage}</Text>
      {/* <TouchableOpacity onPress={SendResults}><Text>Send</Text></TouchableOpacity> */}
      <Button title="Check Result" onPress={SendResults} />
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

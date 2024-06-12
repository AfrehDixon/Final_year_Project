import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";


export default function TestResult({navigation}) {
  const route = useRoute();
  const [newmessage , setMessage]= useState('')
  const { data } = route.params;

  const toast = useToast();

  useEffect(() => {
    toast.show("Game Complete", {
      type: "success",
      placement: "top",
    });
  }, []);

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
        count={350}
        origin={{ x: -10, y: 0 }}
        fallSpeed={1000}
        autoStartDelay={5}
        explosionSpeed={1000}
        
      />
      {/* <Text>{data}</Text> */}
      {/* <Text>{data[0]}</Text> */}
      {/* <Text>fdgd</Text> */}
      <Text>{newmessage}</Text>
      {/* <TouchableOpacity onPress={SendResults}><Text>Send</Text></TouchableOpacity> */}
      <Button title="Check Result" onPress={SendResults} />
      <Button title="Back to home" onPress={()=> navigation.navigate('Home')} />
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

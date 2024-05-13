import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTimer } from "react-timer-hook";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
import Colors from "../config/Colors";

export default function TestTwoScreen() {
  const targetTime = new Date();

  // const {seconds,isRunning} = useStopwatch({autoStart: true})
  targetTime.setSeconds(targetTime.getSeconds() + 30); // 30 seconds from now

  const { seconds, start } = useTimer({
    expiryTimestamp: targetTime,
    onExpire: () => console.log("Countdown complete!"),
  });
  const data = [
    { title: "E" },
    { title: "F" },
    { title: "F" },
    { title: "E" },
    { title: "F" },
    { title: "E" },
    { title: "F" },
    { title: "F" },
    { title: "E" },
    { title: "E" },
    { title: "F" },
    { title: "F" },
    { title: "E" },
    { title: "F" },
    { title: "E" },
    { title: "E" },
    { title: "F" },
    { title: "F" },
    { title: "F" },
    { title: "E" },
    { title: "E" },
    { title: "F" },
    { title: "E" },
    { title: "F" },
  ];
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        {/* <View > */}
        <Text style={{ fontSize: FontSize.large }}>
          Select all Alphabet that are E
        </Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Alphabert item={item.title} />}
          numColumns={4}
        />
      </View>

      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: FontSize.xLarge, color: "white" }}>
          {seconds}
        </Text>
      </View>
    </View>
  );
}

const Alphabert = ({ item }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
  },
  item: {
    backgroundColor: Colors.background,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: "white",
  },
});

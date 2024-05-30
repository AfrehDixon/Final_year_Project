import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function TestResult() {
  return (
    <View>
      <Text>TestResult</Text>
      <View style={styles.container}>
        <Text>Game Complete!</Text>
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
})
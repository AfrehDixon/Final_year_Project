// import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
// import React from "react";
// import { View, StyleSheet } from "react-native";
// import {
//   Appbar,
//   Card,
//   Title,
//   Button,
//   ProgressBar,
//   IconButton,
//   RadioButton,
//   Icon,
//   Text,
// } from "react-native-paper";
// import Colors from "../config/Colors";
// // import { LineChart } from "react-native-svg-charts";
// import FontSize from "../config/FontSize";
// // import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
// // import ListIcon from "react-native-paper/lib/typescript/components/List/ListIcon";

// const HomeScreen = ({navigation}) => {

//   const userName = "Joe";
//   return (
//     <View style={styles.container}>
//       {/* Top Bar */}
//       <Appbar.Header
//         style={{ justifyContent: "space-between", flexDirection: "row" }}
//       >
//         <Appbar.Content
//           title={`Welcome ${userName}`}
//           style={styles.appbarContent}
//         />
//         {/* <MaterialCommunityIcons name="brain" size={30} color={Colors.background} /> */}
//         <MaterialCommunityIcons
//           name="bell"
//           size={30}
//           color={Colors.background}
//         />
//         {/* </View> */}
//       </Appbar.Header>

//       {/* <View style={styles.graphContainer}>
//         <LineChart
//           style={styles.chart}
//           data={data}
//           contentInset={{ top: 20, bottom: 20 }}
//           svg={{ stroke: "rgb(134, 65, 244)" }}
//         />
//       </View> */}

//       {/* Card with General Cognitive Text */}
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title>General Cognitive Test</Title>
//           <View style={styles.cardTextContainer2}>
//             <Title style={styles.cardText}></Title>
//           </View>
//           <Button mode="contained" onPress={()=>navigation.navigate('TestOne')}>
//             Start Test
//           </Button>
//         </Card.Content>
//       </Card>
//       <Card style={styles.cardd}>
//         <Card.Content style={{ justifyContent: "center" }}>
//           <View style={{ flexDirection: "row", gap: 10 }}>
//             <MaterialCommunityIcons
//               name="alphabetical-variant"
//               size={40}
//               color={Colors.white}
//             />
//             <MaterialCommunityIcons
//               name="brain"
//               size={40}
//               color={Colors.white}
//             />
//           </View>
//           <Text style={{ color: Colors.white, fontSize: FontSize.large }}>
//             Daily Crosswordd
//           </Text>
//         </Card.Content>
//       </Card>

//       {/* Add more cards or components as needed */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   progressContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   cardTextContainer2: {
//     alignItems: "center",
//   },
//   progressBar: {
//     height: 10,
//   },
//   graphContainer: {
//     height: 200,
//     marginHorizontal: 16,
//     marginVertical: 20,
//     width: "80%",
//   },
//   graph: {
//     flex: 1,
//   },
//   card: {
//     margin: 20,
//   },
//   cardd: {
//     margin: 20,
//     backgroundColor: Colors.background,
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cardTextContainer: {
//     marginVertical: 10,
//   },
//   cardText: {
//     fontSize: 20,
//     fontWeight: 600,
//     lineHeight: 24,
//   },
//   appbarContent: {
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
// });

// export default HomeScreen;


import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Appbar, Card, Title, Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import FontSize from "../config/FontSize";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const userName = "Joe";

  const startAnimation = () => {
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Adjust the range to your needs
  });

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{ justifyContent: "space-between", flexDirection: "row" }}
      >
        <Appbar.Content
          title={`Welcome ${userName}`}
          style={styles.appbarContent}
        />
        <MaterialCommunityIcons
          name="bell"
          size={30}
          color={Colors.background}
        />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Title>General Cognitive Test</Title>
          <View style={styles.cardTextContainer2}>
            <Title style={styles.cardText}></Title>
          </View>
          <Button mode="contained" onPress={startAnimation}>
            Start Test
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.cardd}>
        <Card.Content style={{ justifyContent: "center" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <MaterialCommunityIcons
              name="alphabetical-variant"
              size={40}
              color={Colors.white}
            />
            <MaterialCommunityIcons
              name="brain"
              size={40}
              color={Colors.white}
            />
          </View>
          <Text style={{ color: Colors.white, fontSize: FontSize.large }}>
            Daily Crossword
          </Text>
        </Card.Content>
      </Card>

      {modalVisible && (
        <Modal
          transparent
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeAnimation}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={closeAnimation}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateY: modalTranslateY }] },
              ]}
            >
              <Text style={styles.modalTitle}>Select a Test</Text>
              <Button
                style={styles.button}
                mode="outlined"
                onPress={() => navigation.navigate("TestOne")}
              >
                Test One
              </Button>
              <Button
                style={styles.button}
                mode="outlined"
                onPress={() => navigation.navigate("TestTwo")}
              >
                Test Two
              </Button>
              <Button
                style={styles.button}
                mode="outlined"
                onPress={() => navigation.navigate("TestThree")}
              >
                Test Three
              </Button>
              <Button
                style={styles.button}
                mode="outlined"
                onPress={() => navigation.navigate("TestFour")}
              >
                Test Four
              </Button>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    margin: 20,
  },
  cardd: {
    margin: 20,
    backgroundColor: Colors.background,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom:20
  },
  cardTextContainer2: {
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  appbarContent: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // backgroundColor: 'white'
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20
    
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;


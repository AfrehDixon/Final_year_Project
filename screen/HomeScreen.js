import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Appbar,
  Card,
  Title,
  Button,
  ProgressBar,
  IconButton,
  RadioButton,
  Icon,
  Text,
} from "react-native-paper";
import Colors from "../config/Colors";
// import { LineChart } from "react-native-svg-charts";
import FontSize from "../config/FontSize";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const [child, setchild] = useState() 
  // const { data } = route.params
  // const {age ,grade,name}= data

  // const userName = data.name;
  const getchild = async () => {
    try {
      const Childdata = await AsyncStorage.getItem("child");  
      const childJSON = JSON.parse(Childdata)
      // console.log(childJSON.name);
      setchild(childJSON);
    } catch (error) {
      console.log(error);
    }
  };
  getchild();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Appbar.Header
        style={{ justifyContent: "space-between", flexDirection: "row" }}
      >
        <Appbar.Content
          title={`Welcome ${child?.name}`}
          style={styles.appbarContent}
        />
        {/* <MaterialCommunityIcons name="brain" size={30} color={Colors.background} /> */}
        <MaterialCommunityIcons
          name="bell"
          size={30}
          color={Colors.background}
        />
        {/* </View> */}
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Title>General Cognitive Test</Title>
          <View style={styles.cardTextContainer2}>
            <Title style={styles.cardText}></Title>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("TestOneInitial")}
            style={{ backgroundColor: Colors.background }}
          >
            Start Test
          </Button>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>General Handwriting Test</Title>
          <View style={styles.cardTextContainer2}>
            <Title style={styles.cardText}></Title>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("HandwritingInitial")}
            style={{ backgroundColor: Colors.background }}
          >
            Upload Image
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
            Daily Crosswordd
          </Text>
        </Card.Content>
      </Card>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardTextContainer2: {
    alignItems: "center",
  },
  progressBar: {
    height: 10,
  },
  graphContainer: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 20,
    width: "80%",
  },
  graph: {
    flex: 1,
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
  cardTextContainer: {
    marginVertical: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
  },
  appbarContent: {
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default HomeScreen;

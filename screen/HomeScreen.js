import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import Colors from "../config/Colors";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [videoUri, setVideoUri] = useState("");
  const [child, setchild] = useState();
  const [imageUrl, setImageUrl] = useState(getRandomImageUrl());

  const route = useRoute();

  function getRandomImageUrl(width = 200, height = 200) {
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }
  useEffect(() => {
    setImageUrl(getRandomImageUrl());
  }, []);

  const getPrediction = async () => {
    try {
      const AppPredictionOne = await AsyncStorage.getItem("prediction");

      console.log(AppPredictionOne);
    } catch (error) {
      console.log(error);
    }
  };
  const getPredictionTwo = async () => {
    try {
      const AppPredictionTwo = await AsyncStorage.getItem("predictionTwo");
      // const childJSON = JSON.parse(Childdata);
      // console.log(childJSON.name);
      // setchild(childJSON);
      console.log(AppPredictionTwo);
      // console.log("dgfd");
    } catch (error) {
      console.log(error);
    }
  };
  // getPrediction();

  const getchild = async () => {
    try {
      const Childdata = await AsyncStorage.getItem("child");
      const childJSON = JSON.parse(Childdata);
      // console.log(childJSON.name);
      setchild(childJSON);
    } catch (error) {
      console.log(error);
    }
  };
  getchild();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <MaterialCommunityIcons name="menu" size={30} color={"white"} /> */}

        {/* <MaterialCommunityIcons name="settings" size={30} color={"white"} /> */}
        {/* <Button title="get" onPress={getPrediction} /> */}
        {/* <Button title="get" onPress={getPredictionTwo} /> */}
        <View>
          {/* <Image source={imageUrl} style={{ width: "200" }} /> */}
        </View>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <Image
            style={styles.profilePic}
            source={{ uri: "https://via.placeholder.com/150" }} // Replace with actual image URI
          /> */}
          <Image style={styles.profilePic} source={{ uri: imageUrl }} />
          <Ionicons
            name="settings"
            size={30}
            color={"white"}
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
        <Text style={styles.greeting}>
          {`Welcome ${child?.name}`}
          <MaterialCommunityIcons name="star" size={23} color={"#efdc4f"} />
        </Text>
        <Text style={styles.subGreeting}>
          Up your reading skill with{" "}
          <Text style={{ color: "#efdc4f" }}>LexyAfriq.</Text>
        </Text>
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("TestOneInitial")}
        >
          <Image
            style={styles.categoryIcon}
            // source={{ uri: "https://via.placeholder.com/100" }}
            source={require("../assets/test1.jpg")}
          />
          <Text style={styles.categoryText}>Learn</Text>
          <Text style={styles.categorySubText}>Word Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("HandwritingInitial")}
        >
          <Image
            style={styles.categoryIcon}
            // source={{ uri: "https://via.placeholder.com/100" }}
            source={require("../assets/test2.jpg")}
          />
          <Text style={styles.categoryText}>Handwriting Test</Text>
          <Text style={styles.categorySubText}>
            Starts test by Capturing your Alphabet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("ReadingInitial")}
        >
          <Image
            style={styles.categoryIcon}
            source={require("../assets/test3.jpg")}
          />
          <Text style={styles.categoryText}> Video Test</Text>
          <Text style={styles.categorySubText}>Available competitions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Image
            style={styles.categoryIcon}
            source={require("../assets/test1.jpg")}
          />
          <Video
            // source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            isLooping
            // onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
          <Text style={styles.categoryText}>Showcase</Text>
          <Text style={styles.categorySubText}>Your selected videos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#0c195c",
    // backgroundColor: "#6200ee",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // alignItems: "center",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "white",
  },
  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  subGreeting: {
    color: "#fff",
    fontSize: 13,
  },
  categoriesContainer: {
    padding: 20,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  categoryIcon: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categorySubText: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomeScreen;

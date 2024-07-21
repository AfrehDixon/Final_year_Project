import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  // Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../config/Colors";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { IconButton, Button } from "react-native-paper";
import Toast from "react-native-toast-message";

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  // const { email } = route.params;
  const [videoUri, setVideoUri] = useState("");
  const [child, setchild] = useState();
  const [imageUrl, setImageUrl] = useState(getRandomImageUrl());
  const [loading, setLoading] = useState(false);

  function getRandomImageUrl(width = 200, height = 200) {
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }
  useEffect(() => {
    setImageUrl(getRandomImageUrl());
  }, []);

  const getPrediction = async () => {
    setLoading(true);
    // let userData = {
    //   email: email,
    //   // predictions: [newPrediction],
    // };
    try {
      const AppPrediction = await AsyncStorage.getItem("userData");

      console.log(AppPrediction);
    } catch (error) {
      console.log(error);
    }
  };

  // getPrediction()
  const api = "https://dyslexia-backend.onrender.com/api/v1/test/test-results";

  const getPrediction1 = async () => {
    getPrediction();
    const data = await AsyncStorage.getItem("userData");
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: data,
      });
      const result = await res.json();
      console.log(result);
      Toast.show({
        type: "success",
        text1: result.message,
        // text2: " 👋",
      });
    } catch (error) {
      console.error(error);

      setLoading(!loading);
    } finally {
      setLoading(false);
    }
  };

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

  const openSettings = () => {
    navigation.navigate("Settings");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Button title="get" onPress={getPrediction} /> */}
        {/* <Button title="get" onPress={getPrediction1} /> */}

        <View style={{ marginTop: 35 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              name="menu"
              size={30}
              color={"white"}
              // style={{alignSelf: 'flex-end'}}
              onPress={openSettings}
            />
            <Ionicons
              name="settings"
              size={30}
              color={"white"}
              // style={{alignSelf: 'flex-end'}}
              onPress={openSettings}
            />
          </View>
          {/* <Image style={styles.profilePic} source={{ uri: imageUrl }} /> */}
          <Image
            style={styles.profilePic}
            source={require("../assets/profileimage.jpg")}
          />
          <Text style={styles.greeting}>
            {`Hi ${child?.name}`}
            <MaterialCommunityIcons name="star" size={23} color={"#efdc4f"} />
          </Text>
          <Text style={styles.subGreeting}>
            Up your reading skill with{" "}
            <Text style={{ color: "#efdc4f" }}>LexyAfriq.</Text>
          </Text>
        </View>
      </View>

      {/* <Text style={styles.categoriesTitle}>Categories</Text> */}
      <View style={styles.categoriesContainer}>
        <View></View>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("TestOneInitial")}
        >
          <Image
            style={styles.categoryIcon}
            source={require("../assets/test2.jpg")}
            resizeMode="contain"
          />
          <Text style={styles.categoryText}>Test 1</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("HandwritingInitial")}
        >
          <Image
            style={styles.categoryIcon}
            source={require("../assets/testwrite.jpg")}
            resizeMode="contain"
          />
          <Text style={styles.categoryText}> Test 2</Text>
          {/* <Text style={styles.categorySubText}>
            Starts test by Capturing your Alphabet
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => navigation.navigate("ReadingInitial")}
        >
          <Image
            style={styles.categoryIcon}
            source={require("../assets/write.jpg")}
            resizeMode="contain"
          />
          <Text style={styles.categoryText}>Test 3</Text>
          {/* <Text style={styles.categorySubText}>
            Start Test by Capturing Yourself.
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Image
            style={styles.categoryIcon}
            source={require("../assets/test2.jpg")}
            resizeMode="contain"
          />
          <Video
            // source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            isLooping
            // onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
          <Text style={styles.categoryText}>Play</Text>
          {/* <Text style={styles.categorySubText}>Your selected videos</Text> */}
        </TouchableOpacity>
        {/* <Button title="get" onPress={getPrediction1} /> */}

        {loading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button mode="contained" style={styles.button}>
              <ActivityIndicator style={{ marginRight: 20 , justifyContent:'center',alignItems:'center'}} />
              Sending Email ....
            </Button>
          </View>
        ) : (
          <>
            <Button
              mode="contained"
              style={styles.button}
              onPress={getPrediction1}
            >
              Send Prediction Result
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const Activity = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", zIndex: 1 }}>
      <ActivityIndicator />
    </View>
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
    // marginTop: 50,
    borderBottomRightRadius: 20,
    // alignItems: "center",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 5,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    // marginTop:50,
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subGreeting: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },
  categoriesContainer: {
    // padding: 10,
    // backgroundColor: 'red',
    // flexDirection: "row",
    // gap: 10,
    // flexBasis: '50%',
    // flexGrow: '50%'
    // margin:10,
    padding: 10,
    height: 800,
    // backgroundColor: "red",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    // marginBottom: 20,
    // paddingLe:10
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    flexBasis: "47%",
    margin: 5,
    // backgroundColor: "red",
  },
  categoryIcon: {
    width: "100%",
    // width:180,
    height: 180,
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
  button: {
    backgroundColor: "#0c195c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
  },
});

export default HomeScreen;

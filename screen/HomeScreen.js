// import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { View, StyleSheet, ScrollView } from "react-native";
// import {
//   Appbar,
//   Card,
//   Title,
//   Button,

//   Text,
// } from "react-native-paper";
// import Colors from "../config/Colors";
// import FontSize from "../config/FontSize";
// import { useRoute } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const HomeScreen = ({ navigation }) => {
//   const route = useRoute();
//   const [child, setchild] = useState();
//   // const { data } = route.params
//   // const {age ,grade,name}= data

//   // const userName = data.name;
//   const getchild = async () => {
//     try {
//       const Childdata = await AsyncStorage.getItem("child");
//       const childJSON = JSON.parse(Childdata);
//       // console.log(childJSON.name);
//       setchild(childJSON);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getchild();
//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={styles.container}>
//         {/* Top Bar */}
//         <Appbar.Header
//           style={{ justifyContent: "space-between", flexDirection: "row" }}
//         >
//           <Appbar.Content
//             title={`Welcome ${child?.name}`}
//             style={styles.appbarContent}
//           />
//           {/* <MaterialCommunityIcons name="brain" size={30} color={Colors.background} /> */}
//           <MaterialCommunityIcons
//             name="bell"
//             size={30}
//             color={Colors.background}
//           />
//           {/* </View> */}
//         </Appbar.Header>

//         <Card style={styles.card}>
//           <Card.Content>
//             <Title>General Cognitive Test</Title>
//             <View style={styles.cardTextContainer2}>
//               <Title style={styles.cardText}></Title>
//             </View>
//             <Button
//               mode="contained"
//               onPress={() => navigation.navigate("TestOneInitial")}
//               style={{ backgroundColor: Colors.background }}
//             >
//               Start Test
//             </Button>
//           </Card.Content>
//         </Card>
//         <Card style={styles.card}>
//           <Card.Content>
//             <Title>General Handwriting Test</Title>
//             <View style={styles.cardTextContainer2}>
//               <Title style={styles.cardText}></Title>
//             </View>
//             <Button
//               mode="contained"
//               onPress={() => navigation.navigate("HandwritingInitial")}
//               // onPress={() => navigation.navigate("ResultTwo")}
//               style={{ backgroundColor: Colors.background }}
//             >
//               Upload Image
//             </Button>
//           </Card.Content>
//         </Card>
//         <Card style={styles.card}>
//           <Card.Content>
//             <Title>General Reading Test</Title>
//             <View style={styles.cardTextContainer2}>
//               <Title style={styles.cardText}></Title>
//             </View>
//             <Button
//               mode="contained"
//               onPress={() => navigation.navigate("ReadingInitial")}
//               style={{ backgroundColor: Colors.background }}
//             >
//               Upload Video
//             </Button>
//           </Card.Content>
//         </Card>
//         <Card style={styles.cardd}>
//           <Card.Content style={{ justifyContent: "center" }}>
//             <View style={{ flexDirection: "row", gap: 10 }}>
//               <MaterialCommunityIcons
//                 name="alphabetical-variant"
//                 size={40}
//                 color={Colors.white}
//               />
//               <MaterialCommunityIcons
//                 name="brain"
//                 size={40}
//                 color={Colors.white}
//               />
//             </View>
//             <Text style={{ color: Colors.white, fontSize: FontSize.large }}>
//               Daily Crosswordd
//             </Text>
//           </Card.Content>
//         </Card>
//       </View>
//     </ScrollView>
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

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

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
  // const Predictions = await AsyncStorage.setItem('predictio')

  // const {newmessage2,newMessage} = route.params

  const getPrediction = async () => {
    try {
      const AppPredictionOne = await AsyncStorage.getItem("prediction");
      // const childJSON = JSON.parse(Childdata);
      // console.log(childJSON.name);
      // setchild(childJSON);
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
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <MaterialCommunityIcons name="menu" size={30} color={"white"} />
          <MaterialCommunityIcons name="bell" size={30} color={"white"} />
        </View>
        {/* <Button title="get" onPress={getPrediction} /> */}
        {/* <Button title="get" onPress={getPredictionTwo} /> */}

        <Image source={imageUrl} style={{ width: "200" }} />

        <View style={{ alignSelf: "center" }}>
          {/* <Image
            style={styles.profilePic}
            source={{ uri: "https://via.placeholder.com/150" }} // Replace with actual image URI
          /> */}
          <Image
            style={styles.profilePic}
            source={{ uri: imageUrl }} // Replace with actual image URI
          />
        </View>
        <Text style={styles.greeting}>
          {`Welcome ${child?.name}`}{" "}
          <MaterialCommunityIcons name="star" size={25} color={"yellow"} />
        </Text>
        <Text style={styles.subGreeting}>
          Up your reading skill with{" "}
          <Text style={{ color: "yellow" }}>LexyAfriq.</Text>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  subGreeting: {
    color: "#fff",
    fontSize: 16,
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

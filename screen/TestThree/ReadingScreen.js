

// import React, { useState } from "react";
// import { View, Button, Text, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import * as ImagePicker from "expo-image-picker";
// import { Video } from "expo-av";
// import { useRoute } from "@react-navigation/native";

// const ReadingScreen = () => {
//   // const [videoUri, setVideoUri] = useState(null);
//   const [videoStatus, setVideoStatus] = useState({});
//   const route = useRoute();
//   const { videoUri } = route.params;

//   const pickImageFromLibrary = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     console.log("Permission status:", status);
//     // if (status !== "granted") {
//     //   Alert.alert(
//     //     "Permission required",
//     //     "We need media library permissions to make this work!"
//     //   );
//     //   return;
//     // }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setVideoUri(result.assets[0].uri);
//     }
//   };

//   const uploadVideo = async () => {
//     if (!videoUri) {
//       Alert.alert("No video selected", "Please select a video first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", {
//       uri: videoUri,
//       type: "video/mp4", // or the appropriate MIME type for your video
//       name: "video.mp4",
//     });

//     try {
//       const response = await axios.post(
//         "http://YOUR_SERVER_URL/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       Alert.alert("Upload Result", JSON.stringify(response.data));
//     } catch (error) {
//       console.error(
//         "Upload failed:",
//         error.response ? error.response.data : error.message
//       );
//       Alert.alert("Upload Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {videoUri ? (
//         <>
//           <View style={styles.videocontainer}>
//             <View
//               style={{
//                 width: 350,
//                 height: 350,
//                 borderRadius: 20,
//                 marginBottom: 20,
//               }}
//             >
//               <Video
//                 source={{ uri: videoUri }}
//                 style={styles.video}
//                 useNativeControls
//                 resizeMode="cover"
//                 isLooping
//                 onPlaybackStatusUpdate={(status) =>
//                   setVideoStatus(() => status)
//                 }
//               />
//             </View>
//           </View>
//           <Button title="Upload Video" onPress={uploadVideo} />
//           {/* <Button title="Pick a Video" onPress={pickImageFromLibrary} /> */}
//         </>
//       ) : (
//           <>
//             <Text>Upload video of your child reading</Text>
//           <View
//             style={{
//               // backgroundColor: "yellow",
//               borderWidth: 2,
//               borderStyle: "dashed",
//               borderColor: "red",
//               borderRadius: 20,
//             }}
//           >
//             <View
//               style={{
//                 width: 350,
//                 height: 350,
//                 borderRadius: 20,
//                 // marginBottom: 20,
//               }}
//             ></View>
//           </View>
//           <Button title="Pick a Video" onPress={pickImageFromLibrary} />
//         </>
//       )}
    
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   video: {
//     width: "100%",
//     height: 350,
//     marginVertical: 20,
//   },
//   videocontainer: {
//     width: "100%",
//     alignItems: "center",
//   },
// });

// export default ReadingScreen;



import React, { useState ,useEffect} from "react";
import { View, Button, Text, StyleSheet, Alert, TextInput } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReadingScreen = () => {
  const [videoStatus, setVideoStatus] = useState({});
  const route = useRoute();
  const { videoUri } = route.params;
  const [modelName, setModelName] = useState("");
  const [predictionMessage, setPredictionMessage] = useState("");


  useEffect(() => {
    if (sendData) {
      SendResults();
    }
  }, [sendData]);

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission status:", status);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert("No video selected", "Please select a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: videoUri,
      type: "video/mp4",
      name: "video.mp4",
    });

    try {
      const response = await axios.post(
        "http://YOUR_SERVER_URL/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { message } = response.data; 
      setPredictionMessage(message);

      const newPrediction = {
        model: "Reading Speed Model",
        prediction: message,
      };

      let userData = {
        // email: "dixonafreh20@gmail.com",
        predictions: [newPrediction],
      };

      // const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        userData = JSON.parse(storedData);
        userData.predictions.push(newPrediction);
      }

      // await AsyncStorage.setItem("userData", JSON.stringify(userData));

      Alert.alert("Upload Result", JSON.stringify(response.data));
    } catch (error) {
      console.error(
        "Upload failed:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Upload Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <>
          <View style={styles.videocontainer}>
            <View style={styles.videoWrapper}>
              <Video
                source={{ uri: videoUri }}
                style={styles.video}
                useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={(status) =>
                  setVideoStatus(() => status)
                }
              />
            </View>
          </View>
          {/* <TextInput
            style={styles.input}
            placeholder="Enter Model Name"
            value={modelName}
            onChangeText={setModelName}
          /> */}
          <Button title="Upload Video" onPress={uploadVideo} />
          {predictionMessage ? (
            <Text style={styles.prediction}>{predictionMessage}</Text>
          ) : null}
        </>
      ) : (
        <>
          <Text>Upload video of your child reading</Text>
          <View style={styles.emptyVideoContainer}></View>
          <Button title="Pick a Video" onPress={pickImageFromLibrary} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  video: {
    width: "100%",
    height: 350,
    marginVertical: 20,
  },
  videocontainer: {
    width: "100%",
    alignItems: "center",
  },
  videoWrapper: {
    width: 350,
    height: 350,
    borderRadius: 20,
    marginBottom: 20,
  },
  emptyVideoContainer: {
    width: 350,
    height: 350,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "red",
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
  prediction: {
    fontSize: 15,
    marginTop: 20,
  },
});

export default ReadingScreen;

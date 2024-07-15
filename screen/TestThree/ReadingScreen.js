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
//       type: "video/mp4",
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



import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useRoute } from "@react-navigation/native";
import Spacing from "../../config/Spacing";
import Colors from "../../config/Colors";

const ReadingScreen = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const route = useRoute();
  const { videoUrii } = route.params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (videoUrii) {
      setVideoUri(videoUrii);
    }
  }, [videoUrii]);

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need media library permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const api = 'http://192.168.137.196:5000/upload';

  const uploadVideo = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("video", {
      uri: videoUri,
      type: "video/mp4", 
      name: "video.mp4",
    });

    try {
      const response = await fetch(api, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.json();
      console.log(data);
      // Alert.alert("Upload Successful", Prediction: ${data.prediction});
    } catch (error) {
      console.error("Error uploading video:", error);
      Alert.alert("Upload Failed", "There was an error uploading the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <>
          <View style={styles.videocontainer}>
            <View
              style={{
                width: 350,
                height: 350,
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
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
          {/* <Button title="Pick a Video" onPress={pickImageFromLibrary} /> */}
          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.background,
              marginVertical: Spacing * 3,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
            onPress={uploadVideo}
            disabled={loading}
          >
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ActivityIndicator size="small" color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Uploading...
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Upload Video
              </Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "red",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                width: 350,
                height: 350,
                borderRadius: 20,
              }}
            ></View>
          </View>
          {/* <Button title="Pick a Video" onPress={pickImageFromLibrary} /> */}
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
});

export default ReadingScreen;
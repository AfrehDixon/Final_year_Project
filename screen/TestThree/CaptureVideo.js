// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
// } from "react-native";
// import { Camera } from "expo-camera";
// // import * as Permissions from "expo-permissions";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { Video } from "expo-av";

// const CaptureVideo = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [paragraph, setParagraph] = useState("");
//   const cameraRef = useRef(null);
//   const [videoUri, setvideoUri] = useState(null);
//   const [videoStatus, setVideoStatus] = useState({});

//   useEffect(() => {
//     (async () => {
//       //   const { status } = await Camera.requestPermissionsAsync();
//       //   setHasPermission(status === "granted");
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Sorry, we need camera permissions to make this work!");
//         }
//       }
//     })();

//     // Generate a random paragraph
//     const paragraphs = [
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "Vivamus lacinia odio vitae vestibulum vestibulum.",
//       "Cras placerat enim nec justo hendrerit pretium.",
//       "Sed convallis velit vel orci commodo, ac gravida lacus tempor.",
//       "Etiam eget eros et libero elementum tincidunt.",
//     ];
//     const randomParagraph =
//       paragraphs[Math.floor(Math.random() * paragraphs.length)];
//     setParagraph(randomParagraph);
//   }, []);

//   const takeVideoWithCamera = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: false,
//       quality: 1,
//       presentationStyle: "fullScreen",
//     });

//     if (!result.canceled) {
//       setvideoUri(result.assets[0].uri);
//     }
//     //   setIsUploading(!isUploading);
//     console.log(videoUri);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.paragraphContainer}>
//         <Text style={styles.paragraph}>{paragraph}</Text>
//       </View>
//       <View
//         style={{
//           width: 350,
//           height: 400,
//           borderColor: "red",
//           borderWidth: 2,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Video
//           source={{ uri: videoUri }}
//           style={styles.video}
//           useNativeControls
//           resizeMode="cover"
//           isLooping
//           onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
//         />
//       </View>
//       <Button title="Send" onPress={takeVideoWithCamera} />
//     </SafeAreaView>
//   );
// };

// export default CaptureVideo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paragraphContainer: {
//     // flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   camera: {
//     flex: 2,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     margin: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     alignSelf: "flex-end",
//     alignItems: "center",
//     backgroundColor: "#ff4081",
//     borderRadius: 50,
//     padding: 15,
//   },
//   buttonRecording: {
//     alignSelf: "flex-end",
//     alignItems: "center",
//     backgroundColor: "red",
//     borderRadius: 50,
//     padding: 15,
//   },
// });

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
//   Platform,
//   Alert,
// } from "react-native";
// import { Camera } from "expo-camera";
// import { Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import { launchCamera,launchImageLibrary } from "react-native-image-picker";

// const CaptureVideo = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [cameraVisible, setCameraVisible] = useState(false);
//   const [paragraph, setParagraph] = useState("");
//   const cameraRef = useRef(null);
//   const [videoUri, setVideoUri] = useState(null);
//   const [videoStatus, setVideoStatus] = useState({});

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//       if (status !== "granted") {
//         Alert.alert("Sorry, we need camera permissions to make this work!");
//       }
//     })();

//     // Generate a random paragraph
//     const paragraphs = [
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "Vivamus lacinia odio vitae vestibulum vestibulum.",
//       "Cras placerat enim nec justo hendrerit pretium.",
//       "Sed convallis velit vel orci commodo, ac gravida lacus tempor.",
//       "Etiam eget eros et libero elementum tincidunt.",
//     ];
//     const randomParagraph =
//       paragraphs[Math.floor(Math.random() * paragraphs.length)];
//     setParagraph(randomParagraph);
//   }, []);

//   const takeVideoWithCamera = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: false,
//       quality: 1,
//       presentationStyle: "currentContext",
//     });

//     if (!result.canceled) {
//       setVideoUri(result.assets[0].uri);
//     }
//     //   setIsUploading(!isUploading);
//     console.log(videoUri);
//   };

//   const handleRecordVideo = async () => {
//     if (cameraRef.current) {
//       if (isRecording) {
//         cameraRef.current.stopRecording();
//         setIsRecording(false);
//         setCameraVisible(false);
//       } else {
//         setIsRecording(true);
//         const video = await cameraRef.current.recordAsync();
//         setVideoUri(video.uri);
//         setIsRecording(false);
//         setCameraVisible(false);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.paragraphContainer}>
//         <Text style={styles.paragraph}>{paragraph}</Text>
//       </View>
//       {cameraVisible ? (
//         <Camera
//           style={styles.camera}
//           type={Camera.Constants.Type.front}
//           ref={cameraRef}
//         >
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={isRecording ? styles.buttonRecording : styles.button}
//               onPress={handleRecordVideo}
//             >
//               <Text style={{ color: "#fff" }}>
//                 {isRecording ? "Stop Recording" : "Record Video"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       ) : (
//         <View style={styles.videoContainer}>
//           {videoUri && (
//             <Video
//               source={{ uri: videoUri }}
//               style={styles.video}
//               useNativeControls
//               resizeMode="cover"
//               isLooping
//               onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
//             />
//           )}
//           {/* <Button title="Send" onPress={() => setCameraVisible(true)} /> */}
//           <Button title="Send" onPress={takeVideoWithCamera} />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default CaptureVideo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paragraphContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "flex-end",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#ff4081",
//     borderRadius: 50,
//     padding: 15,
//   },
//   buttonRecording: {
//     alignItems: "center",
//     backgroundColor: "red",
//     borderRadius: 50,
//     padding: 15,
//   },
//   videoContainer: {
//     width: 350,
//     height: 400,
//     borderColor: "red",
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
// });

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
//   Platform,
//   Alert,
// } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";

// import { Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";

// const CaptureVideo = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [cameraVisible, setCameraVisible] = useState(false);
//   const [paragraph, setParagraph] = useState("");
//   const cameraRef = useRef(null);
//     const [videoUri, setVideoUri] = useState(null);
//       const [facing, setFacing] = useState("back");
//   const [videoStatus, setVideoStatus] = useState({});

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//       if (status !== "granted") {
//         Alert.alert("Sorry, we need camera permissions to make this work!");
//       }
//     })();

//     // Generate a random paragraph
//     const paragraphs = [
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "Vivamus lacinia odio vitae vestibulum vestibulum.",
//       "Cras placerat enim nec justo hendrerit pretium.",
//       "Sed convallis velit vel orci commodo, ac gravida lacus tempor.",
//       "Etiam eget eros et libero elementum tincidunt.",
//     ];
//     const randomParagraph =
//       paragraphs[Math.floor(Math.random() * paragraphs.length)];
//     setParagraph(randomParagraph);
//   }, []);

//   const takeVideoWithCamera = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setVideoUri(result.assets[0].uri);
//     }
//     console.log(videoUri);
//   };

//   const handleRecordVideo = async () => {
//     if (cameraRef.current) {
//       if (isRecording) {
//         cameraRef.current.stopRecording();
//         setIsRecording(false);
//         setCameraVisible(false);
//       } else {
//         setIsRecording(true);
//         const video = await cameraRef.current.recordAsync();
//         setVideoUri(video.uri);
//         setIsRecording(false);
//         setCameraVisible(false);
//       }
//     }
//     };

//     function toggleCameraFacing() {
//       setFacing((current) => (current === "back" ? "front" : "back"));
//     }

// //   if (hasPermission === null) {
// //     return <View />;
// //   }
// //   if (hasPermission === false) {
// //     return <Text>No access to camera</Text>;
// //   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.paragraphContainer}>
//         <Text style={styles.paragraph}>{paragraph}</Text>
//       </View>
//       <View style={styles.cameraContainer}>
//         {cameraVisible && (
//            <CameraView style={styles.camera} facing={facing}></CameraView>

//         )}
//       </View>
//       <View style={styles.videoContainer}>
//         {videoUri && (
//           <Video
//             source={{ uri: videoUri }}
//             style={styles.video}
//             useNativeControls
//             resizeMode="cover"
//             isLooping
//             onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
//           />
//         )}
//       </View>
//       <Button title="Pick Video from Gallery" onPress={takeVideoWithCamera} />
//       <Button title="Open Camera" onPress={() => setCameraVisible(true)} />
//     </SafeAreaView>
//   );
// };

// export default CaptureVideo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paragraphContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: "center",
//   },
//   cameraContainer: {
//     width: 350,
//     height: 400,
//     borderColor: "red",
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "flex-end",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#ff4081",
//     borderRadius: 50,
//     padding: 15,
//   },
//   buttonRecording: {
//     alignItems: "center",
//     backgroundColor: "red",
//     borderRadius: 50,
//     padding: 15,
//   },
//   videoContainer: {
//     width: 350,
//     height: 400,
//     borderColor: "red",
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
// });

import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import { Video } from "expo-av";
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { request, PERMISSIONS } from "react-native-permissions";

export default function CaptureVideo({ navigation }) {
  const [facing, setFacing] = useState("front");
  const [timer, setTimer] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videoUri, setVideoUri] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [cameraVisible, setCameraVisible] = useState(false);
  let intervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" && audioStatus.status === "granted"
      );
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      console.log("Video recorded: ", video.uri);
      console.log(videoUri);
      setIsRecording(false);
    }
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
    clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>
          He llo my name is Dixon Afreh Frimpong and I am a software developer
        </Text>
      </View>
      <View
        style={{
          height: 500,
          backgroundColor: "yellow",
          justifyContent: "flex-end",
        }}
      >
        <CameraView
          style={styles.camera}
          facing={facing}
          CameraType="back"
          focusMode="on"
          ref={cameraRef}
          VideoStabilization="standard"
          VideoStabilizationMode="auto"
          VideoCodecs="H264"
          mode="video"
          onCameraReady={() => console.log("Camera ready")}
          videoQuality="720p"
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={startRecording}>
              <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Text style={styles.text}>Stop</Text>
            </TouchableOpacity>

            {isRecording && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{timer}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            // onPress={`isRecording ? stopRecording : startRecording`}
            onPress={isRecording ? stopRecording : startRecording}
            style={styles.recordButton}
          >
            {isRecording ? (
              <MaterialIcons name="stop" size={24} color="white" />
            ) : (
              <MaterialIcons name="fiber-manual-record" size={24} color="red" />
            )}
          </TouchableOpacity>
        </CameraView>
      </View>
      <View style={styles.videoContainer}>
        {videoUri && (
          <Video
            source={{ uri: videoUri }}
            // source={{ uri: video.uri }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
        )}
      </View>
      {/* {!cameraVisible && ( */}
      <Button
        title="Next"
        onPress={() => navigation.navigate("ReadingScreen", { videoUri })}
      />
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
  },
  camera: {
    flex: 1,
    // height: 500,
    width: 350,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    // flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  timerContainer: {
    position: "absolute",
    top: 10,
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  timerText: {
    color: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 10,
  },
  controlButton: {
    alignItems: "center",
    padding: 10,
    },
    recordButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "red",
        borderRadius: 50,
        padding: 20,
        },
      
 
});

// import React, { useState, useEffect, useRef } from "react";
// import { View, StyleSheet, Button } from "react-native";
// import { Camera } from "expo-camera";
// import { Video } from "expo-av";

// export default function CaptureVideo() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoUri, setVideoUri] = useState(null); // Ensure this state is defined
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       const audioStatus = await Camera.requestMicrophonePermissionsAsync();
//       setHasPermission(
//         cameraStatus.status === "granted" && audioStatus.status === "granted"
//       );
//     })();
//   }, []);

//   const startRecording = async () => {
//     if (cameraRef.current) {
//       setIsRecording(true);
//       const video = await cameraRef.current.recordAsync();
//       setVideoUri(video.uri); // Store the video URI
//       console.log("Video recorded: ", video.uri);
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = () => {
//     if (cameraRef.current) {
//       cameraRef.current.stopRecording();
//     }
//   };

// //   if (hasPermission === null) {
// //     return <View />;
// //   }
// //   if (hasPermission === false) {
// //     return <Text>No access to camera</Text>;
// //   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={cameraRef}>
//         <Button
//                   //   title={isRecording ? "Stop Recording" : "Start Recording"}
//                   title="record"
//                   //   onPress={isRecording ? stopRecording : startRecording}
//                   onPress={startRecording}
//         />
//       </Camera>
//       {videoUri && (
//         <Video
//           source={{ uri: videoUri }}
//           rate={1.0}
//           volume={1.0}
//           isMuted={false}
//           resizeMode="cover"
//           shouldPlay
//           isLooping
//           style={styles.video}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//     aspectRatio: 1,
//   },
//   video: {
//     width: 300,
//     height: 300,
//     marginTop: 20,
//   },
// });

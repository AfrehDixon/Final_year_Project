// import { CameraView, useCameraPermissions, Camera } from "expo-camera";
// import { Video } from "expo-av";
// import { useState, useRef, useEffect } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { PermissionsAndroid, Platform } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// // import { request, PERMISSIONS } from "react-native-permissions";

// export default function CaptureVideo({ navigation }) {
//   const [facing, setFacing] = useState("front");
//   const [timer, setTimer] = useState(0);
//   const [permission, requestPermission] = useCameraPermissions();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const cameraRef = useRef(null);
//   const [videoUri, setVideoUri] = useState(null);
//   const [videoStatus, setVideoStatus] = useState({});
//   const [cameraVisible, setCameraVisible] = useState(false);
//   const [randomPassage, setRandomPassage] = useState('');

//   let intervalRef = useRef(null);

//   const getRandomPassage = () => {
//     return passages[Math.floor(Math.random() * passages.length)];
//   };

//   const passages = [
//     "The quick brown fox jumps over the lazy dog.",
//     "A journey of a thousand miles begins with a single step.",
//     "To be or not to be, that is the question.",
//     "All that glitters is not gold.",
//     "Actions speak louder than words.",
//     // Add more passages here
//   ];

//   useEffect(() => {
//      setRandomPassage(getRandomPassage());
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
//       setVideoUri(video.uri);
//       console.log("Video recorded: ", video.uri);
//       console.log(videoUri);
//       setIsRecording(false);
//     }
//     intervalRef.current = setInterval(() => {
//       setTimer((prevTimer) => prevTimer + 1);
//     }, 1000);
//   };

//   const stopRecording = () => {
//     if (cameraRef.current) {
//       cameraRef.current.stopRecording();
//     }
//     clearInterval(intervalRef.current);
//     setTimer(0);
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <Text>{randomPassage}</Text>
//       </View>
//       <View
//         style={{
//           height: 500,
//           backgroundColor: "yellow",
//           justifyContent: "flex-end",
//         }}
//       >
//         <CameraView
//           style={styles.camera}
//           facing={facing}
//           CameraType="back"
//           focusMode="on"
//           ref={cameraRef}
//           VideoStabilization="standard"
//           VideoStabilizationMode="auto"
//           VideoCodecs="H264"
//           mode="video"
//           onCameraReady={() => console.log("Camera ready")}
//           videoQuality="720p"
//         >
//           <View style={styles.buttonContainer}>
//             {/* <TouchableOpacity style={styles.button} onPress={startRecording}>
//               <Text style={styles.text}>Start</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={stopRecording}>
//               <Text style={styles.text}>Stop</Text>
//             </TouchableOpacity> */}

//             {isRecording && (
//               <View style={styles.timerContainer}>
//                 <Text style={styles.timerText}>{timer}</Text>
//               </View>
//             )}
//           </View>

//           <TouchableOpacity
//             // onPress={`isRecording ? stopRecording : startRecording`}
//             onPress={isRecording ? stopRecording : startRecording}
//             style={styles.recordButton}
//           >
//             {isRecording ? (
//               <MaterialIcons name="stop" size={30} color="red" />
//             ) : (
//               <MaterialIcons name="fiber-manual-record" size={30} color="red" />
//             )}
//           </TouchableOpacity>
//         </CameraView>
//       </View>
//       <View style={styles.videoContainer}>
//         {videoUri && (
//           <Video
//             source={{ uri: videoUri }}
//             // source={{ uri: video.uri }}
//             style={styles.video}
//             useNativeControls
//             resizeMode="cover"
//             isLooping
//             onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
//           />
//         )}
//       </View>
//       {/* {!cameraVisible && ( */}
//       <Button
//         title="Next"
//         onPress={() => navigation.navigate("ReadingScreen", { videoUri })}
//       />
//       {/* )} */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     // backgroundColor: "red",
//     flex: 1,
//     alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//     // height: 500,
//     width: 350,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     // flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//   },
//   timerContainer: {
//     position: "absolute",
//     top: 10,
//     left: 95,
//     backgroundColor: "red",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems:'center'
//   },
//   timerText: {
//     color: "white",
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   controlContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     width: "100%",
//     padding: 10,
//   },
//   controlButton: {
//     alignItems: "center",
//     padding: 10,
//   },
//   recordButton: {
//     position: "absolute",
//     bottom: 20,
//     alignSelf: "center",
//     backgroundColor: "white",
//     borderRadius: 50,
//     padding: 15,
//   },
// });

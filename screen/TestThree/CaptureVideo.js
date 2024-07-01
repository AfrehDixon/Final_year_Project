

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
            {/* <TouchableOpacity style={styles.button} onPress={startRecording}>
              <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Text style={styles.text}>Stop</Text>
            </TouchableOpacity> */}

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
    // backgroundColor: "red",
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

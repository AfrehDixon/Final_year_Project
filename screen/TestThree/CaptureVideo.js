

import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import { Video } from "expo-av";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton, Button } from "react-native-paper";


export default function CaptureVideo({ navigation }) {
  const [facing, setFacing] = useState("front");
  const [timer, setTimer] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videoUrii, setVideoUri] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [cameraVisible, setCameraVisible] = useState(false);
  let intervalRef = useRef(null);
  const [Next, setNext] = useState(false);

  const [randomPassage, setRandomPassage] = useState("");

  const getRandomPassage = () => {
    return passages[Math.floor(Math.random() * passages.length)];
  };

  const passages = [
    "The cat sat on the mat. The sun is big and bright. I like to play with my dog.",
    "The bird sings in the tree. We can go to the park today. The sky is blue and clear.",
    "She has a red ball. The dog runs fast. He likes to play catch.",
    "I see a big tree. The leaves are green. Birds make nests there.",
    "Mom bakes a cake. It smells good. We eat it together.",
   
  ];


  useEffect(() => {
    setRandomPassage(getRandomPassage());
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" && audioStatus.status === "granted"
      );
    })();
  }, []);

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
      console.log("Video recorded: ", video.uri);
      setVideoUri(video.uri);
      console.log(videoUrii);
      console.log(videoUrii);
      setIsRecording(false);
    }
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
    clearInterval(intervalRef.current);
    setTimer(0);
    setNext(!Next);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 14, padding: 20 }}>
        <Text style={{ fontSize: 20,textAlign:'center' }}>{randomPassage}</Text>
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
           

            {isRecording && (
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{timer}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            
            onPress={isRecording ? stopRecording : startRecording}
            style={styles.recordButton}
          >
            {isRecording ? (
              <MaterialIcons name="stop" size={30} color="red" />
            ) : (
              <MaterialIcons name="fiber-manual-record" size={30} color="red" />
            )}
          </TouchableOpacity>
        </CameraView>
      </View>
      {Next && (
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("ReadingScreen", { videoUrii })}
        >
          Next
        </Button>
      )}

  
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
    // marginBottom:30,
    justifyContent: "center",
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
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
  },
  button: {
    backgroundColor: "#0c195c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
});

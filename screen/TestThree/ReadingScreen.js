

import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

const ReadingScreen = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission status:", status);
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

  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert("No video selected", "Please select a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: videoUri,
      type: "video/mp4", // or the appropriate MIME type for your video
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
          <Button title="Upload Video" onPress={uploadVideo} />
          <Button title="Pick a Video" onPress={pickImageFromLibrary} />
        </>
      ) : (
          <>
            <Text>Upload video of your child reading</Text>
          <View
            style={{
              // backgroundColor: "yellow",
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
                // marginBottom: 20,
              }}
            ></View>
          </View>
          <Button title="Pick a Video" onPress={pickImageFromLibrary} />
        </>
      )}
      {/* <View
        style={{
          // backgroundColor: "yellow",
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
            marginBottom: 20,
          }}
        ></View>
      </View>
      <Button title="Pick a Video" onPress={pickImageFromLibrary} />
      {videoUri && (
        <>
          <View style={styles.videocontainer}>
            <Video
              source={{ uri: videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
              isLooping
              onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
            />
          </View>
          <Button title="Upload Video" onPress={uploadVideo} />
        </>
      )} */}
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

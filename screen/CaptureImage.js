import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar, ActivityIndicator, Button } from "react-native-paper";

import Spacing from "../config/Spacing";
import Colors from "../config/Colors";

const CaptureImage = ({ route, navigation }) => {

  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ImageCount, setImageCount] = useState(1);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);



  const takeImageWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setIsUploading(!isUploading);
  };


  const uploadImage = async () => {
    // setImageCount(ImageCount + 1);
    setLoading(true);
    if (!image) return;

    const formData = new FormData();
    const uriParts = image.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("file", {
      uri: image,
      type: `image/${fileType}`,
      name: `photo.${fileType}`,
    });

    try {
      const response = await fetch(
        "https://final-handwriting-model.onrender.com/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }

      const responseData = await response.json();

      console.log(formData);
      console.log(response);
      console.log(responseData);
      setImageCount((prev) => prev + 1);
      if (ImageCount === 5) {
        navigation.navigate("Result");
      }
      console.log(ImageCount);
      // if (response.status === 200) {
      //   navigation.navigate("Alphabet");
      // } else {
      //   console.log("error");
      // }

      if (responseData.uploaded_images <= 4) {
        navigation.navigate("Alphabet");
        
      }
      else {
        navigation.navigate("ResultTwo");
        
      }
    } catch (error) {
      console.error("Upload failed:", error.message);
      setLoading(false);
      const responseText = await response.text();
      console.log("Response text:", responseText);

     
    }
  };

  return (
    <View style={styles.container}>
      {isUploading ? (
        <>
          <View
            style={{
              // backgroundColor: "yellow",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "green",
              borderRadius: 20,
            }}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          {/* <Button title="Upload" onPress={uploadImage} /> */}
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
            onPress={uploadImage}
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
                Upload
              </Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Take a picture of the alphabet </Text>
          <View
            style={{
              // backgroundColor: "yellow",
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "red",
              borderRadius: 20,
            }}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={takeImageWithCamera}
          >
            Capture
          </Button>

          <Button title="Take Image" onPress={takeImageWithCamera} />
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
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 20,

    // marginBottom: 20,
  },
  progressContainer: {
    marginTop: 20,
    width: "80%",
  },
  progressBar: {
    height: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default CaptureImage;

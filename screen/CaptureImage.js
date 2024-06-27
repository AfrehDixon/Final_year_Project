import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Image, Text, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar, Colors } from "react-native-paper";

const CaptureImage = ({ route, navigation }) => {
  const {
    alphabet,
    images,
    setImages,
    alphabetIndex,
    setAlphabetIndex,
    randomAlphabets,
  } = route.params;
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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

  // const pickImageFromLibrary = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: false, // Prevent cropping
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

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

  // const takeImage = async () => {
  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: false,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.uri);
  //   }
  //   setIsUploading(!isUploading);
  // };

  // const uploadImage = async () => {
  //   setIsUploading(true);
  //   const formData = new FormData();
  //   formData.append("image", {
  //     uri: image,
  //     type: "image/jpeg",
  //     name: "photo.jpg",
  //   });

  //   try {
  //     const response = await fetch(
  //       "https://final-handwriting-model.onrender.com/upload",
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(formData, uri);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Upload success:", data.message);
  //       const newImages = [...images, image];
  //       setImages(newImages);

  //       if (alphabetIndex < randomAlphabets.length - 1) {
  //         setAlphabetIndex(alphabetIndex + 1);
  //         navigation.navigate("Alphabet");
  //       } else {
  //         navigation.navigate("Result");
  //       }
  //     } else {
  //       console.error("Upload failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Upload failed:", error.message);
  //   }
  //   finally {
  //     setIsUploading(false);
  //   }
  // };

    const uploadImage = async () => {
      if (!image) return;

      const formData = new FormData();
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("image", {
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
          console.log(response);
          console.log(responseData);
          navigation.navigate('Alphabet')
      } catch (error) {
        console.error("Upload failed:", error.message);

        // Log the entire response text to debug
        const responseText = await response.text();
        console.log("Response text:", responseText);
      }
    };

  return (
    <View style={styles.container}>
      {isUploading ? (
        <>
          <View style={{ backgroundColor: "red" }}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <Button title="Upload" onPress={uploadImage} />
        </>
      ) : (
        <Button title="Take Image" onPress={takeImageWithCamera} />
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
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  progressContainer: {
    marginTop: 20,
    width: "80%",
  },
  progressBar: {
    height: 10,
  },
});

export default CaptureImage;

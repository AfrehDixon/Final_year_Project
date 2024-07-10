import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar, ActivityIndicator, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

import Spacing from "../../config/Spacing";
import Colors from "../../config/Colors";

const CaptureImage = ({ route, navigation }) => {
  const toast = useToast();

  const [image, setImage] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction , setPrediction] =useState('')

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
      quality: 0.5, 
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setIsUploading(!isUploading);
  };

  const api = "https://final-handwriting-model.onrender.com/upload";
  const uploadImage = async () => {
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
      const response = await fetch(api, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.uploaded_images <= 4) {
        navigation.navigate("Alphabet");
      } else {
        const { Model_Prediction } = responseData;
        navigation.navigate("ResultTwo", { Model_Prediction });
      }

      toast.show("Upload Successful", {
        type: "success",
        placement: "top",
      });
    } catch (error) {
      toast.show(error.message, {
        type: "danger",
        placement: "top",
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      {isUploading ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: "light" }}>
            Upload this image
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "grey",
              borderRadius: 20,
            }}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </View>
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
          <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: "light" }}>
            Take a picture of the alphabet
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: Colors.primary,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              width: 350,
              height: 350,
            }}
          >
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={60}
              color={Colors.active}
              onPress={takeImageWithCamera}
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={takeImageWithCamera}
          >
            Capture
          </Button>
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

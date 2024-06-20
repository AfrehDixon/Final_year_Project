import { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../config/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IconButton, Button } from "react-native-paper";

import axios from "axios";

export default function CaptureImage({ navigation }) {
  const [image, setImage] = useState(null);

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

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false, // Prevent cropping
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImageWithCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // Prevent cropping
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

    //   const responseData = await response.json();
        console.log(response);
        navigation.navigate('Handwriting')
    } catch (error) {
      console.error("Upload failed:", error.message);

      // Log the entire response text to debug
      const responseText = await response.text();
      console.log("Response text:", responseText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontSize: 20 }}>Upload Image</Text>
        <View style={styles.imagee}>
          {/* {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
          )} */}
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image ? null : (
            <Icon name="upload" size={50} onPress={pickImageFromLibrary} />
          )}
        </View>
      </View>
      <View style={styles.icon}>
        {/* <TouchableOpacity
          onPress={pickImageFromLibrary}
          style={styles.iconButton1}
        >
          <View style={{flexDirection:'row' ,justifyContent:'center', alignItems:'center'}}>
            <Icon name="photo-library" size={30} color={'white'} />
            <Button style={{fontSize: 16 ,color:'white'}}>Browse </Button>
          </View>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={takeImageWithCamera}
        style={styles.iconButton2}
      >
        <Icon name="camera-alt" size={70} color={Colors.background} />
      </TouchableOpacity>
      <Button title="Send" onPress={uploadImage} />
      <Button mode="contained" style={styles.button} onPress={uploadImage}>
        Send Capture
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    // flex: 3,
    // flexDirection: "column",

    // justifyContent: "center",
    // alignItems: "flex-end",
    justifyContent: "space-between",
    // flexDirection: "row",
    // backgroundColor: 'red',
    // height:400
  },
  iconButton1: {
    margin: 20,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
    width: 200,
  },
  iconButton2: {
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: 'red',
    // alignSelf:'flex-end'
    // marginTop: 170
  },
  imagee: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 350,
    borderColor: "red",
    paddingHorizontal: 20,
    // backgroundColor: "red",
    borderBlockColor: "yellow",
    borderRadius: 20,
    borderStyle: "dashed",
    borderWidth: 2,
  },
  image: {
    width: 350,
    height: 350,
    // marginTop: 20,
    borderColor: "yellow",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

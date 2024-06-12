// import { useState, useEffect } from "react";
// import { Button, Image, View, StyleSheet, Platform, Alert } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Sorry, we need camera permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImageFromLibrary = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false, // Prevent cropping
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const takeImageWithCamera = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: false, // Prevent cropping
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       }
//       };
//     // takeImageWithCamera();

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Pick an image from camera roll"
//         onPress={pickImageFromLibrary}
//       />
//       <Button title="Take a photo" onPress={takeImageWithCamera} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//   },
// });
import { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../config/Colors";

export default function ImagePickerExample() {
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

  return (
    <View style={styles.container}>
      <View style={styles.imagee}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={pickImageFromLibrary}
          style={styles.iconButton}
        >
          <Icon name="photo-library" size={70} color={Colors.background} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takeImageWithCamera}
          style={styles.iconButton}
        >
          <Icon name="camera-alt" size={70} color={Colors.background} />
          {/* <Icon
            name="check-circle"
            size={50}
            color="green"
            style={styles.checkIcon}
          /> */}
        </TouchableOpacity>
      </View>
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
    flex: 1,
    flexDirection: "row",
    
    justifyContent: "center",
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  iconButton: {
    margin: 20,
    },
    imagee: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        height: 400,
    },
  image: {
    width: 400,
    height: 400,
    marginTop: 20,
  },
});

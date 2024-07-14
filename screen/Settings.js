import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import {
  Text,
  Appbar,
  List,
  Divider,
  Button,
  Dialog,
  Portal,
  PaperProvider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Context";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [child, setchild] = useState();
  const [sound, setSound] = useState();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(getRandomImageUrl());

  const { setIsLoggedIn } = useContext(AuthContext);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/child.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    };

    // if (isSoundEnabled) {
    //   playSound();
    // }
    {
      isSoundEnabled ? playSound() : setIsSoundEnabled(false);
    }

    return () => {
      {
        sound ? sound.unloadAsync() : null;
      }
    };
  }, [isSoundEnabled]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const remove = await AsyncStorage.removeItem("userToken");
      const userdata = await AsyncStorage.removeItem("userData");
      console.log(remove);
      navigation.replace("Onboarding");
      console.log("token removed");
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
    setIsLoading(false);
  };

  const getchild = async () => {
    try {
      const Childdata = await AsyncStorage.getItem("child");
      const childJSON = JSON.parse(Childdata);
      // console.log(childJSON.name);
      setchild(childJSON);
    } catch (error) {
      console.log(error);
    }
  };
  getchild();

  function getRandomImageUrl(width = 200, height = 200) {
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }
  useEffect(() => {
    setImageUrl(getRandomImageUrl());
  }, []);

  async function RegisterChild() {
    const storedData = await AsyncStorage.getItem("userData");
    const storedData1 = storedData ? JSON.parse(storedData) : {};

    let userData = {
      ...storedData1,
      // email:'',

      predictions: [],
    };

    userData.predictions.push("");
    navigation.navigate("RegisterChild");

    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("prediction set to empty");
    console.log(userData);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <Appbar.Header style={{ backgroundColor: Colors.white,justifyContent:'center',alignItems:'center' }}>
      <Appbar.Content title="Settings" />
      </Appbar.Header> */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* <View style={styles.avatarContainer}> */}
          {/* <Image
              source={require("../assets/ddd.jpg")}
              style={styles.avatar}
            /> */}
          {/* <View style={styles.infoContainer}>
              <Text style={styles.name}>{`${child?.name}`}</Text>
              <Text style={styles.name}>{`Age : ${child?.age} years`}</Text>
              <Text style={styles.name}>{`Grade: ${child?.grade}`}</Text>
              <Text style={styles.grade}>Level 100</Text>
            </View> */}

          {/* <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("RegisterChild")}
            >
              <MaterialCommunityIcons
                name="plus"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity> */}
          {/* </View> */}
          {/* <View style={styles.header}>
            <Icon name="arrow-back" size={24} onPress={() => {}} />
            <Text style={styles.headerTitle}>Settings</Text>
          </View> */}
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Account</Text> */}
            <TouchableOpacity style={styles.accountItem}>
              {/* <Image
                style={styles.profilePic}
                source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual image URI
              /> */}
              <Image style={styles.profilePic} source={{ uri: imageUrl }} />
              <View style={styles.accountTextContainer}>
                <Text style={styles.accountName}>{`${child?.name}`}</Text>
                <Text
                  style={styles.accountSubText}
                >{`Age : ${child?.age} years`}</Text>
                <Text
                  style={styles.accountSubText}
                >{`Grade: ${child?.grade}`}</Text>
              </View>
              {/* <Icon name="addition" size={24} /> */}
              <MaterialCommunityIcons
                name="plus"
                size={28}
                color={Colors.background}
                // onPress={() => navigation.navigate("RegisterChild")}
                onPress={RegisterChild}
                style={{ width: "bold" }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Icon name="settings" size={24} color="#f39c12" />
              <Text style={styles.settingsText}>General</Text>
              <Icon name="chevron-right" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Icon name="language" size={24} color="#3498db" />
              <Text style={styles.settingsText}>Language</Text>
              <Text style={styles.settingsSubText}>English</Text>
              <Icon name="chevron-right" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Icon name="notifications" size={24} color="#9b59b6" />
              <Text style={styles.settingsText}>Notifications</Text>
              <Icon name="chevron-right" size={24} />
            </TouchableOpacity>
            <View style={styles.settingsItem}>
              <Icon name="brightness-2" size={24} color="#34495e" />
              <Text style={styles.settingsText}>Background Sound</Text>

              <Switch
                value={isSoundEnabled}
                onValueChange={() => setIsSoundEnabled(!isSoundEnabled)}
              />
            </View>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                )
              }
            >
              <Icon name="volume-up" size={24} color="#1abc9c" />
              <Text style={styles.settingsText}>Sounds & Haptics</Text>
              <Icon name="chevron-right" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Icon name="lock" size={24} color="#e74c3c" />
              <Text style={styles.settingsText}>Security</Text>
              <Icon name="chevron-right" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem} onPress={showDialog}>
              <Icon name="exit-to-app" size={24} color="#95a5a6" />
              <Text style={styles.settingsText}>Logout</Text>
              <Icon name="chevron-right" size={24} />
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Logout</Dialog.Title>
                  <Dialog.Content>
                    <Text>Do you want to logout your account? </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancle</Button>
                    <Button onPress={handleLogout}>Logout</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </ScrollView> */}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#666",
    marginLeft: 20,
    marginBottom: 10,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 20,
  },
  accountTextContainer: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountSubText: {
    fontSize: 14,
    color: "#666",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 20,
  },
  settingsSubText: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
});

export default SettingsScreen;

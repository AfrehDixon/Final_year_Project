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

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

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
    try {
      const remove = await AsyncStorage.removeItem("userToken");
      console.log(remove);
      navigation.navigate("Onboarding");
      console.log("token removed");
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
    setIsLoading(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <Appbar.Header style={{ backgroundColor: Colors.white,justifyContent:'center',alignItems:'center' }}>
      <Appbar.Content title="Settings" />
      </Appbar.Header> */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/ddd.jpg")}
              style={styles.avatar}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Dixon Afreh</Text>
              <Text style={styles.grade}>Level 100</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("RegisterChild")}
            >
              <MaterialCommunityIcons
                name="plus"
                size={30}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <List.Section>
            <List.Subheader>Preferences</List.Subheader>
            <Divider />
            <Divider />
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Enable Notifications</Text>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={() =>
                  setIsNotificationsEnabled(!isNotificationsEnabled)
                }
              />
            </View>
            <Divider />
            <Divider />
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Play Background Sound</Text>
              <Switch
                value={isSoundEnabled}
                onValueChange={() => setIsSoundEnabled(!isSoundEnabled)}
              />
            </View>
            <Divider />
            <Divider />
            {/* <Divider />
            <Divider /> */}

            <List.Subheader style={styles.settingItem}>
              App Information
            </List.Subheader>
            <Divider />
            <Divider />
            {/* <Divider />
            <Divider /> */}
            <List.Item
              style={styles.settingItem}
              title="About the App"
              left={() => <List.Icon icon="information" />}
            />
            {/* <Divider />
            <Divider /> */}
            {/* <List.Item
              style={styles.settingItem}
              title="Terms of Service"
              left={() => <List.Icon icon="file-document" />}
            /> */}
            <Divider />
            <Divider />
            <List.Item
              style={styles.settingItem}
              title="Privacy Policy"
              left={() => <List.Icon icon="shield-lock" />}
            />
            <Divider />
            <Divider />
            {/* <Divider />
            <Divider /> */}

            <List.Subheader>Support</List.Subheader>
            <Divider />
            <Divider />
            {/* <Divider />
            <Divider /> */}
            <List.Item
              style={styles.settingItem}
              title="Contact Support"
              left={() => <List.Icon icon="help-circle" />}
            />
            <Divider />

            <List.Item
              title="Logout"
              style={styles.settingItem}
              left={() => <List.Icon icon="comment-question" />}
              onPress={showDialog}
            />
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

            <Divider />

            {/* </List.Section> */}
          </List.Section>
        </ScrollView>
        {/* </ScrollView> */}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bluedemo,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.text,
  },
  grade: {
    fontSize: FontSize.medium,
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  settingText: {
    fontSize: FontSize.medium,
    color: Colors.text,
  },
});

export default SettingsScreen;

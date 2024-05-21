import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// import colors from '../config/Colors'

export default function AppTextInput({
  value,
  handleTextChange,
  placeholder,
  icon,
  ...otherProps
}) {
  const [focused, setFocused] = useState(false);

  const onChangeText = (text) => {
    if (handleTextChange) {
      handleTextChange(text);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        focused && {
          borderWidth: 3,
          borderColor: Colors.primary,
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: Colors.primary,
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
          backgroundColor: Colors.lightPrimary,
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={20} />

      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        value={value}
        id={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          {
            fontSize: FontSize.small,
            padding: Spacing * 1.2,
            backgroundColor: Colors.lightPrimary,
            borderRadius: Spacing,
            marginVertical: Spacing,
            width:'90%'     
          },
        ]}
        {...otherProps}
      />
    </SafeAreaView>
  );
}

// export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width:'100%',
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.lightPrimary,
  },
});

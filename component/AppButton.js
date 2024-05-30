import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../config/Colors";
import FontSize from "../config/FontSize";
import Spacing from "../config/Spacing";
export default function AppButton({ label, icon, style, onPress }) {
  return (
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
      onPress={onPress}
    >
      <Text
        style={{
          // fontFamily: Font["poppins-regular"],
          color: Colors.onPrimary,
          textAlign: "center",
          // fontSize: FontSize.large,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
// 	buttonContainer: {
// 		width: "100%",
// 		height: 68,
// 		marginHorizontal: 20,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		padding: 3,
// 		backgroundColor: "red",
// 	},
// 	button: {
// 		borderRadius: 20,
// 		width: "100%",
// 		height: "100%",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		flexDirection: "row",
// 	},
// 	buttonIcon: {
// 		paddingRight: 8,
// 	},
// 	buttonLabel: {
// 		color: "#fff",
// 		fontSize: 16,
// 	},
// });

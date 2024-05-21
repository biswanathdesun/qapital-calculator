import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
} from "react-native";

function CustomButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.backgroundColor }]}
      onPress={() => {
        Keyboard.dismiss();
        props.onPress();
      }}
    >
      <Text style={[styles.buttonText, { color: props.color }]}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    width: "auto",
    marginBottom: 15,
    // marginTop: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../config/colors";
import { Octicons } from "@expo/vector-icons";

const TextInput2 = (props) => {
  const [inputValue, setInputValue] = useState(props.value || "");
  const [selectedText, setSelectedText] = useState(props.unitValue || "year");

  useEffect(() => {
    setInputValue(props.value || "");
  }, [props.value]);

  const handleCallback = (text) => {
    props.onUnitChange(text);
  };
  const handleTextPress = (text) => {
    setSelectedText(text);
    handleCallback(text);
  };

  const handleInputChange = (text) => {
    setInputValue(text);

    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          keyboardType="numeric"
          value={inputValue}
          // onChangeText={(text) => setInputValue(text)}
          onChangeText={handleInputChange}
        />
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              // gap: 10,
              width: "40%",
            },
            styles.toggleButton,
          ]}
        >
          <TouchableOpacity onPress={() => handleTextPress("year")}>
            <Text
              style={[
                {
                  color:
                    selectedText === "year" ? colors.primary : colors.textColor,
                },
                styles.buttonText,
              ]}
            >
              Year
            </Text>
          </TouchableOpacity>
          <Octicons name="arrow-switch" size={14} color={colors.textColor} />
          <TouchableOpacity onPress={() => handleTextPress("month")}>
            <Text
              style={[
                {
                  color:
                    selectedText === "month"
                      ? colors.primary
                      : colors.textColor,
                },
                styles.buttonText,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    margin: 10,
    padding: 2,
  },
  input: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
    width: "60%",
  },

  labelStyle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.textColor,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
    color: "#fff",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TextInput2;

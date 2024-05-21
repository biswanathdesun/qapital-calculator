import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker  from '@react-native-community/datetimepicker';
import { format, isFuture } from "date-fns";

function InputField(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState(props.value || "");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInputValue(props.value || "");
  }, [props.value]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, selectedDate) => {
    setDatePickerVisibility(false);
    const currentDate = format(new Date(selectedDate), "yyyy-MM-dd");
    setDate(selectedDate)
    handleInputChange(currentDate.toLocaleString());
    setInputValue(currentDate.toLocaleString());
    if (props.onDateSelect) {
      props.onDateSelect(selectedDate);
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);

    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  const handleBlur = () => {
    if (props.validate && props.validate(inputValue)) {
      props.onBlur && props.onBlur(inputValue);
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>

      <View>
        {props.icon ? (
          <TouchableOpacity
            style={styles.subContainerStyle}
            onPress={()=>showDatePicker()}
          >
            <TextInput
              style={styles.inputStyle}
              placeholder={props.placeholder}
              value={inputValue}
              onChangeText={handleInputChange}
              onBlur={handleBlur}
              keyboardType={props.keyboardType}
              editable={!props.icon}
            />
            <FontAwesome name="calendar" size={22} color={colors.textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.subContainerStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder={props.placeholder}
              value={inputValue}
              onChangeText={handleInputChange}
              onBlur={handleBlur}
              keyboardType={props.keyboardType}
              editable={!props.icon}
            />
          </View>
        )}
      </View>

      {isDatePickerVisible == true ?
         <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleConfirm}
        />
        :null}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    margin: 10,
    padding: 2,
  },
  subContainerStyle: {
    backgroundColor: colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  inputStyle: {
    width: "80%",
    fontSize: 18,
  },
  unitStyle: {
    // width: "20%",
    fontSize: 16,
    color: colors.grey,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.textColor,
  },
});

export default InputField;

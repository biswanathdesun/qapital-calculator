import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
// import { Entypo } from "@expo/vector-icons";
// import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// import Colours from "../utilities/Color";
import colors from "../config/colors";
// import ModalContext from "../contextApi/ModalContext";

const Header = (props) => {
  const navigation = useNavigation();
  const gotoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
        animated={true}
      />
      <View
        style={[
          styles.header,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {props.leftIconName === true ? (
            <Image
              style={styles.logo}
              source={require("../assets/logo.png")}
              resizeMode={"contain"}
            />
          ) : (
            <TouchableOpacity style={{ width: 30 }} onPress={gotoBack}>
              <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
          )}

          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: 15,
              marginBottom:props.leftIconName === true ? 15 : 0,
              // textAlign: 'center',
            }}
          >
            {props.title}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    backgroundColor: colors.primary,
  },
  searchContainer: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    display: "flex",
    position: "relative",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.white,
    width: "96%",
    borderRadius: 7,
    margin: 7,
    height: 50,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  searchInput: {
    borderColor: colors.white,
    color: colors.white,
    borderRadius: 5,
    width: "80%",
    height: "50%",
    color: colors.black,
    marginLeft: 15,
  },
  verticleLine: {
    height: "40%",
    width: 1,
    backgroundColor: colors.lightGrey,
    marginRight: 20,
  },
  logo: {
    height: 40,
    width: 40,
    marginBottom: 15,
  },
});

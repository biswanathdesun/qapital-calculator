import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet, Text, View } from "react-native";
import Home from "../screen/Home";
// import Second from "../screen/Second";
import EmiCalc from "../screen/EmiCalc";
import InterestRateCalc from "../screen/InterestRateCalc";
import GstCalc from "../screen/GstCalc";
import SipCalc from "../screen/SipCalc";
import FdCalc from "../screen/FdCalc";
import RdCalc from "../screen/RdCalc";
import PpfCalc from "../screen/PpfCalc";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const TabNavigation = () => {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={({ route }) => ({
// 				headerShown: false,
// 				tabBarShowLabel: false,

// 			})}
// 		>
// 			<Tab.Screen name="Home" component={Home} />
// 			<Tab.Screen name="Second" component={Second} />

// 		</Tab.Navigator>
// 	)
// };

const Stacks = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EmiCalc" component={EmiCalc} />
      <Stack.Screen name="InterestRateCalc" component={InterestRateCalc} />
      <Stack.Screen name="GstCalc" component={GstCalc} />
      <Stack.Screen name="SipCalc" component={SipCalc} />
      <Stack.Screen name="FdCalc" component={FdCalc} />
      <Stack.Screen name="RdCalc" component={RdCalc} />
      <Stack.Screen name="PpfCalc" component={PpfCalc} />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <>
      <NavigationContainer>
        <Stacks />
      </NavigationContainer>
    </>
  );
}

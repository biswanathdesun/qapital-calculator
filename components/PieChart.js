import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import { Divider } from "react-native-paper";
import colors from "../config/colors";
function PieComponent(props) {
  const widthAndHeight = 100;
  // const series = [100, 40];
  // const int = props.interest;
  // console.log(props.interest);
  // console.log(props.principal);

  const series = [props.interest, props.principal];
  const sliceColor = [colors.PIEprimary,colors.primary];
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center",
        }}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
        <View>
          <View style={styles.indicatorContainer}>
            <View
              style={{ height: 10, width: 10, backgroundColor:colors.PIEprimary }}
            />
            <Text>Total Interest Payable</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
              }}
            />
            <Text>Total Principal Amount</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.title}>{props.text1}</Text>
          <Text style={styles.answer}>{`\u20B9 ${props.interest}`}</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.title}>{props.text2}</Text>
          <Text style={styles.answer}>{`\u20B9 ${props.principal}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.textColor,
    margin: 5,
  },
  answer: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  indicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PieComponent;

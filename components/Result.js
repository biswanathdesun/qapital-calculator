import React, { useState } from "react";
import { Divider } from "react-native-paper";
import { Text } from "react-native";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
// import PieComponent from "./PieChart";
import colors from "../config/colors";

function Result(props) {
  // console.log(props.children);
  const [emi, setEmi] = useState(false);
  const [gst, setGst] = useState(false);
  return (
    <SafeAreaView>
      <Text
        style={{
          color: colors.textColor,
          margin: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Calculation
      </Text>
      <View style={styles.backStyle}>
        <View
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
       
          {props.children}
      
        </View>
        {props.children !== undefined && (
          <Divider
            bold={true}
            style={{
              margin: 10,
            }}
          />
        )}
  
        {props.activity == "emiResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Payment</Text>
              <Text style={styles.title}>(Principal + Interest)</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.emiTotalPayment}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>EMI (Monthly Payment) </Text>
              <Text style={styles.answer}>{`\u20B9 ${props.emi}`}</Text>
            </View>
          </View>
        )}
        {props.activity == "interestResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Payment</Text>
              <Text style={styles.title}>(Principal + Interest)</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.totalPayment}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Interest</Text>
              <Text style={styles.answer}>{`${props.interest} %`}</Text>
            </View>
          </View>
        )}
        {props.activity == "gstResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Net Amount</Text>
              {/* <Text style={styles.title}>(Principal + Interest)</Text> */}
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.gstInitialAmount}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>GST Amount</Text>
              <Text style={styles.answer}>{`\u20B9 ${props.gstAmount}`}</Text>
            </View>
            
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Amount</Text>
              <Text style={styles.answer}>{`\u20B9 ${props.gstResult}`}</Text>
            </View>
          </View>
        )}
        {props.activity == "sipResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Investment Amount</Text>
              {/* <Text style={styles.title}>(Principal + Interest)</Text> */}
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.sipInvestmentAmount}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Return</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.sipTotalReturn}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Profit</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.sipTotalProfit}`}</Text>
            </View>
          </View>
        )}
        {props.activity == "fdResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Investment Amount</Text>
              {/* <Text style={styles.title}>(Principal + Interest)</Text> */}
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.fdInvestmentAmount}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Interest Payable</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.totalFDInterest}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Maturity Value</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.fdMaturityValue}`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.dateCard}>
                <Text style={styles.title}>Investment Date</Text>
                <Text style={styles.date}>{props.fdInvestmentDate}</Text>
              </View>
              <View style={styles.dateCard}>
                <Text style={styles.title}>Maturity Date</Text>
                <Text style={styles.date}>{props.fdMaturityDate}</Text>
              </View>
            </View>
          </View>
        )}
        {props.activity == "rdResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Investment Amount</Text>
              {/* <Text style={styles.title}>(Principal + Interest)</Text> */}
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.rdInvestmentAmount}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Interest Payable</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.totalRDInterest}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Maturity Value</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.rdMaturityValue}`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.dateCard}>
                <Text style={styles.title}>Investment Date</Text>
                <Text style={styles.date}>{props.rdInvestmentDate}</Text>
              </View>
              <View style={styles.dateCard}>
                <Text style={styles.title}>Maturity Date</Text>
                <Text style={styles.date}>{props.rdMaturityDate}</Text>
              </View>
            </View>
          </View>
        )}
        {props.activity == "ppfResult" && (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Investment Amount</Text>
              {/* <Text style={styles.title}>(Principal + Interest)</Text> */}
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.ppfInvestmentAmount}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Total Interest Payable</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.totalPPFInterest}`}</Text>
            </View>
            <Divider
              bold={true}
              style={{
                margin: 10,
              }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>Maturity Value</Text>
              <Text
                style={styles.answer}
              >{`\u20B9 ${props.ppfMaturityValue}`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.dateCard}>
                <Text style={styles.title}>Investment Date</Text>
                <Text style={styles.date}>{props.ppfInvestmentDate}</Text>
              </View>
              <View style={styles.dateCard}>
                <Text style={styles.title}>Maturity Date</Text>
                <Text style={styles.date}>{props.ppfMaturityDate}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.textColor,
    margin: 5,
  },
  backStyle: {
    backgroundColor: "#fff",
    borderRadius: 4,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 100,
  },
  answer: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
  dateCard: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    width: 150,
    margin: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: colors.primary,
    margin: 5,
  },
});

export default Result;

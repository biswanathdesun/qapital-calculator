import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';
import Header from '../components/Header';
import Result from '../components/Result';
import TextInput2 from '../components/InputField2';
import { ScrollView } from 'react-native-gesture-handler';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function SipCalc() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loanTenureUnit, setLoanTenureUnit] = useState('year');
  const [childData, setChildData] = useState('');
  const Callback = (childData) => {
    setChildData(childData);
    // console.log(childData);
  };

  const Toastalert = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const calculateSIP = () => {
    if (!monthlyInvestment || !interestRate || !duration) {
      // setError("Please fill in all fields");
      Toastalert('Please fill in all fields');
      setResult(null);
      return;
    } else if (
      loanTenureUnit === 'year' &&
      monthlyInvestment > 1000000
    ) {
      Toastalert('Principle amount should be less than 1000000!');
      setResult(null);
      null;
      return;
    } else if (loanTenureUnit === 'year' && duration > 30) {
      Toastalert('InvestmentTerm should be less than 30!');
      setResult(null);
      null;
      return;
    } else if (loanTenureUnit === 'month' && duration > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setResult(null);
      null;
      return;
    }

    const principle = parseFloat(monthlyInvestment);
    const rate = parseFloat(interestRate) / 100 / 12;
    let calculatedDuration = parseFloat(duration);

    if (loanTenureUnit === 'year') {
      const time = calculatedDuration * 12;
      const futureValue =
        principle *
        (((Math.pow(1 + rate, time) - 1) / rate) * (1 + rate));
      setResult(futureValue.toFixed(2));
    } else if (loanTenureUnit === 'month') {
      const time = calculatedDuration;
      const futureValue =
        principle *
        ((Math.pow(1 + rate, time) - 1) / rate) *
        (1 + rate);
      setResult(futureValue.toFixed(2));
    }

    setError('');
  };

  const resetFields = () => {
    setMonthlyInvestment('');
    setInterestRate('');
    setDuration('');
    setResult(null);
    setError('');
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'SIP Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Monthly Investment*"
            placeholder="Enter amount"
            unit="Rs."
            value={monthlyInvestment}
            onChangeText={(text) => setMonthlyInvestment(text)}
            keyboardType="numeric"
            autoFocus={true}
          />
          <InputField
            label="Expected Rate of Interest*"
            placeholder="Enter annual interest rate"
            unit="%"
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            keyboardType="numeric"
            autoFocus={true}
          />

          <TextInput2
            label="Duration*"
            placeholder="Enter term"
            value={duration}
            onChangeText={(text) => setDuration(text)}
            handleCallback={Callback}
            unitValue={loanTenureUnit}
            onUnitChange={(unit) => {
              setLoanTenureUnit(unit);
              setResult(null);
            }}
            autoFocus={true}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              backgroundColor={colors.primary}
              color="#fff"
              buttonText="Calculate"
              onPress={calculateSIP}
            />

            <CustomButton
              backgroundColor={colors.lightGrey}
              color={colors.textColor}
              buttonText="Reset"
              onPress={resetFields}
            />
          </View>
        </View>
        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {result !== null && (
          <Result
            sipInvestmentAmount={
              loanTenureUnit === 'year'
                ? (monthlyInvestment * 12).toFixed(2)
                : monthlyInvestment
            }
            sipTotalReturn={result}
            sipTotalProfit={
              loanTenureUnit === 'year'
                ? (
                    parseFloat(result) -
                    parseFloat(monthlyInvestment * 12)
                  ).toFixed(2)
                : (
                    parseFloat(result) - parseFloat(monthlyInvestment)
                  ).toFixed(2)
            }
            activity="sipResult"
          ></Result>
        )}
      </ScrollView>
      <View>
        <BannerAd />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backStyle: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SipCalc;

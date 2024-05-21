import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Result from '../components/Result';
import { format } from 'date-fns';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function PpfCalc() {
  const [depositAmount, setDepositAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [investmentDate, setInvestmentDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [investDate, setInvestDate] = useState('');
  const [matureDate, setMatureDate] = useState('');
  const [loanTenureUnit, setLoanTenureUnit] = useState('');

  const Toastalert = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const handleCalculate = () => {
    if (
      !depositAmount ||
      !interestRate ||
      !duration ||
      !investmentDate
    ) {
      Toastalert('All fields are required!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'year' && depositAmount > 1000000) {
      Toastalert('Principle amount should be less than 1000000!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'year' && duration > 30) {
      Toastalert('InvestmentTerm should be less than 30!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'month' && duration > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setCalculatedValue(null);
      return;
    }

    const principal = parseFloat(depositAmount);
    const rate = parseFloat(interestRate) / 100;
    const tenure = parseInt(duration);

    const maturityAmount =
      ((principal * (Math.pow(1 + rate, tenure) - 1)) / rate) *
      (1 + rate);

    const totalInterestPayable = maturityAmount - principal;

    setCalculatedValue({
      totalInterestPayable: totalInterestPayable.toFixed(2),
      maturityValue: maturityAmount.toFixed(2),
    });
    setValidationMessage('');
    // Formatting investment date
    const parsedDate = new Date(investmentDate);

    const formattedInvestmentDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString(
      'default',
      { month: 'short' }
    )} ${parsedDate.getFullYear()}`;

    setInvestDate(formattedInvestmentDate);

    // Formatting maturity date
    const maturityDate = new Date(parsedDate);
    maturityDate.setFullYear(
      parsedDate.getFullYear() + parseInt(duration)
    );
    const formattedMaturityDate = `${maturityDate.getDate()} ${maturityDate.toLocaleString(
      'default',
      { month: 'short' }
    )} ${maturityDate.getFullYear()}`;

    setMatureDate(formattedMaturityDate);
  };

  const handleReset = () => {
    setDepositAmount('');
    setInterestRate('');
    setDuration('');
    setInvestmentDate('');
    setCalculatedValue(null);
    setValidationMessage('');
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'PPF Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Deposit Amount*"
            placeholder="Enter Deposit amount"
            unit="Rs."
            value={depositAmount}
            onChangeText={(text) => setDepositAmount(text)}
            keyboardType="numeric"
            autoFocus={true}
          />
          <InputField
            label="Rate of Interest*"
            placeholder="Enter annual interest rate"
            unit="%"
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            keyboardType="numeric"
            autoFocus={true}
          />
          <InputField
            label="Duration*"
            placeholder="Enter term"
            unit="Years"
            value={duration}
            onChangeText={(text) => setDuration(text)}
            keyboardType="numeric"
            autoFocus={true}
          />

          <InputField
            label="Investment Date*"
            placeholder="Enter date"
            autoFocus={true}
            unit=""
            icon={true}
            value={investmentDate}
            onChangeText={(text) => setInvestmentDate(text)}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              backgroundColor={colors.primary}
              color="#fff"
              buttonText="Calculate"
              onPress={handleCalculate}
            />

            <CustomButton
              backgroundColor={colors.lightGrey}
              color={colors.textColor}
              buttonText="Reset"
              onPress={handleReset}
            />
          </View>
        </View>

        {validationMessage !== '' && (
          <Text style={styles.validationText}>
            {validationMessage}
          </Text>
        )}

        {calculatedValue !== null && (
          <Result
            // ppfInvestmentAmount={depositAmount}
            ppfInvestmentAmount={parseFloat(depositAmount).toFixed(2)}
            totalPPFInterest={calculatedValue.totalInterestPayable}
            ppfMaturityValue={calculatedValue.maturityValue}
            ppfInvestmentDate={investDate}
            ppfMaturityDate={matureDate}
            activity="ppfResult"
          />
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
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textColor,
  },
  resultText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  validationText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
});

export default PpfCalc;

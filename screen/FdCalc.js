import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Result from '../components/Result';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput2 from '../components/InputField2';
import { format, isFuture } from 'date-fns';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function FdCalc() {
  const [principalAmount, setPrincipalAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [investmentTerm, setInvestmentTerm] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [investmentDate, setInvestmentDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [investDate, setInvestDate] = useState('');
  const [matureDate, setMatureDate] = useState('');
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

  const handleCalculate = () => {
    if (!principalAmount || !interestRate || !investmentTerm) {
      Toastalert('All fields are required!');
      setCalculatedValue(null);
      return;
    } else if (
      loanTenureUnit === 'year' &&
      principalAmount > 1000000
    ) {
      Toastalert('Principle amount should be less than 1000000!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'year' && investmentTerm > 30) {
      Toastalert('InvestmentTerm should be less than 30!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'month' && investmentTerm > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setCalculatedValue(null);
      return;
    }

    const principal = parseFloat(principalAmount);
    const interestRatePerYear = parseFloat(interestRate) / 100;
    let calculatedTerm = parseInt(investmentTerm);

    if (loanTenureUnit === 'year') {
      calculatedTerm *= 12;
    }

    const interest =
      principal * interestRatePerYear * (calculatedTerm / 12);
    const maturityValue = principal + interest;

    setCalculatedValue({
      interest: interest.toFixed(2),
      maturityValue: maturityValue.toFixed(2),
    });
    setValidationMessage('');
    if (loanTenureUnit === 'year') {
      // FORMATTING INVESTMENT DATE
      const parsedDate = new Date(investmentDate);

      const formattedInvestmentDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${parsedDate.getFullYear()}`;

      setInvestDate(formattedInvestmentDate);

      // FORMATTING MATURITY DATE
      const maturityDate = new Date(parsedDate);
      maturityDate.setFullYear(
        parsedDate.getFullYear() + parseInt(investmentTerm)
      );
      const formattedMaturityDate = `${maturityDate.getDate()} ${maturityDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${maturityDate.getFullYear()}`;

      setMatureDate(formattedMaturityDate);
    } else {
      // FORMATTING INVESTMENT DATE
      const parsedDate = new Date(investmentDate);

      const formattedInvestmentDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${parsedDate.getFullYear()}`;

      setInvestDate(formattedInvestmentDate);

      // FORMATTING MATURITY DATE
      const maturityDate = new Date(parsedDate);
      maturityDate.setMonth(
        parsedDate.getMonth() + parseInt(investmentTerm)
      );
      const formattedMaturityDate = `${maturityDate.getDate()} ${maturityDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${maturityDate.getFullYear()}`;

      setMatureDate(formattedMaturityDate);
    }
  };

  const handleReset = () => {
    setPrincipalAmount('');
    setInterestRate('');
    setInvestmentTerm('');
    setValidationMessage('');
    setCalculatedValue(null);
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'FD Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Principal Amount*"
            placeholder="Enter principal amount"
            unit="Rs."
            value={principalAmount}
            onChangeText={(text) => setPrincipalAmount(text)}
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
          {/* <InputField
            label="Investment Term*"
            placeholder="Enter term in years"
            unit="Years"
            value={investmentTerm}
            investmentTerm={investmentTerm}
            onChangeText={(text) => setInvestmentTerm(text)}
            keyboardType="numeric"
          /> */}
          <TextInput2
            label="Investment Term*"
            placeholder="Enter term"
            autoFocus={true}
            value={investmentTerm}
            handleCallback={Callback}
            onChangeText={(text) => setInvestmentTerm(text)}
            unitValue={loanTenureUnit}
            onUnitChange={(unit) => {
              setLoanTenureUnit(unit);
              setCalculatedValue(null);
            }}
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
            fdInvestmentAmount={parseFloat(principalAmount).toFixed(
              2
            )}
            totalFDInterest={calculatedValue.interest}
            fdMaturityValue={calculatedValue.maturityValue}
            fdInvestmentDate={investDate}
            fdMaturityDate={matureDate}
            activity="fdResult"
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
  validationText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FdCalc;

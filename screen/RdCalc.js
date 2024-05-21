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
import { format } from 'date-fns';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function RdCalc() {
  const [depositAmount, setDepositAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [savingTerm, setSavingTerm] = useState('');
  const [investmentDate, setInvestmentDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [validationMessage, setValidationMessage] = useState('');
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [loanTenureUnit, setLoanTenureUnit] = useState('year');
  const [investDate, setInvestDate] = useState('');
  const [matureDate, setMatureDate] = useState('');
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
    if (
      !depositAmount ||
      !interestRate ||
      !savingTerm ||
      !investmentDate
    ) {
      Toastalert('All fields are required!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'year' && depositAmount > 1000000) {
      Toastalert('Principle amount should be less than 1000000!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'year' && savingTerm > 30) {
      Toastalert('InvestmentTerm should be less than 30!');
      setCalculatedValue(null);
      return;
    } else if (loanTenureUnit === 'month' && savingTerm > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setCalculatedValue(null);
      return;
    }

    const P = parseFloat(depositAmount);
    const r = parseFloat(interestRate) / 100;

    if (loanTenureUnit != 'year') {
      let totalTime = parseInt(savingTerm);
      let a = 0;
      for (let i = totalTime; i > 0; i--) {
        let M = P * (1 + r / 4) ** ((4 * i) / 12);
        a += M;
      }
      setCalculatedValue({
        maturityValue: a.toFixed(2),
        totalInterestPayable: P * totalTime,
      });
      setValidationMessage('');
    } else {
      let totalTime = parseInt(savingTerm) * 12;
      let a = 0;
      for (let i = totalTime; i > 0; i--) {
        let M = P * (1 + r / 4) ** ((4 * i) / 12);
        a += M;
      }
      setCalculatedValue({
        maturityValue: a.toFixed(2),
        totalInterestPayable: P * totalTime,
      });
      setValidationMessage('');
    }

    if (loanTenureUnit === 'year') {
      // FORMATTING INVESTMENT DATE
      const parsedDate = new Date(investmentDate);

      const formattedInvestmentDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${parsedDate.getFullYear()}`;

      setInvestDate(formattedInvestmentDate);

      // FORMATTING MATURITY DATE in year
      const maturityDate = new Date(parsedDate);
      maturityDate.setFullYear(
        parsedDate.getFullYear() + parseInt(savingTerm)
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

      // FORMATTING MATURITY  date in month
      const maturityDate = new Date(parsedDate);
      maturityDate.setMonth(
        parsedDate.getMonth() + parseInt(savingTerm)
      );
      const formattedMaturityDate = `${maturityDate.getDate()} ${maturityDate.toLocaleString(
        'default',
        { month: 'short' }
      )} ${maturityDate.getFullYear()}`;

      setMatureDate(formattedMaturityDate);
    }
  };

  const calculated = () => {
    const P = parseFloat(depositAmount);
    const r = parseFloat(interestRate) / 100;
    const n = 12;
    const t = parseInt(savingTerm);

    if (loanTenureUnit === 'year') {
      savingTerm *= 12;
    }
    const M =
      P *
      ((Math.pow(1 + r / n, n * t) - 1) /
        (1 - Math.pow(1 + r / n, -1 / 3)));

    // console.log(".............................", M.toFixed(2));
  };
  const handleReset = () => {
    setDepositAmount('');
    setInterestRate('');
    setSavingTerm('');
    setInvestmentDate('');
    setValidationMessage('');
    setCalculatedValue(null);
    // setLoanTenureUnit("year");
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'Rd Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Monthly Deposit*"
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
          {/* <InputField
            label="Saving Term*"
            placeholder="Enter term"
            unit="Months"
            value={savingTerm}
            onChangeText={(text) => setSavingTerm(text)}
            keyboardType="numeric"
          /> */}
          <TextInput2
            label="Saving Term*"
            placeholder="Enter term"
            value={savingTerm}
            handleCallback={Callback}
            autoFocus={true}
            unitValue={loanTenureUnit}
            onChangeText={(text) => setSavingTerm(text)}
            onUnitChange={(unit) => {
              setLoanTenureUnit(unit);
              setCalculatedValue(null);
            }}
          />

          <InputField
            label="Investment Date*"
            placeholder="Enter date"
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
            rdInvestmentAmount={parseFloat(depositAmount).toFixed(2)}
            totalRDInterest={parseFloat(
              calculatedValue.totalInterestPayable
            ).toFixed(2)}
            rdMaturityValue={calculatedValue.maturityValue}
            rdInvestmentDate={investDate}
            rdMaturityDate={matureDate}
            activity="rdResult"
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
  resultText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default RdCalc;

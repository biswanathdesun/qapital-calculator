import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  Keyboard,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import PieComponent from '../components/PieChart';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Result from '../components/Result';
import TextInput2 from '../components/InputField2';
import { BannerAd, InterstitialAd } from '../components/Advertise';

const WINDOW_HEIGHT = Dimensions.get('window').height;

function EmiCalc() {
  const [interest, setInterest] = useState(null);
  const [principalAmount, setPrincipalAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiResult, setEmiResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loanTenureUnit, setLoanTenureUnit] = useState('year');
  const [totalPayment, setTotalPayment] = useState('');
  const [childData, setChildData] = useState('');

  const Callback = (childData) => {
    setChildData(childData);
  };

  const Toastalert = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const calculateEMI = () => {
    if (!principalAmount || !interestRate || !loanTenure) {
      // setShowError("All fields are required!");
      Toastalert('All fields are required!');
      setEmiResult(null);
      return;
    } else if (
      loanTenureUnit === 'year' &&
      principalAmount > 1000000
    ) {
      Toastalert('Principle amount should be less than 1000000!');
      setEmiResult(null);

      return;
    } else if (loanTenureUnit === 'year' && loanTenure > 30) {
      Toastalert('InvestmentTerm should be less than 30!');

      setEmiResult(null);
      return;
    } else if (loanTenureUnit === 'month' && loanTenure > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setEmiResult(null);
      return;
    }

    setShowError(false);
    const principal = parseFloat(principalAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    let tenure = parseFloat(loanTenure);

    if (loanTenureUnit === 'year') {
      tenure *= 12;
    }
    // EMI CALCULATION
    const emi =
      (principal * interest * Math.pow(1 + interest, tenure)) /
      (Math.pow(1 + interest, tenure) - 1);

    const totalPayment = (emi * tenure).toFixed(2);
    setTotalPayment(totalPayment);

    // TOTAL INTEREST PAYABLE CALCULATION
    const totalInterestPayable = (
      parseFloat(totalPayment) - parseFloat(principal)
    ).toFixed(2);
    setInterest(totalInterestPayable);

    // SETTING EMI
    setEmiResult(emi.toFixed(2));
  };

  const resetFields = () => {
    setPrincipalAmount('');
    setInterestRate('');
    setLoanTenure('');
    setEmiResult(null);
    setShowError(false);
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'Emi Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Principal Amount *"
            placeholder="Enter principal amount"
            unit="Rs."
            value={principalAmount}
            onChangeText={(text) => setPrincipalAmount(text)}
            keyboardType="numeric"
            icon={false}
            autoFocus={true}
          />
          <InputField
            label="Interest*"
            placeholder="Enter annual interest"
            unit="%"
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            keyboardType="numeric"
            icon={false}
            autoFocus={true}
          />

          <TextInput2
            label="Loan Tenure*"
            placeholder="Enter term"
            autoFocus={true}
            value={loanTenure}
            handleCallback={Callback}
            unitValue={loanTenureUnit}
            onChangeText={(val) => setLoanTenure(val)}
            onUnitChange={(unit) => {
              setLoanTenureUnit(unit);
              setEmiResult(null);
            }}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              backgroundColor={colors.primary}
              color="#fff"
              buttonText="Calculate"
              // onPress={calculateEMI}
              onPress={() => {
                calculateEMI();
              }}
            />
            <CustomButton
              backgroundColor={colors.lightGrey}
              color={colors.textColor}
              buttonText="Reset"
              onPress={resetFields}
            />
          </View>
          {showError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{showError}</Text>
            </View>
          )}
        </View>
        {emiResult !== null && (
          <Result
            interest={parseFloat(interest)}
            principal={parseFloat(principalAmount).toFixed(2)}
            // emiTotalPayment={parseFloat(interest) + parseFloat(principalAmount)}
            emiTotalPayment={totalPayment}
            emi={emiResult}
            // emiResult={true}
            activity="emiResult"
          >
            <PieComponent
              interest={interest}
              principal={parseFloat(principalAmount).toFixed(2)}
              text1="Total Interest Payable"
              text2="Total Principal Amount"
            />
          </Result>
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
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
});

export default EmiCalc;

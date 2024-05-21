import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Result from '../components/Result';
import TextInput2 from '../components/InputField2';
import PieComponent from '../components/PieChart';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function InterestRateCalc() {
  const [principal, setPrincipal] = useState('');
  const [emi, setEmi] = useState('');
  const [time, setTime] = useState('');
  const [ans, setAns] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [validationMessage, setValidationMessage] = useState('');
  const [showError, setShowError] = useState('');
  const [showError2, setShowError2] = useState(false);
  const [loanTenureUnit, setLoanTenureUnit] = useState('year');
  const [childData, setChildData] = useState('');
  const [rate, setRate] = useState('');

  const handlePrincipal = (data) => {
    setPrincipal(data);
  };

  const Callback = (childData) => {
    setChildData(childData);
  };

  const handleEmi = (data) => {
    setEmi(data);
  };

  const handleTime = (data) => {
    setTime(data);
  };

  const Toastalert = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const calculateLoan = () => {
    console.log('...........................');
    if (!principal || !emi || !time) {
      // setShowError("All fields are required!");
      Toastalert('All fields are required!');
      setAns(null);
      return;
    } else if (loanTenureUnit === 'year' && principal > 1000000) {
      Toastalert('Principle amount should be less than 1000000!');
      setAns(null);
      return;
    } else if (loanTenureUnit === 'year' && time > 30) {
      Toastalert('InvestmentTerm should be less than 30!');
      setAns(null);
      return;
    } else if (loanTenureUnit === 'month' && time > 360) {
      Toastalert('InvestmentTerm should be less than 360!');
      setAns(null);
      return;
    }
    const P = parseFloat(principal);
    const EMI = parseFloat(emi);
    // const n = parseFloat(time) * 12;
    let n = parseFloat(time);
    const a = EMI / P;
    const b = 1 / n;

    if (loanTenureUnit === 'year') {
      n *= 12;
    }
    const totalPaymentCalculated = EMI * n;
    const totalInterestPaid = totalPaymentCalculated - P;
    if (totalInterestPaid < 0) {
      setShowError2(true);
    } else {
      setAns(P);

      setTotalPayment(totalPaymentCalculated);
      setTotalPrincipal(P);
      setTotalInterest(totalInterestPaid);
      console.log(totalPaymentCalculated);
      console.log(totalInterestPaid);
      console.log(totalPayment);
      console.log(
        (
          (parseInt(totalInterest) / parseInt(totalPayment)) *
          100
        ).toFixed(2)
      );

      // rate
      // const intRate = EMI / P / Math.pow(1 / (1 + EMI / P), n) - 1;
      // const intRate = EMI / totalPayment;
      // setRate(intRate.toFixed(2));
    }
  };

  const handleCalculate = () => {
    if (!principal || !emi || !time) {
      setShowError(true);
      setAns(null);
      calculateLoan();
      return;
    }
    setShowError(false);
    setShowError2(false);
    calculateLoan();
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'Interest Rate'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Principal Amount*"
            placeholder="Enter principal amount"
            unit="Rs."
            value={principal}
            onChangeText={handlePrincipal}
            keyboardType="numeric"
            autoFocus={true}
          />
          <InputField
            label="EMI (Monthly Payment)*"
            placeholder="Enter EMI amount"
            unit="Rs."
            value={emi}
            onChangeText={handleEmi}
            keyboardType="numeric"
            autoFocus={true}
          />

          <TextInput2
            label="Loan Tenure*"
            placeholder="Enter term"
            autoFocus={true}
            value={time}
            handleCallback={Callback}
            unitValue={loanTenureUnit}
            onChangeText={(val) => setTime(val)}
            onUnitChange={(unit) => {
              setLoanTenureUnit(unit);
              // setEmiResult(null);
              setAns(null);
            }}
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
              onPress={() => {
                setPrincipal('');
                setEmi('');
                setTime('');
                setAns(null);
                setShowError(false);
                setShowError2(false);
              }}
            />
          </View>
          {showError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{showError}</Text>
            </View>
          )}
          {showError2 && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Please enter valid value
              </Text>
            </View>
          )}
        </View>
        {ans !== null && (
          <Result
            interest={Math.floor(
              (parseInt(totalInterest) / parseInt(totalPayment)) * 100
            )}
            // interest={rate}
            totalPayment={totalPayment.toFixed(2)}
            activity="interestResult"
          >
            <PieComponent
              interest={totalInterest.toFixed(2)}
              principal={totalPrincipal.toFixed(2)}
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
  resultText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
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

export default InterestRateCalc;

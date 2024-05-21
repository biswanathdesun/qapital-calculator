import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { RadioButton } from 'react-native-paper';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Result from '../components/Result';
import { ScrollView } from 'react-native';
import { BannerAd, InterstitialAd } from '../components/Advertise';

function GstCalc() {
  const [initialAmount, setInitialAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [checked, setChecked] = useState('add');
  const [error, setError] = useState('');
  const [gstResult, setGstResult] = useState(null);

  const Toastalert = (text) => {
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const calculateGst = () => {
    if (!initialAmount || !gstRate) {
      Toastalert('Please fill in all fields');
      setGstResult(null);
      return;
    } else if (initialAmount > 1000000) {
      Toastalert('Principle amount should be less than 1000000!');
      setGstResult(null);

      return;
    }

    const initial = parseFloat(initialAmount);
    const rate = parseFloat(gstRate);

    let result = 0;
    if (checked === 'add') {
      result = initial + (initial * rate) / 100;
    } else if (checked === 'remove') {
      result = initial - (initial * rate) / (100 + rate);
    }
    setError('');

    setGstResult(result.toFixed(2));
  };

  const resetFields = () => {
    setInitialAmount('');
    setGstRate('');
    setChecked('add');
    setError('');
    setGstResult(null);
  };

  return (
    <SafeAreaView>
      <Header leftIconName={false} title={'GST Calculation'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.backStyle}>
          <InputField
            label="Initial Amount*"
            placeholder="Enter initial amount"
            unit="Rs."
            value={initialAmount}
            icon={false}
            onChangeText={(text) => setInitialAmount(text)}
            keyboardType="numeric"
            autoFocus={true}
          />
          <InputField
            label="Rate of GST*"
            placeholder="Enter GST Rate"
            unit="%"
            value={gstRate}
            icon={false}
            onChangeText={(text) => setGstRate(text)}
            keyboardType="numeric"
            autoFocus={true}
          />
          <View style={styles.radioContainer}>
            <View style={styles.radio}>
              <RadioButton
                value="add"
                status={checked === 'add' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('add');
                  setGstResult(null);
                }}
                color={colors.primary}
              />
              <Text style={styles.textStyle}>Add GST</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="remove"
                status={
                  checked === 'remove' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setChecked('remove');
                  setGstResult(null);
                }}
                color={colors.primary}
              />
              <Text style={styles.textStyle}>Remove GST</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              backgroundColor={colors.primary}
              color="#fff"
              buttonText="Calculate"
              onPress={calculateGst}
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

        {gstResult !== null && (
          <Result
            gstInitialAmount={parseFloat(initialAmount).toFixed(2)}
            gstAmount={
              checked === 'add'
                ? (gstResult - initialAmount).toFixed(2) < 0
                  ? (gstResult - initialAmount).toFixed(2) * -1
                  : (gstResult - initialAmount).toFixed(2)
                : (initialAmount - gstResult).toFixed(2) < 0
                ? (initialAmount - gstResult).toFixed(2) * -1
                : (initialAmount - gstResult).toFixed(2)
            }
            gstResult={gstResult}
            activity="gstResult"
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
  radioContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radio: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 5,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default GstCalc;

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import { BannerAd, InterstitialAd } from '../components/Advertise';

const Home = () => {
  const navigation = useNavigation();
  const navigateToEMICalculator = () => {
    navigation.navigate('EmiCalc');
  };
  const navigateToInterestRate = () => {
    navigation.navigate('InterestRateCalc');
  };
  const navigateToGstRate = () => {
    navigation.navigate('GstCalc');
  };
  const navigateToSip = () => {
    navigation.navigate('SipCalc');
  };
  const navigateToFD = () => {
    navigation.navigate('FdCalc');
  };
  const navigateToRD = () => {
    navigation.navigate('RdCalc');
  };
  const navigateToPPF = () => {
    navigation.navigate('PpfCalc');
  };

  const renderOption = (icon, text, onPressAction) => (
    <TouchableOpacity
      onPress={onPressAction}
      style={styles.optionCard}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: colors.lightGrey2,
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton icon={icon} color={colors.black} size={24} />
      </View>

      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header leftIconName={true} title={'Qapital Calculator'} />
      <InterstitialAd />
      <BannerAd />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>
            Finance Planner Tools
          </Text>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <View style={styles.optionRow}>
                {renderOption(
                  'calculator',
                  'EMI Calculator',
                  navigateToEMICalculator
                )}
                {renderOption(
                  'percent-outline',
                  'Interest Rate',
                  navigateToInterestRate
                )}
                {/* <OptionCard icon="clock" text="Loan Period" /> */}
              </View>
            </Card>
          </View>
        </View>
        <BannerAd />
        <View>
          <Text style={styles.sectionTitle}>Banking Calculator</Text>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <View style={styles.optionRow}>
                {renderOption(
                  'chart-bar',
                  'GST Calculator',
                  navigateToGstRate
                )}
                {renderOption(
                  'chart-line',
                  'SIP Calculator',
                  navigateToSip
                )}
                {renderOption(
                  'database-lock',
                  'FD Calculator',
                  navigateToFD
                )}
                {renderOption('clock', 'RD Calculator', navigateToRD)}
                {renderOption(
                  'bank',
                  'PPF Calculator',
                  navigateToPPF
                )}
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
      <BannerAd />
    </SafeAreaView>
  );
};

const OptionCard = ({ icon, text }) => {
  return (
    <View style={styles.optionCard}>
      <IconButton icon={icon} color="black" size={24} />
      <Text style={styles.optionText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  cardContainer: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionCard: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Home;

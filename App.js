import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/Navigation";
import ErrorBoundary from "react-native-error-boundary";
import mobileAds from 'react-native-google-mobile-ads';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';

export default function App() {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log("Initialized");
        setIsReady(true);
         // Initialization complete!
      });
  }, [])

  useEffect(() => {
    console.log(isReady)
    isReady ? AppOpenAd.createForAdRequest(TestIds.APP_OPEN) : null
  },[isReady])

  return (
    <ErrorBoundary>
    <View style={styles.container}>
      <Navigation />
    </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

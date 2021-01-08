import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import {useState} from 'react';
import {set} from 'react-native-reanimated';
import {useEffect} from 'react';
import AuthStack from '../navigation/AuthStack';

const SplashScreenScreen = ({navigation}) => {
  const {load, setLoad} = useContext(AuthContext);
  // useEffect(() => {
  //   console.log(load);
  //   if (!load) {
  //     navigation.replace('SignInScreen');
  //   }
  // }, [load]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop={false}
        speed={0.7}
        onAnimationFinish={() => {
          console.log('Finished');
          navigation.replace('SignInScreen');
          // setLoad(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default SplashScreenScreen;

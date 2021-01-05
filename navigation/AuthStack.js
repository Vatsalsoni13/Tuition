import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ChoiceScreen from '../screens/ChoiceScreen';
import {useState} from 'react';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    GoogleSignin.configure({
      webClientId:
        '594922811541-lgrc0propvfhve0bfas6rckqqbupv31t.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'SplashScreen';
  } else {
    routeName = 'SignInScreen';
  }
  return (
    <Stack.Navigator initialRouteName={routeName} headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen}  options={{
         headerShown: false,
        }} />
      <Stack.Screen name="SignInScreen" component={SignInScreen}  options={{
         headerShown: false,
        }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{
         headerShown: false,
        }} />
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen}  options={{
         headerShown: false,
        }} />
    </Stack.Navigator>
  );
};

export default AuthStack;

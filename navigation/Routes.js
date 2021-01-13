import React, {useContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import IntoductionScreen from '../screens/IntoductionScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Toast = ({visible, message}) => {
  if (!visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
    return null;
  }
  return null;
};
const Routes = () => {
  const {user, setUser, verify, setVerify, logout} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  // const [verify, setVerify] = useState(false);
  let verifyAlert = false;
  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log('USS', user, verify);
    if (user) setVerify(auth().currentUser.emailVerified);
    //   // verifyAlert = auth().currentUser.emailVerified;
    //   // console.log('Vatsal', user);
    //   // if (!verifyAlert) {
    //   //   // <Toast message="Please check your email!" visible={verify} />;
    //   //   // logout();
    //   //   auth().signOut();
    //   // }
    // }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default Routes;

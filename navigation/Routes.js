import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {Alert} from 'react-native';

const Routes = () => {
  const {user, setUser, logout} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  let verify = false;
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      verify = auth().currentUser.emailVerified;
      if (!verify) {
        logout();
        Alert.alert(
          'Oops',
          'Please check your email, we have sent you verification link and sign in!',
        );
      }
    }

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

import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

export const AuthContext = createContext();
import {GoogleSignin} from '@react-native-community/google-signin';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .catch((e) => {
                Alert.alert('Error', e.message.slice(e.message.indexOf(' ')));
              });
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log({e});
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                auth().currentUser.sendEmailVerification();
              })
              .catch((e) => {
                Alert.alert('Error', e.message.slice(e.message.indexOf(' ')));
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .catch((e) => {
                Alert.alert('Error', e.message.slice(e.message.indexOf(' ')));
              });
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';

export const AuthContext = createContext();
import {GoogleSignin} from '@react-native-community/google-signin';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createUser, getUser} from '../utils/apiCalls';
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(false);
  const [check, setCheck] = useState(false);
  const validate = async (username) => {
    await createUser(username)
      .then((data) => {
        if (data) {
          console.log('Success');
        }
      })
      .catch((e) => {
        console.log(e);
      });
    auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        console.log('out');
        if (!auth().currentUser.emailVerified) {
          console.log('current');
          Alert.alert(
            'Oops',
            'Please check your email, we have sent you verification link and sign in!',
          );
          auth()
            .signOut()
            .then(() => {
              console.log('Success');
              // setVerify(false);
            })
            .catch((e) => {
              console.log('STATS', e);
            });
        }
        console.log('Inside SingUp');
      });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        verify,
        setVerify,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              // .then(async () => {
              //   await getUser(email)
              //     .then(() => {
              //       console.log('SignedIn');
              //     })
              //     .catch((err) => {
              //       console.log(err);
              //     });
              // })
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
            return auth()
              .signInWithCredential(googleCredential)
              .then(() => {
                console.log('Google', auth().currentUser.email);
                let email = auth().currentUser.email;
                createUser(email)
                  .then((data) => {
                    if (data) {
                      console.log('Success');
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              });
          } catch (e) {
            console.log({e});
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                validate(email);
              })
              .catch((e) => {
                Alert.alert('Err', e.message.slice(e.message.indexOf(' ')));
              });
          } catch (e) {
            console.log('AAA', e);
          }
        },
        logout: async () => {
          try {
            await auth()
              .signOut()
              .then(() => {
                setVerify(false);
                AsyncStorage.removeItem('check');
                AsyncStorage.removeItem('mongoId');
                AsyncStorage.removeItem('email');
              })
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

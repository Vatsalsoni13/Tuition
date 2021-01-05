import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import SocialButton from '../components/SocialButon';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    isValid: true,
    isValidPassword: true,
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    secureTextEntry1: true,
    // confirm_secureTextEntry: true,
  });

  const {register, googleLogin} = useContext(AuthContext);

  const {
    check_textInputChange,
    confirm_password,
    password,
    secureTextEntry,
    secureTextEntry1,
    username,
    isValid,
    isValidPassword,
  } = data;

  const textInputChange = (val) => {
    if (val.length !== 0 && val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValid: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValid: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const validate = () => {
    if (
      username.length < 4 ||
      password.length < 8 ||
      confirm_password.length < 8
    ) {
      setData({...data, isValid: false});
    } else if (password !== confirm_password) {
      Alert.alert('Error', 'Confirm Password doesnt match!');
    } else register(username, password);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#79e3fe', '#635df8', '#42385D']}
        style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                keyboardType="email-address"
                placeholder="Your Username"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValid ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Username must be 4 characters long.
                </Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={secureTextEntry}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity
                onPress={() =>
                  setData({...data, secureTextEntry: !secureTextEntry})
                }>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Confirm Your Password"
                secureTextEntry={secureTextEntry1}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleConfirmPasswordChange(val)}
              />
              <TouchableOpacity
                onPress={() =>
                  setData({...data, secureTextEntry1: !secureTextEntry1})
                }>
                {data.secureTextEntry1 ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                By signing up you agree to our
              </Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {' '}
                Terms of service
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
                {''}
                Privacy policy
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  validate();
                }}>
                <LinearGradient
                  colors={['#99c2ff', '#635df8']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign Up
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#635df8',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#635df8',
                    },
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {
                  googleLogin();
                }}
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,

    marginTop: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});

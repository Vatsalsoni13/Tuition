import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';

const IntoductionScreen = ({navigation}) => {
  const {colors} = useTheme();
  // const [val, setVal] = useState(null);
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true');
  //       setVal(false);
  //     } else {
  //       setVal(true);
  //       navigation.replace('SignInScreen');
  //     }
  //   });
  // }, []);
  // if (val) return null;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#79e3fe', '#635df8', '#42385D']}
        style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="2500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
          animation="fadeInUpBig">
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            Stay connected with everyone!
          </Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SplashScreen')}>
              <LinearGradient
                colors={['#80b3ff', '#635df8']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Get Started</Text>
                {/* <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    /> */}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};

export default IntoductionScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

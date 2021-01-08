import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {updateUser} from '../utils/apiCalls';

const EditProfileScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [location, setLocation] = useState('');

  // const editProfile = () => {};
  useEffect(() => {
    AsyncStorage.getItem('email').then((value) => {
      setEmail(value);
    });
  }, []);

  return (
    <ImageBackground source={require('../profile.jpg')} style={styles.image}>
      <ScrollView style={styles.container}>
        <Animatable.View style={styles.container} animation="zoomIn">
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {email}
            </Text>
          </View>
          <View
            style={{paddingVertical: 60, paddingHorizontal: 60, marginTop: 40}}>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="white" size={20} />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#e0dede"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                value={name}
                onChangeText={(name) => {
                  setName(name);
                }}
              />
            </View>

            <View style={styles.action}>
              <Feather name="phone" color="white" size={20} />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#e0dede"
                keyboardType="number-pad"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                value={phone}
                onChangeText={(phone) => {
                  setPhone(phone);
                }}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome5 name="user-graduate" color="white" size={20} />

              {/* <FontAwesome name="envelope-o" color={colors.text} size={20} /> */}
              <TextInput
                placeholder="Qualification"
                placeholderTextColor="#e0dede"
                keyboardType="email-address"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                value={qualification}
                onChangeText={(qualification) => {
                  setQualification(qualification);
                }}
              />
            </View>
            <View style={styles.action}>
              <Icon name="map-marker-outline" color="white" size={20} />
              <TextInput
                placeholder="Location"
                placeholderTextColor="#e0dede"
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                value={location}
                onChangeText={(location) => {
                  setLocation(location);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.signIn}
              onPress={async () => {
                updateUser(name, qualification, location, phone).then(() => {
                  navigation.replace('ChoiceScreen');
                });
              }}>
              <LinearGradient
                colors={['#70416d', '#170a19']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  EDIT PROFILE
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signIn: {
    width: 250,
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',

    paddingTop: 60,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#a6a6a6',
    paddingBottom: 5,
    width: 300,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const EditProfileScreen = () => {
  const {colors} = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [location, setLocation] = useState('');
  return (
    <LinearGradient colors={['#e8ffde', '#f8fff5']} style={styles.container}>
      <View style={styles.container}>
        <Animatable.View animation="zoomIn">
          <View
            style={{
              // paddingHorizontal: 30,
              margin: 20,
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 40}}>Edit Profile</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              John Doe
            </Text>
          </View>
          <View style={{margin: 20}}>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#666666"
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
              <Feather name="phone" color={colors.text} size={20} />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
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
              <FontAwesome5
                name="user-graduate"
                color={colors.text}
                size={20}
              />

              {/* <FontAwesome name="envelope-o" color={colors.text} size={20} /> */}
              <TextInput
                placeholder="Qualification"
                placeholderTextColor="#666666"
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
              <Icon name="map-marker-outline" color={colors.text} size={20} />
              <TextInput
                placeholder="Location"
                placeholderTextColor="#666666"
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
              style={styles.commandButton}
              onPress={() => {
                console.log('Clicked');
              }}>
              <Text style={styles.panelButtonTitle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a6a6a6',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

import React from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {Avatar, Title, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = ({navigation}) => {
  return (
    <LinearGradient colors={['#e8ffde', '#f8fff5']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Animatable.View animation="zoomIn">
          <View
            style={{
              paddingHorizontal: 30,
              // height: 50,
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 40}}>Profile</Text>
            <FontAwesome
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}
              name="edit"
              size={25}
            />
          </View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animatable.Image
                source={require('../assets/profile.png')}
                style={{height: 170, width: 300}}
              />
              <View style={{alignItems: 'center'}}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}>
                  John Doe
                </Title>
                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={30} />
              <Text style={styles.textStyle}>john_doe@email.com</Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={30} />
              <Text style={styles.textStyle}>Kolkata, India</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={30} />
              <Text style={styles.textStyle}>+91-900000009</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="user-graduate" color="#777777" size={30} />
              <Text style={styles.textStyle}>BE Engineering</Text>
            </View>
          </View>
        </Animatable.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 25,
  },
});

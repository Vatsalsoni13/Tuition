import React from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions,ImageBackground} from 'react-native';
import {Avatar, Title, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  return (
   
  
    
      <ImageBackground source={require('../profile.jpg')} style={styles.image}>
      <ScrollView style={styles.container}>
        <Animatable.View animation="zoomIn">
          <View
            style={{
              paddingHorizontal: 30,
              // height: 50,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 35,color:"#fdcfdf",fontWeight:'bold'}}>PROFILE</Text>
            <FontAwesome
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}
              name="edit"
              size={25}
              style={{color:"#fbf6f0"}}
            />
          </View>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animatable.Image
                source={require('../assets/profile_icon.png')}
                style={{height: 300, width: 300}}
              />
              <View style={{alignItems: 'center',margin:30}}>
                <Title
                  style={[
                    styles.title,
                    {
                     
                      fontSize:30,
                    },
                  ]}
                  >
                  John Doe
                </Title>
                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="email" color="black" size={30} />
              <Text style={styles.textStyle}>john_doe@email.com</Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="black" size={30} />
              <Text style={styles.textStyle}>Kolkata, India</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="black" size={30} />
              <Text style={styles.textStyle}>+91-900000009</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="user-graduate" color="black" size={30} />
              <Text style={styles.textStyle}>BE Engineering</Text>
            </View>
          </View>
        </Animatable.View>
        </ScrollView>
        </ImageBackground>
     
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
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
    color: '#31112c',
    marginLeft: 20,
    fontSize: 25,
  },
});

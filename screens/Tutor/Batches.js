import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Batches = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
      {/* <ActionButton
        buttonColor="#d8345f"
        size={65}
        onPress={() => {
          navigation.navigate('CreateBatch');
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          // add icon
          //navigate to Add Contact screen
          navigation.navigate('BatchPanel');
        }}
        // style={styles.floatButton}
      >
        <Text>Inside Button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // add icon
          //navigate to Add Contact screen
          navigation.navigate('CreateBatch');
        }}
        style={styles.floatButton}>
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
});

export default Batches;

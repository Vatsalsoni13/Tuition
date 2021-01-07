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
} from 'react-native';

import ActionButton from 'react-native-action-button';

const Batches = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
      <ActionButton
        buttonColor="#d8345f"
        size={65}
        onPress={() => {
          navigation.navigate('CreateBatch');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Batches;

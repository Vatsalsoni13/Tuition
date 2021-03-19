import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NetworkContext} from '../../navigation/BatchPanel';
const Calendar = ({navigation}) => {
  const batchId = useContext(NetworkContext);

  return (
    <View style={styles.container}>
      <View>
        <Text>Calendar</Text>
      </View>
      <View style={styles.floatButton}>
        <TouchableOpacity
          onPress={() => {
            console.log(batchId);
            Linking.openURL(
              `https://gcalendar-intuition.herokuapp.com/schedule/${batchId}`,
            )
              .then(() => {
                console.log('Success');
              })
              .catch((e) => {
                console.log(e);
              });
            // navigation.navigate('Gcalendar', {
            //   batchId: batchId,
            // });
          }}>
          <FontAwesome name="calendar-plus-o" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    top: Dimensions.get('screen').height / 2 + 130,
    right: 20,
    opacity: 0.9,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
});

export default Calendar;

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {getAllAssignments} from '../../utils/apiCalls';
import Entypo from 'react-native-vector-icons/Entypo';
import Assignment from '../../components/Assignment';
import AssignmentScreen from './AssignmentScreen';

const Assignments = ({navigation}) => {
  const [filesArr, setFilesArr] = useState([]);

  useEffect(() => {
    setFilesArr([]);
    getAllAssignments().then((data) => {
      // console.log('DATA', data);
      setFilesArr(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image}>
        <View>
          <FlatList
            data={filesArr}
            renderItem={({item}) => (
              <Assignment
                item={item}
                navigation={navigation}
                screen={'AssignmentScreen'}
              />
            )}
            keyExtractor={(item) => item.assignId.toString()}
          />
        </View>
      </ImageBackground>
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
    bottom: 15,
    right: 15,
    // zIndex: 2,
    opacity: 0.9,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
  image: {
    flex: 1,
    backgroundColor: '#fff3e6',
    resizeMode: 'cover',
  },
});

export default Assignments;

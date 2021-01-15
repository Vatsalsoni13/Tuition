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
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {getAllAssignments} from '../../utils/apiCalls';
import Entypo from 'react-native-vector-icons/Entypo';

const Assignments = ({navigation}) => {
  const [filesArr, setFilesArr] = useState([]);

  useEffect(() => {
    setFilesArr([]);
    getAllAssignments().then((data) => {
      // console.log('DATA', data);
      setFilesArr(data);
    });
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#fffef0',
        borderRadius: 15,
        // flexWrap: 'wrap',
      }}>
      <View style={{marginRight: 10}}>
        <Image
          source={{uri: 'https://picsum.photos/536/354'}}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View>
        <TouchableOpacity
          // key={index}
          onPress={() => {
            navigation.navigate('AssignmentScreen', {assignment: item});
          }}>
          <View>
            <Text
              style={{fontSize: 20, padding: 10}}
              numberOfLines={1}
              ellipsizeMode="tail"
              lineBreakMode="tail">
              {item.name}
            </Text>
            <Text style={{paddingLeft: 10}}>{item.istDateTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filesArr}
          renderItem={renderItem}
          keyExtractor={(item) => item.assignId.toString()}
        />
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
    bottom: 15,
    right: 15,
    // zIndex: 2,
    opacity: 0.9,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
});

export default Assignments;

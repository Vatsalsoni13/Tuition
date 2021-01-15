import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AssignmentScreenTutor from '../screens/Tutor/AssignmentScreenTutor';
import AssignmentScreen from '../screens/Student/AssignmentScreen';
const Assignment = ({item, navigation, screen}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#fffef0',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',

        borderLeftWidth: 5,

        // flexWrap: 'wrap',
      }}>
      {console.log(screen)}
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
            navigation.navigate(`${screen}`, {assignment: item});
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
};
export default Assignment;

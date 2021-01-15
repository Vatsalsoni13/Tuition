import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AssignmentScreenTutor from '../screens/Tutor/AssignmentScreenTutor';
import AssignmentScreen from '../screens/Student/AssignmentScreen';
import LinearGradient from 'react-native-linear-gradient';

const Assignment = ({item, navigation, screen}) => {
  return (
    <TouchableOpacity
          // key={index}
          onPress={() => {
            navigation.navigate(`${screen}`, {assignment: item});
          }}>
           
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderBottomWidth:3,
        borderLeftWidth: 5,

        // flexWrap: 'wrap',
      }}>
       <LinearGradient
        colors={[ '#eff8ff','#a7c5eb']}
        style={{flex:1}}>
      {console.log(screen)}
      <View style={{padding:10,display:'flex',flexDirection:'row'}}>
      <View style={{marginRight: 10,flex:1}}>
        <Image
          source={require(`../assets/4.png`)}
          style={{height: 50, width: 50,flex:1}}
        />
      </View>
      <View style={{flex:4}}>
          <View style={{flex:2,alignSelf:'flex-start'}}>
            <Text
              style={{fontSize: 20,paddingBottom:10,fontWeight:'bold'}}
              numberOfLines={1}
              ellipsizeMode="tail"
              lineBreakMode="tail">
              {item.name}
            </Text>
            </View>
            <View style={{flex:1,alignSelf:'flex-start'}}>
            <Text >{item.istDateTime}</Text>
            </View>
      </View>
      </View>
    </LinearGradient>

    </View>
    </TouchableOpacity>
  );
};
export default Assignment;

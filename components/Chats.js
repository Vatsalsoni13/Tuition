import React from 'react';
import {Dimensions, Text, View} from 'react-native';

const Chats = ({item, user}) => {
  return (
    <View
      style={{
        alignSelf: item.userName == user.email ? 'flex-end' : 'flex-start',
        backgroundColor: item.userName != user.email ? '#faf2f2' : '#a7c5eb',
        padding: 10,
        marginVertical: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: item.userName == user.email ? 10 : 0,
        borderBottomRightRadius: item.userName != user.email ? 10 : 0,
        borderColor: '#000',
        borderLeftWidth: 0.7,
        borderTopWidth: 0.5,
        borderRightWidth: 0.7,
        borderBottomWidth: 0.5,
        maxWidth: Dimensions.get('screen').width / 2,
        minWidth: Dimensions.get('screen').width / 2,
      }}>
      <Text style={{fontSize: 15}}>{item.userMessage}</Text>
      <Text style={{fontSize: 10, color: 'grey'}}>
        {new Date(item.time).toLocaleTimeString()}
      </Text>
    </View>
  );
};
export default Chats;

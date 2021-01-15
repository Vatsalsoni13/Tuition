import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button,KeyboardAvoidingView,Dimensions,ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import {NetworkContext} from '../../navigation/StudenBatchPanel';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Chat = () => {
  const batchId = useContext(NetworkContext);
  const {user} = useContext(AuthContext);
  const [text, setText] = useState('');
  const [filesArr, setFilesArr] = useState([]);

  const sendText = async () => {
    const userId = await AsyncStorage.getItem('mongoId').then((value) => {
      return value;
    });
    const userEmail = await AsyncStorage.getItem('email').then((value) => {
      return value;
    });
    // console.log(userId);
    const uniqueKey = database().ref().push().key;
    database().ref(`Chats/${batchId}/${uniqueKey}`).update({
      userId: userId,
      userName: userEmail,
      userMessage: text,
    });
    setText('');
  };
  useEffect(() => {
    setFilesArr([]);
    console.log('USER', batchId);
    const onChildAdded = database()
      .ref(`Chats/${batchId}`)
      .on('child_added', (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFilesArr((files) => [...files, ...helperArr]);
        console.log(snapshot.val());
      });
    return () => database().ref('assignments').off('child_added', onChildAdded);
  }, []);
  return (
    <ImageBackground
    source={require('../../assets/email-pattern.png')}
    style={styles.image}>
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
    {filesArr &&
      filesArr.map((item, index) => (
        <View key={index}>
          <Text
            style={{
              alignSelf:
                item.userName == user.email ? 'flex-end' : 'flex-start',
              backgroundColor:
                item.userName != user.email ? '#faf2f2' : '#a7c5eb',
              padding: 10,
              marginVertical: 5,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: item.userName == user.email ? 10 : 0,
              borderBottomRightRadius: item.userName != user.email ? 10 : 0,
              // borderBottomRightRadius:,
              borderColor: '#000',
              // borderWidth: 0.1,
              borderLeftWidth: 0.7,
              borderTopWidth: 0.5,
              borderRightWidth: 0.7,
              borderBottomWidth: 0.5,
              maxWidth: Dimensions.get('screen').width / 2,
              minWidth: Dimensions.get('screen').width / 2,
            }}
            // key={index}
          >
            {item.userMessage}
          </Text>
        </View>
      ))}
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        // flexWrap: 'nowrap',
        position: 'absolute',
        bottom: 10,
        left: 10,
      }}>
      <TextInput
        value={text}
        placeholder="Enter your message..."
        multiline
        style={{
          borderColor: '#000',
          borderWidth: 1,
          marginRight: 4,
          width: Dimensions.get('screen').width - 70,
          borderRadius: 15,
        }}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <AntDesign
        onPress={() => {
          sendText();
        }}
        name="arrowright"
        size={30}
        style={{backgroundColor: '#96bb7c', borderRadius: 50, padding: 10,borderWidth:2,borderColor:'black'}}
      />
    </View>
  </KeyboardAvoidingView>
  </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    backgroundColor: 'white',
  
  },
});

export default Chat;

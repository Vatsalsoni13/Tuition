import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import {NetworkContext} from '../../navigation/BatchPanel';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';

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
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      {filesArr &&
        filesArr.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                alignSelf:
                  item.userName == user.email ? 'flex-end' : 'flex-start',
                backgroundColor:
                  item.userName != user.email ? '#e8fa00' : '#2afc00',
                padding: 10,
                borderRadius: 40,
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
          name="arrowright"
          size={30}
          style={{backgroundColor: '#56ff08', borderRadius: 50, padding: 10}}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Chat;

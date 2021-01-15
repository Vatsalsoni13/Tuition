import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import database from '@react-native-firebase/database';
import {NetworkContext} from '../../navigation/StudenBatchPanel';
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
    <View style={styles.container}>
      {filesArr &&
        filesArr.map((item, index) => (
          <View key={index}>
            <Text
              style={{
                alignSelf:
                  item.userName == user.email ? 'flex-end' : 'flex-start',
              }}
              // key={index}
            >
              {item.userMessage}
            </Text>
          </View>
        ))}
      <TextInput
        value={text}
        style={{borderColor: '#000', borderWidth: 1, marginBottom: 10}}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <Button
        title="Send Message"
        onPress={() => {
          sendText();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Chat;

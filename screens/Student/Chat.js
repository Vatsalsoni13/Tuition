import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';
import {NetworkContext} from '../../navigation/StudenBatchPanel';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Chats from '../../components/Chats';

const Chat = () => {
  const batchId = useContext(NetworkContext);
  const {user} = useContext(AuthContext);
  const [text, setText] = useState('');
  const [filesArr, setFilesArr] = useState([]);
  const flatList = React.useRef(null);

  const sendText = async () => {
    if (text.length != 0) {
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
        time: Date.now(),
      });
      setText('');
    }
  };
  useEffect(() => {
    setFilesArr([]);
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
      <KeyboardAvoidingView enabled style={styles.container}>
        <View style={{flex: 1, padding: 10}}>
          <FlatList
            data={filesArr}
            ref={flatList}
            onContentSizeChange={() => {
              flatList.current.scrollToEnd();
            }}
            renderItem={({item}) => <Chats item={item} user={user} />}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <TextInput
            value={text}
            placeholder="Enter your message..."
            multiline
            style={{
              backgroundColor: '#FFF',
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
            style={{
              backgroundColor: '#96bb7c',
              borderRadius: 50,
              padding: 10,
              borderWidth: 2,
              borderColor: 'black',
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  image: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Chat;

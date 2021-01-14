import React, {useContext,useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert,TouchableOpacity,FlatList} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

import {getAssignmentResponses} from '../../utils/apiCalls';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const AssignmentScreen = ({navigation, route}) => {
  const {assignment,batchId} = route.params;
  const [submitted, setSubmitted] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState([]);

  const submittedRenderItem = ({item}) => (
   <View style={{padding:10,borderWidth:1,borderColor:'black'}}>
   <Text>
       Name : {item.studentName}
   </Text>
   <Text>
       Email : {item.email}
   </Text>
   <Text>
       Response : {item.name}
   </Text>
   </View>
  );
  const notSubmittedRenderItem = ({item}) => (
    <View  style={{padding:20,borderWidth:1,borderColor:'black'}}>
    <Text>
        Name : {item.studentName}
    </Text>
    <Text>
        Email : {item.email}
    </Text>
    </View>
   );
  
  const preview = async () => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${assignment.name}`;
    const options = {
      fromUrl: assignment.path,
      toFile: localFile,
    };

    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
        console.log('Success');
      })
      .catch((error) => {
        // error
        console.log(error);
      });
  };

  const makeCall = async ()=>{
   const responses =  await getAssignmentResponses(assignment.assignId,batchId);
   setSubmitted(responses.submitted);
   setNotSubmitted(responses.notSubmitted);
  }

  useEffect(()=>{
    makeCall();
  },[])


  return (
    <View style={styles.container}>
      <TouchableOpacity
          // key={index}
          onPress={() => {
            preview();
          }}>
          <Text
            style={{fontSize: 15, padding: 10}}
            numberOfLines={1}
            ellipsizeMode="tail"
            lineBreakMode="tail">
            {assignment.name}
          </Text>
        </TouchableOpacity>
        <View style={{padding:30}}>
        <Text>Submitted List</Text>
        <FlatList
          data={submitted}
          renderItem={submittedRenderItem}
          keyExtractor={(item) => item.email}
        />
      </View>
      <View style={{padding:30}}>
      <Text>Not Submitted List</Text>
        <FlatList
          data={notSubmitted}
          renderItem={notSubmittedRenderItem}
          keyExtractor={(item) => item.email}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin:20
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
});
export default AssignmentScreen;

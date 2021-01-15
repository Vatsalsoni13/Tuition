import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

import {getAssignmentResponses} from '../../utils/apiCalls';

const AssignmentScreenTutor = ({navigation, route}) => {
  const {assignment, batchId} = route.params;
  const [submitted, setSubmitted] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState([]);

  const submittedRenderItem = ({item}) => (
    <View style={{padding: 15, backgroundColor: '#fcffcc', borderRadius: 15}}>
      <Text>Name : {item.studentName}</Text>
      <Text>Email : {item.email}</Text>
      <Text>Response : {item.name}</Text>
    </View>
  );
  const notSubmittedRenderItem = ({item}) => (
    <View style={{padding: 15, backgroundColor: '#fcffcc', borderRadius: 15}}>
      <Text>Name : {item.studentName}</Text>
      <Text>Email : {item.email}</Text>
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

  const makeCall = async () => {
    const responses = await getAssignmentResponses(
      assignment.assignId,
      batchId,
    );
    setSubmitted(responses.submitted);
    setNotSubmitted(responses.notSubmitted);
  };

  useEffect(() => {
    makeCall();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
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
      <View>
        <Text style={{fontSize: 20}}>Submitted List:</Text>
        <FlatList
          data={submitted}
          renderItem={submittedRenderItem}
          keyExtractor={(item) => item.email}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 20}}>Not Submitted List:</Text>
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
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
});
export default AssignmentScreenTutor;

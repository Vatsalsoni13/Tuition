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
  Dimensions,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getAssignmentResponses} from '../../utils/apiCalls';

const AssignmentScreenTutor = ({navigation, route}) => {
  const {assignment, batchId} = route.params;
  const [submitted, setSubmitted] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState([]);

  const submittedRenderItem = ({item}) => (
    <View style={{padding: 15, backgroundColor: '#fcffcc', borderRadius: 7}}>
      <Text>Name : {item.studentName}</Text>
      <Text>Email : {item.email}</Text>
      <Text>Response : {item.name}</Text>
    </View>
  );
  const notSubmittedRenderItem = ({item}) => (
    <View style={{padding: 15, backgroundColor: '#f1aa9b', borderRadius: 7}}>
      <Text>Name : {item.studentName}</Text>
      <Text>Email : {item.email}</Text>
    </View>
  );

  const preview = async () => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${assignment.fileName}`;
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
    console.log(assignment);
    makeCall();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          padding: 40,
          backgroundColor: '#fcf8e8',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <TouchableOpacity
          // key={index}
          onPress={() => {
            preview();
          }}>
          <View
            style={{
              backgroundColor: '#a6a9b6',
              borderRadius: 6,
              marginTop: 50,
              padding: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, alignSelf: 'flex-start', padding: 5}}>
              <Icon name="folder" size={35} />
            </View>
            <View style={{flex: 5, padding: 5, alignSelf: 'flex-start'}}>
              <Text
                style={{fontSize: 20}}
                numberOfLines={1}
                ellipsizeMode="tail"
                lineBreakMode="tail">
                {assignment.fileName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 40, padding: 40}}>
        <View style={{height: Dimensions.get('screen').height / 3}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 8}}>
            Submitted List:
          </Text>
          <FlatList
            data={submitted}
            renderItem={submittedRenderItem}
            keyExtractor={(item) => item.email}
          />
        </View>
        <View style={{height: Dimensions.get('screen').height / 3}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 8}}>
            Not Submitted List:
          </Text>
          <FlatList
            data={notSubmitted}
            renderItem={notSubmittedRenderItem}
            keyExtractor={(item) => item.email}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: 'flex',

    backgroundColor: '#f6d887',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
});
export default AssignmentScreenTutor;

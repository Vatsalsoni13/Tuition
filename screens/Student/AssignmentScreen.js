import React, {useContext} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {NetworkContext} from '../../navigation/BatchPanel';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {sendResponse} from '../../utils/apiCalls';
import AsyncStorage from '@react-native-community/async-storage';

const AssignmentScreen = ({navigation, route}) => {
  const {assignment} = route.params;
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const onSubmit = async () => {
    let userId = await AsyncStorage.getItem('mongoId').then((value) => {
      return value;
    });
    let date = new Date();
    let b = date.toString();
    let submitDateTime = b.substring(0, 21);
    console.log(submitDateTime);
    let response = {};
    response.name = name;
    response.time = submitDateTime;
    response.date = submitDateTime;
    response.path = path;
    response.assignId = assignment.assignId;
    response.studentId = userId;
    console.log('ASSIGN', response);
    await sendResponse(response).then(() => {
      console.log('SEND RESPONSE SUCCESS');
    });
  };
  const chooseFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      const path = await normalizePath(res.uri);
      console.log('PATH', path);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      Alert.alert('', 'Are you sure you want to upload this document?', [
        {
          text: 'No',
          onPress: () => {
            console.log('Didnt Upload');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            checkErrorMessage(result, res);
          },
        },
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const normalizePath = (path) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return path;
  };

  const checkErrorMessage = (result, res) => {
    if (res.size < 5000000) uploadToFirebaseStorage(result, res);
    else Alert.alert('Error', 'Document size greater than 5MB');
  };

  const uploadToFirebaseStorage = async (result, res) => {
    let userId = await AsyncStorage.getItem('mongoId').then((value) => {
      return value;
    });
    const uploadTask = storage()
      .ref(`Responses/${assignment.assignId}/${userId}`)
      .putString(result, 'base64', {contentType: res.type});
    uploadTask.on(
      'state_changed',
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function (error) {
        console.log(error);
        // Handle unsuccessful uploads
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setPath(downloadURL);
          saveToRealTimeDB(downloadURL, res);
          console.log('File available at', downloadURL);
        });
      },
    );
  };
  const saveToRealTimeDB = async (downloadURL, res) => {
    let userId = await AsyncStorage.getItem('mongoId').then((value) => {
      return value;
    });

    database().ref(`Responses/${assignment.assignId}/${userId}`).update({
      fileName: res.name,
      fileType: res.type,
      fileURL: downloadURL,
      localURL: res.uri,
    });
  };

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
      <View>
        <Text>Name of File</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(name) => {
            setName(name);
          }}
        />
      </View>
      <View style={{padding: 30}}>
        <Text>Upload File</Text>
        <Button
          title="Upload File"
          onPress={() => {
            chooseFile();
          }}
        />
        <Button
          title="Submit Response"
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
});
export default AssignmentScreen;

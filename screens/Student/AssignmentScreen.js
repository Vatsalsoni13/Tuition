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
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
import Icon from 'react-native-vector-icons/FontAwesome';

const AssignmentScreen = ({navigation, route}) => {
  const {assignment} = route.params;
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [pickerres, setPickerres] = useState({});
  const [fetchresult, setFetchresult] = useState({});
  const onSubmit = async () => {
    let userId = await AsyncStorage.getItem('mongoId').then((value) => {
      return value;
    });
    uploadToFirebaseStorage(fetchresult, pickerres);
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
      setPickerres(res);
      const path = await normalizePath(res.uri);
      // console.log('PATH', path);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      setFetchresult(result);
      console.log(result);
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
    if (res.size > 5000000)
      Alert.alert('Error', 'Document size greater than 5MB');
    // else uploadToFirebaseStorage(result, res);
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
    const localFile = `${RNFS.DocumentDirectoryPath}/${assignment.fileName}`;
    const options = {
      fromUrl: assignment.path,
      toFile: localFile,
    };

    RNFS.downloadFile(options)
      .promise.then(() => {
        FileViewer.open(localFile);
        console.log();
      })
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
      <View style={{padding: 40, margin: 10, flex: 1}}>
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
        <Image
          source={require('../../assets/Study-area.png')}
          style={{
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
            width: Dimensions.get('screen').width / 1.2,
            height: Dimensions.get('screen').height / 4,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 60,
          marginTop: 10,
          borderWidth: 1,
          borderColor: 'black',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff3e6',
        }}>
        <View style={{marginTop: 40, marginBottom: 40}}>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Enter name of the file"
            onChangeText={(name) => {
              setName(name);
            }}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              chooseFile();
            }}>
            <LinearGradient
              colors={['#001433', '#001433']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Choose File
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSubmit()}
            style={[
              styles.signIn,
              {
                borderColor: '#635df8',
                borderWidth: 1,
                marginTop: 15,
                backgroundColor: 'white',
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: 'black',
                },
              ]}>
              Upload File
            </Text>
          </TouchableOpacity>
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
    borderRadius: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default AssignmentScreen;

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
import {scheduleAssignment} from '../../utils/apiCalls';
const CreateAssignment = ({navigation, route}) => {
  const {batchId} = route.params;

  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [proceed, setProceed] = useState(false);
  const [pathFire, setPathFire] = useState('');
  const [pickerres, setPickerres] = useState({});
  const [fetchresult, setFetchresult] = useState({});
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
      // console.log(result);
      setFetchresult(result);
      Alert.alert('', 'Are you sure you want to upload this document?', [
        {
          text: 'No',
          onPress: () => {
            setProceed(false);
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
    if (res.size > 5000000) {
      setProceed(false);
      Alert.alert('Error', 'Document size greater than 5MB');
    } else {
      setProceed(true);
    }
  };

  const uploadToFirebaseStorage = async (result, res) => {
    const uploadTask = storage()
      .ref(`Assignment/${batchId}/${res.name}`)
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
          console.log('ABC', downloadURL);
          setPathFire(downloadURL);
          saveToRealTimeDB(downloadURL, res);
          console.log('File available at', downloadURL);
        });
      },
    );
  };
  const saveToRealTimeDB = async (downloadURL, res) => {
    const uniqueKey = database().ref().push().key;
    database().ref(`Assignment/${batchId}/${uniqueKey}`).update({
      fileName: res.name,
      fileType: res.type,
      fileURL: downloadURL,
      localURL: res.uri,
    });
  };

  const preview = async (result) => {
    console.log(result);
    const path = result.uri; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
        console.log('Success');
      })
      .catch((error) => {
        // error
        console.log(error);
      });
  };

  onSubmit = async (result, res) => {
    console.log(pathFire);
    if (proceed) {
      // console.log(result);
      await uploadToFirebaseStorage(result, res).then(async () => {
        if (pathFire) {
          console.log(dateTime);
          let a = dateTime.toISOString();
          let utcDate = a.substring(0, 10);
          let utcTime = a.substring(11, 16);
          console.log(utcDate);
          console.log(utcTime);
          let b = dateTime.toString();
          let istDateTime = b.substring(0, 21);
          console.log(istDateTime);
          let assignment = {};
          assignment.batchId = batchId;
          assignment.name = name;
          assignment.date = utcDate;
          assignment.time = utcTime;
          assignment.istDateTime = istDateTime;
          assignment.path = pathFire;
          assignment.fileName = res.name;
          assignment.filePathLocal = res.uri;
          console.log('ASSIGN', assignment);
          await scheduleAssignment(assignment).then(() => {
            navigation.goBack();
          });
        }
      });
    } else {
      Alert.alert('', 'Please select a file!');
    }
  };
  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 35}}>Create Assignment</Text>
      </View>

      <View
        style={{
          // paddingHorizontal: Dimensions.get('screen').width / 5,
          alignItems: 'center',
          marginTop: 10,
          borderWidth: 1,
          borderColor: 'black',
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: '#fff3e6',
        }}>
        <View style={{flex: 1}}>
          <View style={{marginTop: 40, marginBottom: 40}}>
            <Text style={{fontSize: 25}}>Select Name </Text>

            <TextInput
              style={styles.input}
              value={name}
              placeholder="Enter name of the Assignment"
              onChangeText={(name) => {
                setName(name);
              }}
            />
            <Text style={{fontSize: 25}}>Select Date and Time</Text>
            <DatePicker
              style={{
                width: 250,
                marginBottom: 10,
                paddingLeft: 15,
                alignSelf: 'center',
              }}
              textColor="#32a852"
              fadeToColor="rgba(100, 100, 100, 1)"
              date={dateTime}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD"
              minimumDate={new Date()}
              onDateChange={(dateTime) => {
                setDateTime(dateTime);
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
            {proceed && (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    preview(pickerres);
                  }}
                  style={[
                    styles.previewBtn,
                    {
                      backgroundColor: '#e2e2e2',
                    },
                  ]}>
                  <Text style={{fontSize: 18}}>View Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProceed(false);
                  }}
                  style={[
                    styles.previewBtn,
                    {
                      backgroundColor: '#f74a5c',
                    },
                  ]}>
                  <Text style={{fontSize: 18}}>Remove File</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() => onSubmit(fetchresult, pickerres)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    // padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
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
  previewBtn: {
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
export default CreateAssignment;

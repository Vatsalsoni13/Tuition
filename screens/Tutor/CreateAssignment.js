import React, {useContext} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {NetworkContext} from '../../navigation/BatchPanel';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {scheduleAssignment} from '../../utils/apiCalls';
const CreateAssignment = ({navigation, route}) => {
  const {batchId} = route.params;

  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [path, setPath] = useState('');
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
          setPath(downloadURL);
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

  const preview = async (item) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${item.fileName}`;
    const options = {
      fromUrl: item.fileURL,
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

  onSubmit = async () => {
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
    assignment.path = path;
    console.log('ASSIGN', assignment);
    await scheduleAssignment(assignment).then(() => {
      navigation.goBack();
    });
  };
  return (
    <View style={styles.container}>
      <Text>Create Assignments</Text>
      <View>
        <Text>Name of Assignment</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(name) => {
            setName(name);
          }}
        />
      </View>

      <View>
        <Text>Select Date and Time</Text>
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
      <View>
        <Text>Upload File</Text>
        <Button
          title="Upload File"
          onPress={() => {
            chooseFile();
          }}
        />
      </View>
      <Button
        title="Create Assignment"
        onPress={() => {
          onSubmit();
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
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
});
export default CreateAssignment;

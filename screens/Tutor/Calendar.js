import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
const Calendar = () => {
  const [filesArr, setFilesArr] = useState([]);
  const chooseFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log(
      //   res.uri,
      //   '\n',
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );
      console.log(res);
      const path = await normalizePath(res.uri);
      console.log('PATH', path);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      uploadToFirebaseStorage(result, res);
      // console.log(result);
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

  const uploadToFirebaseStorage = async (result, res) => {
    const uploadTask = storage()
      .ref(`Assignments/${res.name}`)
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
          saveToRealTimeDB(downloadURL, res);
          console.log('File available at', downloadURL);
        });
      },
    );
  };
  const saveToRealTimeDB = async (downloadURL, res) => {
    const uniqueKey = database().ref().push().key;
    database().ref(`assignments/${uniqueKey}`).update({
      fileName: res.name,
      fileType: res.type,
      fileURL: downloadURL,
      localURL: res.uri,
    });
  };

  const preview = async (item) => {
    FileViewer.open(item.localURL)
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //
    setFilesArr([]);
    //
    const onChildAdded = database()
      .ref('assignments')
      .on('child_added', (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFilesArr((files) => [...files, ...helperArr]);
        console.log(snapshot.val());
      });
    return () => database().ref('assignments').off('child_added', onChildAdded);
  }, []);

  return (
    <View>
      <Button
        title="Upload"
        onPress={() => {
          chooseFile();
        }}>
        <Text>Calendar</Text>
      </Button>
      {filesArr.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            preview(item);
          }}>
          <Text>{item.fileName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Calendar;

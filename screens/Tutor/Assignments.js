import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {NetworkContext} from '../../navigation/BatchPanel';
import Entypo from 'react-native-vector-icons/Entypo';
import RNFS from 'react-native-fs';
import {getAssignment} from '../../utils/apiCalls';
import Assignment from '../../components/Assignment';
import AssignmentScreenTutor from '../Tutor/AssignmentScreenTutor';

const Assignments = ({navigation}) => {
  const batchId = useContext(NetworkContext);
  const [filesArr, setFilesArr] = useState([]);
  // const chooseFile = async () => {
  //   // Pick a single file
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log(res);
  //     const path = await normalizePath(res.uri);
  //     console.log('PATH', path);
  //     const result = await RNFetchBlob.fs.readFile(path, 'base64');
  //     Alert.alert('', 'Are you sure you want to upload this document?', [
  //       {
  //         text: 'No',
  //         onPress: () => {
  //           console.log('Didnt Upload');
  //         },
  //       },
  //       {
  //         text: 'Yes',
  //         onPress: () => {
  //           checkErrorMessage(result, res);
  //         },
  //       },
  //     ]);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  // const normalizePath = (path) => {
  //   if (Platform.OS === 'ios' || Platform.OS === 'android') {
  //     const filePrefix = 'file://';
  //     if (path.startsWith(filePrefix)) {
  //       path = path.substring(filePrefix.length);
  //       try {
  //         path = decodeURI(path);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   return path;
  // };

  // const checkErrorMessage = (result, res) => {
  //   if (res.size < 5000000) uploadToFirebaseStorage(result, res);
  //   else Alert.alert('Error', 'Document size greater than 5MB');
  // };

  // const uploadToFirebaseStorage = async (result, res) => {
  //   const uploadTask = storage()
  //     .ref(`Material/${batchId}/${res.name}`)
  //     .putString(result, 'base64', {contentType: res.type});
  //   uploadTask.on(
  //     'state_changed',
  //     function (snapshot) {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     function (error) {
  //       console.log(error);
  //       // Handle unsuccessful uploads
  //     },
  //     function () {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         saveToRealTimeDB(downloadURL, res);
  //         console.log('File available at', downloadURL);
  //       });
  //     },
  //   );
  // };
  // const saveToRealTimeDB = async (downloadURL, res) => {
  //   const uniqueKey = database().ref().push().key;
  //   database().ref(`material/${batchId}/${uniqueKey}`).update({
  //     fileName: res.name,
  //     fileType: res.type,
  //     fileURL: downloadURL,
  //     localURL: res.uri,
  //   });
  // };

  const preview = async (item) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${item.name}`;
    const options = {
      fromUrl: item.path,
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

  useEffect(() => {
    //
    setFilesArr([]);
    //
    console.log('BATCH', batchId);
    getAssignment(batchId).then((data) => {
      console.log('DATA', data);
      setFilesArr(data);
    });
    // const onChildAdded = database()
    //   .ref(`material/${batchId}`)
    //   .on('child_added', (snapshot) => {
    //     let helperArr = [];
    //     helperArr.push(snapshot.val());
    //     setFilesArr((files) => [...files, ...helperArr]);
    //     console.log(snapshot.val());
    //   });
    // return () => database().ref('assignments').off('child_added', onChildAdded);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filesArr}
          renderItem={({item}) => (
            <Assignment
              item={item}
              navigation={navigation}
              screen={'AssignmentScreenTutor'}
              batchId={batchId}
            />
          )}
          keyExtractor={(item) => item.assignId.toString()}
        />
      </View>
      <View style={styles.floatButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateAssignment', {
              batchId: batchId,
            });
          }}>
          <Entypo name="upload" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 15,
    right: 15,
    // zIndex: 2,
    opacity: 0.9,
    backgroundColor: '#B83227',
    borderRadius: 100,
  },
});

export default Assignments;

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

const Material = ({route}) => {
  const batchId = useContext(NetworkContext);
  const [filesArr, setFilesArr] = useState([]);
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
      .ref(`Material/${batchId}/${res.name}`)
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
    database().ref(`material/${batchId}/${uniqueKey}`).update({
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

  useEffect(() => {
    //
    setFilesArr([]);
    //
    // console.log(batchId);
    const onChildAdded = database()
      .ref(`material/${batchId}`)
      .on('child_added', (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFilesArr((files) => [...files, ...helperArr]);
        console.log(snapshot.val());
      });
    return () => database().ref('assignments').off('child_added', onChildAdded);
  }, []);

  const renderItem = ({item}) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#fffef0',
        borderRadius: 15,
        // flexWrap: 'wrap',
      }}>
      <View style={{marginRight: 10}}>
        <Image
          source={{uri: 'https://picsum.photos/536/354'}}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View>
        <TouchableOpacity
          // key={index}
          onPress={() => {
            preview(item);
          }}>
          <Text
            style={{fontSize: 15, padding: 10}}
            numberOfLines={1}
            ellipsizeMode="tail"
            lineBreakMode="tail">
            {item.fileName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={filesArr}
          renderItem={renderItem}
          keyExtractor={(item) => item.fileName}
        />
      </View>
      <View style={styles.floatButton}>
        <TouchableOpacity
          onPress={() => {
            chooseFile();
          }}>
          <Entypo name="upload" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* <Button
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
      ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#CCD4BF'
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

export default Material;

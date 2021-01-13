import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
const Calendar = () => {
  return (
    <View>
      <Text>Calendar</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Calendar;

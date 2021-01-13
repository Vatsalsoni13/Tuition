import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';

const Stack = createStackNavigator();
const Assignments = () => {
  useEffect(() => {
    getAllAssignments();
  });
  return (
    <View>
      <Text>Assignment</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Assignments;

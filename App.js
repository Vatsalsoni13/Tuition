import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RootStackScreen from './screens/RootStackScreen';

const Stack = createStackNavigator();
const App = () =>  {
  return (
    
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 
});

export default App;

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
const HomeScreen = ({navigation})=> {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to detail" onPress={() =>{navigation.navigate("Detail")}} ></Button>
    </View>
  );
}
const Detail = ()=> {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
    </View>
  );
}
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

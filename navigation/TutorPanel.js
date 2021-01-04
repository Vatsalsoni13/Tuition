import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Calendar from '../screens/Calendar';
import Assignments from '../screens/Assignments';
import Categories from '../screens/Categories';
import Batches from '../screens/Batches';

const TutorPanel = ({navigation}) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Calendar"
      activeColor="white"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarColor: '#6c567b',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={Assignments}
        options={{
          tabBarLabel: 'Assignments',
          tabBarColor: '#70416d',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="book-open-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Batches"
        component={Batches}
        options={{
          tabBarLabel: 'Batches',
          tabBarColor: '#b689b0',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="shield-star"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
          tabBarColor: '#d7acd4',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TutorPanel;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

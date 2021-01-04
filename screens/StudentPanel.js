import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Calendar from './Calendar';
import Assignments from './Assignments';
import Categories from './Categories';
import Batches from './Batches'

const Tab = createMaterialBottomTabNavigator();

const StudentPanel = ({navigation}) => {
    
    
    return (
        <Tab.Navigator
        initialRouteName="Calendar"
        activeColor="white"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: 'Calendar',
            tabBarColor:'#ff7b54',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-month-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Assignments"
          component={Assignments}
          options={{
            tabBarLabel: 'Assignments',
            tabBarColor:'#f1935c',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
            ),
          }}
        />
         <Tab.Screen
          name="Batches"
          component={Batches}
          options={{
            tabBarLabel: 'Batches',
            tabBarColor:'#f69e7b',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shield-star" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: 'Categories',
            tabBarColor:'#f8b183',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
};

export default StudentPanel;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      borderRadius:100,
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
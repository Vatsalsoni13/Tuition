import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChoiceScreen from '../screens/ChoiceScreen';
import StudentPanel from './StudentPanel';
import TutorPanel from './TutorPanel';
import CreateBatch from '../screens/CreateBatch';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChoiceScreen" component={ChoiceScreen}   options={{
         headerShown: false,
        }} />
      <Stack.Screen
        name="StudentPanel"
        component={StudentPanel}
        options={{
          title: 'Student Panel',
          headerStyle: {
            backgroundColor: '#E6A57E',
          },
        }}
      />
      <Stack.Screen
        name="CreateBatch"
        component={CreateBatch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TutorPanel"
        component={TutorPanel}
        options={{
          title: 'Tutor Panel',
          headerStyle: {
            backgroundColor: '#A15D98',
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
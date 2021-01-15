import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChoiceScreen from '../screens/ChoiceScreen';
import StudentPanel from './StudentPanel';
import TutorPanel from './TutorPanel';
import ProfileScreen from '../screens/ProfileScree';
import EditProfileScreen from '../screens/EditProfileScree';
import CreateBatch from '../screens/Tutor/CreateBatch';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import {getUser} from '../utils/apiCalls';
import {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import BatchPanel from './BatchPanel';
import AssignmentScreen from '../screens/Student/AssignmentScreen';
import AssignmentScreenTutor from '../screens/Tutor/AssignmentScreenTutor';

import CreateAssignment from '../screens/Tutor/CreateAssignment';
import StudentBatchPanel from './StudenBatchPanel';

const Stack = createStackNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const {user} = useContext(AuthContext);
  let routeName;
  useEffect(() => {
    console.log(user);
    getUser(user.email)
      .then(() => {
        console.log('SignedIn');
        AsyncStorage.getItem('check').then((value) => {
          if (value === 'false') {
            console.log('Launch');
            setIsFirstLaunch(true);
          } else {
            setIsFirstLaunch(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'EditProfileScreen';
  } else {
    routeName = 'ChoiceScreen';
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="ChoiceScreen"
        component={ChoiceScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
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
        name="CreateAssignment"
        component={CreateAssignment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AssignmentScreen"
        component={AssignmentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AssignmentScreenTutor"
        component={AssignmentScreenTutor}
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
      <Stack.Screen
        name="BatchPanel"
        component={BatchPanel}
        options={{
          title: 'Tutor Panel',
          headerStyle: {
            backgroundColor: '#A15D98',
          },
        }}
      />
      <Stack.Screen
        name="StudentBatchPanel"
        component={StudentBatchPanel}
        options={{
          title: 'Student Panel',
          headerStyle: {
            backgroundColor: '#E6A57E',
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default AppStack;

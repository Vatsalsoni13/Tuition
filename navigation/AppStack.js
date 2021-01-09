import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChoiceScreen from '../screens/ChoiceScreen';
import StudentPanel from './StudentPanel';
import TutorPanel from './TutorPanel';
import ProfileScreen from '../screens/ProfileScree';
import EditProfileScreen from '../screens/EditProfileScree';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import {getUser} from '../utils/apiCalls';
import {useContext} from 'react';
import {AuthContext} from './AuthProvider';
import CreateBatch from '../screens/CreateBatch';

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

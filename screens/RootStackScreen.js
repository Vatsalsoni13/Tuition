import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ChoiceScreen from './ChoiceScreen';
import StudentPanel from './StudentPanel';
import TutorPanel from './TutorPanel';




const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator >
        <RootStack.Screen   name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
        <RootStack.Screen   name="SignInScreen" component={SignInScreen} options={{headerShown:false}}/>
        <RootStack.Screen   name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
        <RootStack.Screen  name="ChoiceScreen" component={ChoiceScreen} options={{headerShown:false}}/>
        <RootStack.Screen name="StudentPanel" component={StudentPanel} options={{title : 'Student Panel',headerStyle:{
            backgroundColor:'#E6A57E',
        }}}
        />
        <RootStack.Screen name="TutorPanel" component={TutorPanel} options={{title:'Tutor Panel',headerStyle:{
            backgroundColor:'#A15D98',
        }}} />
    </RootStack.Navigator>
);

export default RootStackScreen;
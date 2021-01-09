import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import BatchInfo from '../screens/Tutor/BatchInfo';
import Chat from '../screens/Tutor/Chat';

const BatchPanel = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={BatchInfo} />
      <Tab.Screen name="Settings" component={Chat} />
    </Tab.Navigator>
  );
};
export default BatchPanel;

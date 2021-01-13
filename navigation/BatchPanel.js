import React, {createContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import BatchInfo from '../screens/Tutor/BatchInfo';
import Chat from '../screens/Tutor/Chat';
import Material from '../screens/Tutor/Material';
import Assignments from '../screens/Tutor/Assignments';
export const NetworkContext = createContext();
const BatchPanel = ({route}) => {
  return (
    <NetworkContext.Provider value={route.params.batchId}>
      <Tab.Navigator>
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Material" component={Material} />
        <Tab.Screen name="Assignments" component={Assignments} />
        <Tab.Screen name="Info" component={BatchInfo} />
      </Tab.Navigator>
    </NetworkContext.Provider>
  );
};
export default BatchPanel;

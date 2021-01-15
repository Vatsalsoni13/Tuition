import React, {createContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
// import BatchInfo from '../screens/Tutor/BatchInfo';
import Chat from '../screens/Student/Chat';
import Material from '../screens/Student/Material';
import Assignments from '../screens/Student/Assignments';
export const NetworkContext = createContext();
const StudentBatchPanel = ({route}) => {
  return (
    <NetworkContext.Provider value={route.params.batchId}>
      <Tab.Navigator>
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Material" component={Material} />
        <Tab.Screen name="Assignments" component={Assignments} />
        {/* <Tab.Screen name="Info" component={BatchInfo} /> */}
      </Tab.Navigator>
    </NetworkContext.Provider>
  );
};
export default StudentBatchPanel;

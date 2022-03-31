import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ListOrderStack} from './StackNavigator';

import Home from '../pages/Home';
import Profile from '../pages/Profile';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Home"
                component={Home}
             />

            <Drawer.Screen 
                name="ListOrdersTab"
                component={ListOrderStack}
            />
            
            <Drawer.Screen 
                name="Profile"
                component={Profile}
            />               
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ListOrderStack, ListClientStack, ListProductStack} from './StackNavigator';

import Home from '../pages/Home';
import UserProvider from '../../src/contexts/user';


const Tab = createBottomTabNavigator();

const bottomTabNavigator = () => {

 //   const { signOut } = useContext(AuthContext);
    return(
    <UserProvider>
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen 
                name="ListOrdersTab"
                component={ListOrderStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size} />
                    ),
                }}
            />
            
            <Tab.Screen 
                name="clients"
                component={ListClientStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Clientes',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            /> 

            <Tab.Screen 
                name="products"
                component={ListProductStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Produtos',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="barcode" color={color} size={size} />
                    ),
                }}
            />                                                  
        </Tab.Navigator>
        </UserProvider>
    )
}

export default bottomTabNavigator;
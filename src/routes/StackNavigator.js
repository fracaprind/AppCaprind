import React from "react";
import { Label1 } from '../styles/custom_adm'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TitleIcon } from '../styles/custom_adm';
import FlatListOrders from '../pages/Order/FlatListOrders';
import ViewOrder from '../pages/Order/ViewOrder';
import AddOrder from '../pages/Order/AddOrder';

import FlatListClients from '../pages/Client/FlatListClients';
import ViewClient from '../pages/Client/ViewClient';
import AddClient from '../pages/Client/AddClient';
import AddPerson from '../pages/Client/AddPerson';
import Menu from '../pages/Client/Menu';

import FlatListProducts from '../pages/Product/FlatListProducts';
import ViewProduct from '../pages/Product/ViewProduct';
import AddProduct from '../pages/Product/AddProduct';

const Stack = createNativeStackNavigator();


const screnOtionStyle = {
    headerStyle: {
        backgroundColor: '#19428f'
    },
    headerTintColor: '#fff'
}

const ListOrderStack = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={screnOtionStyle}>
            <Stack.Screen
                name="ListOrders"
                component={FlatListOrders}
                options={{
                    headerTitle: "Pedidos de venda",
                    headerRight: () => (
                        <TitleIcon
                            onPress={() => {
                                navigation.navigate('AddOrder')
                            }}>
                            <MaterialCommunityIcons
                                name="plus-circle-outline"
                                size={25}
                                color="#fff"
                            />
                        </TitleIcon>
                    )
                }}
            />

            <Stack.Screen
                name="ViewOrder"
                component={ViewOrder}
                options={{
                    headerTitle: "Detalhes do Pedido"
                }}
            />

            <Stack.Screen
                name="AddOrder"
                component={AddOrder}
                options={{
                    headerTitle: "Cadastrar Pedido"
                }}
            />
        </Stack.Navigator>
    )
}

export { ListOrderStack };


const ListClientStack = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={screnOtionStyle}>
            <Stack.Screen
                name="ListClients"
                component={FlatListClients}
                options={{
                    headerTitle: "Clientes",
                    headerRight: () => (
                        <>

                        <TitleIcon
                            onPress={() => {
                                navigation.navigate('AddClient')                                
                            }}>

                            <MaterialCommunityIcons
                                name="card-account-details-outline"
                                size={25}
                                color="#fff"
                            />
                            <Label1>CNPJ</Label1>
                        </TitleIcon>                      
                        <TitleIcon
                            onPress={() => {
                                navigation.navigate('AddPerson')                                
                            }}>
                            <MaterialCommunityIcons
                                name="google-street-view"
                                size={25}
                                color="#fff"
                            />
                            <Label1>CPF</Label1>                            
                        </TitleIcon>
                        </>
                    )
                }}
            />

            <Stack.Screen
                name="ViewClient"
                component={ViewClient}
                options={{
                    headerTitle: "Dados do cliente"
                }}
            />

           <Stack.Screen
                name="AddClient"
                component={AddClient}             
                options={{
                    headerTitle: "Adicionar cliente pessoa jurídica"
                }}
            />

            <Stack.Screen
                name="AddPerson"
                component={AddPerson}              
                options={{
                    headerTitle: "Adicionar cliente pessoa física"
                }}
            />

        </Stack.Navigator>
    )
}

export { ListClientStack };

const ListProductStack = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={screnOtionStyle}>
            <Stack.Screen
                name="ListProducts"
                component={FlatListProducts}
                options={{
                    headerTitle: "Produtos"
                }}
            />

            <Stack.Screen
                name="ViewProduct"
                component={ViewProduct}
                options={{
                    headerTitle: "Dados do produto"
                }}
            />

            <Stack.Screen
                name="AddProduto"
                component={AddProduct}
                options={{
                    headerTitle: "Cadastrar Produto"
                }}
            />
        </Stack.Navigator>
    )
}

export { ListProductStack };
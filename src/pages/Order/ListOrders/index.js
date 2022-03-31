import React, { useState, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { Alert, TouchableOpacity, ScrollView } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, List, RowData, InfoData, ValueData, BtnView } from '../../../styles/custom_adm';


import api from '../../../config/api';

export default function ListOrders() {

    const [orders, setOrders] = useState([]);

    const navigation = useNavigation();

    const getOrders = async () => {
        await api.get("/orders/1")
            .then((response) => {
                setOrders(response.data.orders);
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem);
                } else {
                    Alert.alert("", "Erro: Tente mais tarde!");
                }
            });
    }

    useFocusEffect(
        useCallback(() => {
            getOrders();
        }, [])
    );

    return (
        <Container>
        <ScrollView>
            <List>
                {orders.map((order) => {
                    return (

                        <TouchableOpacity onPress={() => { navigation.navigate('ViewOrder', { orderId: order.ID_Pedido }) }} key={order.ID_Pedido}>
                            <RowData>
                                <InfoData>
                                    <ValueData>N° pedido: {order.ID_Pedido} </ValueData>
                                </InfoData>
                                <BtnView>

                                    <MaterialCommunityIcons
                                        name='briefcase-check'
                                        size={20}
                                        color={'#19428f'} />
                                </BtnView>
                            </RowData>
                            <RowData>
                                <InfoData>
                                    <ValueData>{order.Cliente}</ValueData>
                                </InfoData>
                            </RowData>
                        </TouchableOpacity>

                    )
                })}
            </List>
            </ScrollView>
        </Container>
    )
}
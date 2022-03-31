import React, { useState, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, FlatList, Alert} from 'react-native'
import Orders from '../Orders';

import {UserContext} from '../../../contexts/user';

import styles from './style';
import api from '../../../config/api';

export default function FlatListOrders() {
const [filteredOrders, setFilteredOrders] = useState([]);
//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================
    const getOrders = async () => {
        await api.get('/orders/1',{
            params: {
              cnpj:cnpj,
              vendedor:vendedor 
            }
            })

            .then((response) => {
            setFilteredOrders(response.data.orders);
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
        <SafeAreaView style={styles.container}>
        <View >
           <FlatList 
                data={filteredOrders}
                keyExtractor={item =>String(item.ID_Pedido)}
                renderItem={({item})=><Orders data={item} />}
           />   
        </View>
        </SafeAreaView>
    );
}

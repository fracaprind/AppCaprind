import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, FlatList, Alert} from 'react-native'
import Orders from '../Orders';

import { MaterialCommunityIcons} from '@expo/vector-icons';

import { ButtonOrder, ContainerFind, TextFind, LoadingArea } from '../../../styles/custom_adm';

import {UserContext} from '../../../contexts/user';

import styles from './style';
import api from '../../../config/api';

export default function FlatListOrders() {
//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================

const [filteredOrders, setFilteredOrders] = useState([]);

const [searchText, setSearcText] = useState('');

const [list, setList] = useState('')

useEffect(() =>{
    if(searchText===''){
        setList(filteredOrders);
    } else{
        setList(
            filteredOrders.filter(
            (item)=>
            item.Cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
        );
    }

},[searchText]);


    const getOrders = async () => {
        console.log('Vendedor: ' + vendedor)

        await api.get('/orders/all/1',{
            params: {
              cnpj:cnpj,
              vendedor:vendedor 
            }
            })

            .then((response) => {
            setFilteredOrders(response.data.orders);
            setList(response.data.orders);

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

    const handleOrderClick = () => {
        let newList = [...filteredOrders];
        newList.sort((a, b) => (a.Cliente > b.Cliente)?1:(b.Cliente > a.Cliente)?-1:0);  
        setList(newList);
    };


    return (
        <SafeAreaView style={styles.container}>
        <View >
        <ContainerFind>
                <TextFind
                    placeholder="Digite o nome do cliente para pesquisa"
                    value={searchText}
                    onChangeText={(t) =>setSearcText(t)}
                >
                </TextFind>
                <ButtonOrder onPress={handleOrderClick}>
                    <MaterialCommunityIcons
                    name="order-alphabetical-ascending"
                    size={25}
                    color="#fff"
                    />
                </ButtonOrder>
            </ContainerFind> 

           <FlatList 
                data={list}
                keyExtractor={item =>String(item.ID_Pedido)}
                renderItem={({item})=><Orders data={item} />}
           />   
        </View>
        </SafeAreaView>
    );
}

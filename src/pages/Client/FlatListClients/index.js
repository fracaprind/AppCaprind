import React, { useState, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, View, FlatList} from 'react-native'
import Clients from '../Clients';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import api from '../../../config/api';
import {UserContext} from '../../../contexts/user';

export default function FlatListClients() {


const [filteredClients, setFilteredClients] = useState([]); 
//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================

const usuario = AsyncStorage.getItem('@name')
//console.log(usuario);

    const getClients = async () => {
        await api.get("/clients/1",{
          params: {
            cnpj:cnpj,
            vendedor:vendedor
          }
          })
            .then((response) => {
            setFilteredClients(response.data.clients);
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
            getClients();
        }, [])
    );



    return (
        <SafeAreaView style={styles.container}>
        <View >

           <FlatList 
           data={filteredClients}
           keyExtractor={item =>String(item.ID_Cliente)}
           renderItem={({item})=><Clients data={item} />}
           />
        
        </View>
        </SafeAreaView>
    );
}

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, View, FlatList} from 'react-native'
import Clients from '../FindClients';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons} from '@expo/vector-icons';

import { ButtonOrder, ContainerFind, TextFind, LoadingArea } from '../../../../styles/custom_adm';

import styles from './style';
import api from '../../../../config/api';
import {UserContext} from '../../../../contexts/user';

export default function FlatListFindClient() {

//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================


const [filteredClients, setFilteredClients] = useState([]);

const [searchText, setSearcText] = useState('');

const [list, setList] = useState(filteredClients)

useEffect(() =>{
    if(searchText===''){
        setList(filteredClients);
    } else{
        setList(
            filteredClients.filter(
            (item)=>
            item.Cliente.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
        );
    }

},[searchText]);



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

    
    const handleOrderClick = () => {
        let newList = [...filteredClients];
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
           keyExtractor={item =>String(item.ID_Cliente)}
           renderItem={({item})=><Clients data={item} />}
           />
        
        </View>
        </SafeAreaView>
    );
}

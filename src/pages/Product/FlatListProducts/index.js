import React, { useState, useEffect, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, FlatList, Alert} from 'react-native';
import Products from '../Products';

import { MaterialCommunityIcons} from '@expo/vector-icons';

import { ButtonOrder, ContainerFind, TextFind, LoadingArea } from '../../../styles/custom_adm';


import styles from './style';
import api from '../../../config/api';
import {UserContext} from '../../../contexts/user';

export default function FlatListProducts() {

//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================
const [loading, setLoading] = useState(false);

const [searchText, setSearcText] = useState('');

const [list, setList] = useState(filteredProducts)    

const [filteredProducts, setFilteredProducts] = useState([]);


useEffect(() =>{
    if(searchText===''){
        setList(filteredProducts);
    } else{
        setList(
            filteredProducts.filter(
            (item)=>
            item.Descricao.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
        );
    }

},[searchText]);



    const getProducts = async () => {
        setLoading(true);
        await api.get("/products/1",{
          params: {
            cnpj:cnpj,
          }
          })
            .then((response) => {
            setFilteredProducts(response.data.products);
            setLoading(false);
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
            getProducts();
        }, [])
    );

    const handleOrderClick = () => {
        let newList = [...filteredProducts];
        newList.sort((a, b) => (a.Descricao > b.Descricao)?1:(b.Descricao > a.Descricao)?-1:0);  
        setList(newList);
    };


    return (
        <SafeAreaView style={styles.container}>
        <View >
            <ContainerFind>
         
                <TextFind
                   placeholder="Digite a descrição do produto para pesquisa"
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
           keyExtractor={item =>String(item.ID_Produto)}
           renderItem={({item})=><Products data={item} />}
           />
        
        </View>
        </SafeAreaView>
    );
}

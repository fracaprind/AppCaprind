import React, { useState, useCallback, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, View, FlatList, Alert} from 'react-native';
import Products from '../Products';

import styles from './style';
import api from '../../../config/api';
import {UserContext} from '../../../contexts/user';

export default function FlatListProducts() {

const [filteredProducts, setFilteredProducts] = useState([]);
//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
//=================================================

    const getProducts = async () => {
        await api.get("/products/1",{
          params: {
            cnpj:cnpj,
          }
          })
            .then((response) => {
            setFilteredProducts(response.data.products);
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


    return (
        <SafeAreaView style={styles.container}>
        <View >

           <FlatList 
           data={filteredProducts}
           keyExtractor={item =>String(item.ID_Produto)}
           renderItem={({item})=><Products data={item} />}
           />
        
        </View>
        </SafeAreaView>
    );
}

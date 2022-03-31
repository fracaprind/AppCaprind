import React from 'react';
import {TouchableOpacity, View,Text} from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function Products({data}){
const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => { navigation.navigate('ViewProduct', { productId: data.ID_Produto }) }} key={data.ID_Produto}>
            <View style={styles.card}>
            <Text style={styles.cliente}>Codigo: {data.Codigo}</Text>                            
            <Text style={styles.cliente}>Unidade: {data.Unidade}</Text>
            <Text style={styles.cliente}>Descricao: {data.Descricao}</Text>
            <Text style={styles.cliente}>vlr_unit: {data.vlr_unit}</Text>
            <Text style={styles.cliente}>Estoque: {data.Estoque}</Text>                          
            </View>
        </TouchableOpacity>
    )
}

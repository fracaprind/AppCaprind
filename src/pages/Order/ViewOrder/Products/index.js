import React from 'react';
import {TouchableOpacity, View,Text} from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import numeral from 'numeral';

export default function Products({data}){

const totalvalue = numeral(data.vlr_Total).format('0.00')
const totalvalueformatted = totalvalue.replace('.',',')

const unitvalue = numeral(data.vlr_unit).format('0.00')
const unitvalueformatted = unitvalue.replace('.',',')

const qtvalue = numeral(data.Qt).format('0.00')
const qtvalueformatted = qtvalue.replace('.',',')

const navigation = useNavigation();

    return( 
        <TouchableOpacity onPress={() => { navigation.navigate('ViewProduct', { productId: data.ID_Lista }) }} key={data.ID_Produto}>
            <View style={styles.card}>
            <Text style={styles.cliente}>Codigo: {data.Codigo}</Text>                            
            <Text style={styles.cliente}>Unidade: {data.Unidade}</Text>
            <Text style={styles.cliente}>Descrição: {data.Descricao}</Text>
            <Text style={styles.cliente}>Valor unitário : R$ {unitvalueformatted}</Text>
            <Text style={styles.cliente}>Quantidade: {qtvalueformatted}</Text>
            <Text style={styles.cliente}>Valor total: R$ {totalvalueformatted}</Text>                                        
            </View>
        </TouchableOpacity>
    )
}

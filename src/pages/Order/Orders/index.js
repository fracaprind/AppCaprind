import React from 'react';
import {TouchableOpacity, View,Text, StyleSheet} from 'react-native';
import UINumber from '../../../Utils/UINumber';
import moment from 'moment';
import numeral from 'numeral';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function Orders({data}){
const dataemissao = moment(data.Data).format('DD/MM/YYYY')

const value = numeral(data.ValorTotal).format('0.00')
const valueformatted = value.replace('.',',')
const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => { navigation.navigate('ViewOrder', { orderId: data.ID_Pedido })}} key={data.ID_Pedido}>
            <View style={styles.card}>
            <Text style={styles.pedido}>N° {data.ID_Pedido}</Text>
            <Text style={styles.cliente}>Data: {dataemissao}</Text>                            
            <Text style={styles.cliente}>Cliente: {data.Cliente}</Text>
            <Text style={styles.cliente}>Status: {data.Status}</Text>
            <Text style={styles.cliente}>Vendedor: {data.Vendedor}</Text>            
            <Text style={styles.cliente}>Valor: R$ {valueformatted}</Text>
            </View>
        </TouchableOpacity>
    )
}

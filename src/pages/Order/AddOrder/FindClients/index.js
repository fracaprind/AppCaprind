import React from 'react';
import {TouchableOpacity, View,Text} from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function Clients({data}){
const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => { navigation.navigate('AddOrder', { clientId: data.ID_Cliente }) }} key={data.ID_Cliente}>
            <View style={styles.card}>
            <Text style={styles.cliente}>{data.Cliente}</Text>                                      
            <Text style={styles.dados}>Email: {data.Email}</Text>
            <Text style={styles.dados}>Telefone: {data.Telefone}</Text>
            <Text style={styles.dados}>Vendedor: {data.Vendedor}</Text>               
            </View>
        </TouchableOpacity>
    )
}

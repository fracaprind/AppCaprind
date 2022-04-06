import React from 'react';
import {TouchableOpacity, View,Text} from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function Products({data}){
const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => { navigation.navigate('ViewProduct', { productId: data.ID_Produto }) }} key={data.ID_Produto}>
            <View style={styles.card}>
            <Text style={styles.descricao}>{data.Descricao}</Text>                
            <Text style={styles.label}>Código : <Text style={styles.cliente}>{data.Codigo}</Text></Text>            
            <Text style={styles.label}>Unidade: <Text style={styles.cliente}>{data.Unidade}</Text></Text>
            <Text style={styles.label}>Valor unitário: <Text style={styles.cliente}>{data.vlr_unit}</Text></Text>
            <Text style={styles.label}>Em estoque: <Text style={styles.cliente}>{data.Estoque}</Text></Text>                     
            </View>
        </TouchableOpacity>
    )
}

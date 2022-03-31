import React from "react";
import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    card:{
        backgroundColor:'#fff',
        margin:10,
        elevation:2,
        height:140,
        padding:20,
        borderRadius:5,
    },

    pedido:{
        fontSize:15,
        color:'#19428f'
    },
    cliente:{
        fontFamily:'Helvetica',
        textAlign:'left',
        fontSize:12,
        color:'#4F4F4F',
        marginBottom:7
    },

    dados:{
        fontSize:10,
        color:'#4F4F4F',
    },

    picker:{
        fontSize:10,
        color:'#4F4F4F'
    }    
});

export default styles;
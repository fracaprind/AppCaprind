import React from "react";
import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    card:{
        backgroundColor:'#fff',
        margin:10,
        elevation:2,
        height:130,
        padding:15,
        borderRadius:5,
    },

    pedido:{
        fontSize:12,
        color:'#19428f'
    },
    descricao:{
        fontSize:11,
        color:'#000000',
        marginBottom:10,
    },

    label:{
        fontSize:10,
        color:'#808080'
    },
    cliente:{
        fontSize:10,
        color:'#4F4F4F'
    },

    picker:{
        fontSize:10,
        color:'#4F4F4F'
    }    
});

export default styles;
import React, { useState, useCallback } from "react";
import { Alert } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { InputText, ContainerEdit,Label, TitleViewContent, ViewContent, BtnActionEdit, BtnActionDelete, TxtBtnAction } from '../../../styles/custom_adm';

import api from '../../../config/api';

export default function ViewProduct({ route }) {

    const [product, setProduct] = useState('');

    const navigation = useNavigation();
  
    
    const getProduct = async () => {

        //console.log(route.params.userId);
        const { productId } = route.params;

        await api.get('/products/ID/' + productId)
        .then((response) => {
            console.log(response.data);
            setProduct(response.data.product);
        }).catch((err) => {
            if(err.response){
                Alert.alert("", err.response.data.mensagem);
                navigation.navigate('ListProducts');
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
                navigation.navigate('ListProducts'); 
            }
        });
    } 
 
    useFocusEffect(
        useCallback(() => {
            getProduct();
        }, [])
    );


    return (
        <ContainerEdit>

            <Label>ID Produto</Label>
            <InputText>{product.ID_Produto}</InputText>

            <Label>Codigo</Label>
            <InputText>{product.Codigo}</InputText>

            <Label>Unidade</Label>
            <InputText>{product.Unidade}</InputText>

            <Label>Descricao</Label>
            <InputText>{product.Descricao}</InputText>

            <Label>Estoque</Label>
            <InputText>{product.Estoque}</InputText>

        </ContainerEdit>
    )
}
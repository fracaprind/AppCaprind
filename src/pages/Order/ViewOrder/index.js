import React, { useState, useCallback } from "react";

import moment from 'moment'; 

import { validate, format, generate } from 'cnpj';

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { SafeAreaView, FlatList, Alert} from 'react-native'

import Products from './../ViewOrder/Products';


import { InputText, ContainerEdit, Label, TxtListTitle, BtnActionEdit, BtnActionDelete, TxtBtnAction } from '../../../styles/custom_adm';
import styles from '../ViewOrder/style';

import api from '../../../config/api';

export default function ViewOrder({ route }) {

    const navigation = useNavigation();
    const [order, setOrder] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getOrder = async () => {

        const { orderId } = route.params;
    //================================================================
    // Busca o pedido de venda pelo ID
    //================================================================
        await api.get('/orders/ID/' + orderId)
        .then((response) => {
            console.log(response.data.order);
            setOrder(response.data.order);
        }).catch((err) => { 
            if(err.response){
                Alert.alert("", err.response.data.mensagem);
              //  navigation.navigate('ListOrders');
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
              //  navigation.navigate('ListOrders');
            }
        });
    //================================================================
    // Busca os produtos do pedido de venda
    //================================================================
      await api.get("/order/products",{
        params: {
          ID_Pedido:orderId,
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
                
    //=================================================================
    } 

    const dataemissao = moment(order.Data).format('DD/MM/YYYY hh:mm:ss')

        useFocusEffect(
            useCallback(() => {
                getOrder();
            }, []) 
        );
  
       // const cnpjNumber = number(order.CNPJ);
        //const cnpjFormated = format(cnpjNumber) // 88.415.345/0001-57


    return (

        <SafeAreaView>
            <FlatList 
               data={filteredProducts}
               keyExtractor={item =>String(item.ID_Lista)}
               ListHeaderComponent={() => (
                <ContainerEdit >
                    <Label >N° pedido</Label>

                    <InputText>{order.ID_Pedido}</InputText>

                    <Label >Status do pedido</Label>
                    <InputText >{order.Status}</InputText>

                    <Label>Data emissão</Label>
                    <InputText>{dataemissao}</InputText>

                    <Label>Cliente</Label>
                    <InputText
                    multiline={true}
                    numberOfLines={2}
                    textAlignVertical = 'top'                    
                    >{order.Cliente}</InputText>

                    <Label>CNPJ</Label>
                    <InputText>{order.CNPJ}</InputText>

                    <Label>Contato do cliente</Label>
                    <InputText>{order.Contato}</InputText>

                    <Label>Vendedor responsável</Label>
                    <InputText>{order.Vendedor}</InputText>

                    <Label>Condições de pagamento</Label>
                    <InputText>{order.CondPagto}</InputText>   

                    <Label style={{color: '#800000'}}>Observações</Label>
                    <InputText         
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical = 'top'
                    >
                    {order.Observações}
                    </InputText>




                    <BtnActionEdit>
                        <TxtBtnAction>
                            Gravar pedido
                        </TxtBtnAction>
                    </BtnActionEdit>

                    <BtnActionDelete>
                        <TxtBtnAction>
                            Excluir pedido
                        </TxtBtnAction>
                    </BtnActionDelete>

                    <TxtListTitle>
                            Listagem de produtos
                    </TxtListTitle>
                </ContainerEdit>
              )}
               renderItem={({item})=><Products data={item} />}
               />
        </SafeAreaView>
 
    )
}
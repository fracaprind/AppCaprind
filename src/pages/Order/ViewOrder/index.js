import React, { useState, useCallback } from "react";

import moment from 'moment'; 

import { validate, format, generate } from 'cnpj';

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { SafeAreaView, View, FlatList, Alert} from 'react-native'

import Products from './../ViewOrder/Products';


import { TxtListTitle, TitleViewContent, ViewContent,ViewInputContent, BtnActionEdit, BtnActionDelete, TxtBtnAction } from '../../../styles/custom_adm';
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
                navigation.navigate('ListOrders');
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
                navigation.navigate('ListOrders');
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

        <SafeAreaView style={styles.container}>
            <FlatList 
               data={filteredProducts}
               keyExtractor={item =>String(item.ID_Lista)}
               ListHeaderComponent={() => (
                <View >
                    <TitleViewContent >N° pedido</TitleViewContent>
                    <ViewContent >{order.ID_Pedido}</ViewContent>

                    <TitleViewContent >Status do pedido</TitleViewContent>
                    <ViewInputContent >{order.Status}</ViewInputContent>

                    <TitleViewContent>Data emissão</TitleViewContent>
                    <ViewContent>{dataemissao}</ViewContent>

                    <TitleViewContent>Cliente</TitleViewContent>
                    <ViewInputContent>{order.cliente}</ViewInputContent>

                    <TitleViewContent>CNPJ</TitleViewContent>
                    <ViewInputContent>{order.CNPJ}</ViewInputContent>

                    <TitleViewContent>Observações</TitleViewContent>
                    <ViewInputContent>{order.Observações}</ViewInputContent>

                    <TitleViewContent>Vendedor responsável</TitleViewContent>
                    <ViewContent>{order.Vendedor}</ViewContent>


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
                </View>
              )}
               renderItem={({item})=><Products data={item} />}
               />
        </SafeAreaView>
 
    )
}
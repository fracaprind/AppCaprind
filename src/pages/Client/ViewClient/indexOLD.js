import React, { useState, useCallback } from "react";
import { Alert,ScrollView } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container, TitleViewContent, ViewContent, BtnActionEdit, BtnActionDelete, TxtBtnAction } from '../../../styles/custom_adm';

import api from '../../../config/api';

export default function ViewClient({ route }) {

    const navigation = useNavigation();
    const [client, setClient] = useState('');

    const getClient = async () => {

        const { clientId } = route.params;

        await api.get('/clients/ID/' + clientId)
        .then((response) => {
            console.log(response.data.client);
            setClient(response.data.client);
        }).catch((err) => {
            if(err.response){
                Alert.alert("", err.response.data.mensagem);
                navigation.navigate('ListClients');
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
                navigation.navigate('ListClients');
            }
        });
    }

    useFocusEffect(
        useCallback(() => {
            getClient();
        }, []) 
    );


    return (
        <ScrollView>
        <Container>

            <TitleViewContent>N° cliente : {client.ID_Cliente}</TitleViewContent>

            <TitleViewContent>Nome razão social</TitleViewContent>
            <ViewContent>{client.Cliente}</ViewContent>

            <TitleViewContent>CNPJ</TitleViewContent>
            <ViewContent>{client.CNPJ}</ViewContent>            

            <TitleViewContent>Email</TitleViewContent>
            <ViewContent>{client.Email}</ViewContent>

            <TitleViewContent>Telefone</TitleViewContent>
            <ViewContent>{client.Telefone}</ViewContent>

            <TitleViewContent>Vendedor responsável</TitleViewContent>
            <ViewContent>{client.Vendedor}</ViewContent>

            <TitleViewContent>Contato do cliente</TitleViewContent>
            <ViewContent>{client.Contato1}</ViewContent>            

            <TitleViewContent>Rua</TitleViewContent>
            <ViewContent>{client.Endereco}</ViewContent>

            <TitleViewContent>Cep</TitleViewContent>
            <ViewContent>{client.CEP}</ViewContent>

            <TitleViewContent>Cidade</TitleViewContent>
            <ViewContent>{client.Cidade}</ViewContent>

            <TitleViewContent>Bairro</TitleViewContent>
            <ViewContent>{client.Bairro}</ViewContent>

            <TitleViewContent>Numero</TitleViewContent>
            <ViewContent>{client.Numero}</ViewContent> 

            <BtnActionEdit>
                <TxtBtnAction>
                    Gravar cliente
                </TxtBtnAction>
            </BtnActionEdit>

            <BtnActionDelete>
                <TxtBtnAction>
                    Excluir cliente
                </TxtBtnAction>
            </BtnActionDelete>

        </Container>
        </ScrollView>
    )
}
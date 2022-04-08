import React, { useState, useCallback, useContext } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation, useFocusEffect} from '@react-navigation/native';

import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TitleRequired } from '../../../styles/custom_adm';
import {ViewContent, BtnEditForm,TxtEditForm, Label, TxtForm, ButtonMask, ContainerEdit, InputText, LoadingArea } from '../../../styles/custom_adm';

import { MaskedTextInput } from "react-native-mask-text";

import {UserContext} from '../../../contexts/user';

import { format } from 'cnpj';

import api from '../../../config/api';
import uuid from 'uuid-random';

export default function AddOrder({ route }) {

const [cliente, setName] = useState('');

const [client, setClient] = useState('');

const [loading, setLoading] = useState(false);
//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
const {cnpj, vendedor} = useContext(UserContext);
const [CNPJ_Empresa, setCNPJ_Empresa] = useState(cnpj);
const [Vendedor, setVendedor] = useState(vendedor);
//=================================================
const [Data, setData] = useState(Date)
const [Status, setStatus] = useState('Aberto')
const [CondPagto, SetcondPagto] = useState('')
const [CNPJ, setCnpj] = useState('');
const [CNPJFormated, setCnpjFormated] = useState('');
const [CPF, setCpf] = useState('');
const [ID_Cliente, setID_Cliente] = useState('');
const [Cliente, setCliente] = useState('');
const [Nome_Fantasia, setNomeFantasia] = useState('');
const [Contato, setNomeContato] = useState('');           
const [Observações, setObservacoes] = useState('');
const [ID_Pedido, setID_Pedido] = useState('');
const [UUid, SetUUid] = useState (uuid());
const getClient = async () => {

//console.log(UUid);

    const { clientId } = route.params;

    await api.get('/clients/ID/' + clientId)
    .then((response) => {
       // console.log(response.data.client);
        const formatted = format(response.data.client.CNPJ)
        setCnpjFormated(formatted)
        setCnpj(response.data.client.CNPJ)           

        setID_Cliente(response.data.client.ID_Cliente)
        setClient(response.data.client);
        setLoading(false);
        setCliente(response.data.client.Cliente);
        setNomeContato(response.data.client.Contato1)
        setNomeFantasia(response.data.client.NomeFantasia)

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


const validade = () => {

    if (!Cliente) {
        Alert.alert("", "Erro: Necessário preencher o campo nome!");
        return false;
    }

    return true;
}
//========================================================================
// Adicona o pedido de vendas
//========================================================================

    const addOrder = async () => {

        await api.post('/order/add', {Data, CNPJ_Empresa ,CNPJ ,ID_Cliente ,Cliente ,Nome_Fantasia ,Vendedor ,Status ,Contato , CondPagto, Observações,UUid })    

        .then((response) => {
                Alert.alert("", response.data.mensagem);
            //    navigation.navigate('ListOrders');
                  
            }
        ).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    Alert.alert("", "Erro: Pedido de venda não cadastrado, tente mais tarde1!");
                }
        });
        getOrder(UUid);  
    }
    //==========================================================================
    // Busca o pedido de venda cadastrado
    //==========================================================================
    const getOrder = async () => {

        await api.get('/orders/UUid',{
        params: {
            UUid:UUid,
          }
         }) 
        
        .then((response) => {
            setID_Pedido(response.data.ID_Pedido.toString());
            console.log(ID_Pedido);
            //    navigation.navigate('ListOrders');     
            
            }
            ).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    Alert.alert("", "Erro: Pedido de venda não localizado, tente mais tarde1!");
                }
            });
    }
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerEdit>
            <Label>*N° Pedido</Label>
                <InputText
                    value={ID_Pedido}
                    onChangeText={text => setID_Pedido(text)}
                />                            
            <Label>*Documento</Label>
                <InputText
                    placeholder="Cnpj"
                    value={CNPJFormated}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setCnpjFormated(text)}
                />
            <Label>*Nome razão social</Label>
                <InputText
                    placeholder="Nome razão social"
                    value={Cliente}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setCliente(text)}
                />
            <Label>Nome Fantasia</Label>
                <InputText
                    placeholder="Nome fantasia"
                    value={Nome_Fantasia}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setNomeFantasia(text)}
                />

            <Label>*Contato do cliente</Label>
                <InputText
                    placeholder="Nome Contato"
                    value={Contato}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setNomeContato(text)}
                />
            <Label>*Condições de pagamento</Label>                
                <InputText
                    placeholder="digite as condições de pagamento"
                    value={CondPagto}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => SetcondPagto(text)}
                />
                    <Label style={{color: '#800000'}}>Observações</Label>
                    <ViewContent
                    placeholder="Digite as observações"      
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical = 'top'
                    onChangeText={text => setObservacoes(text)}                    
                    >
                    </ViewContent>                               

                <TitleRequired>* Campo obrigatório</TitleRequired>

                <BtnSubmitFormDash onPress={addOrder}>
                    <TxtSubmitFormDash>Cadastrar pedido</TxtSubmitFormDash>
                </BtnSubmitFormDash>

            </ContainerEdit>
        </ScrollView>
    )
}
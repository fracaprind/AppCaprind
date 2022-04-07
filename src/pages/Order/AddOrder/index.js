import React, { useState, useCallback, useContext } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation, useFocusEffect} from '@react-navigation/native';

import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TitleRequired } from '../../../styles/custom_adm';
import {ViewContent, BtnEditForm,TxtEditForm, Label, TxtForm, ButtonMask, ContainerEdit, InputText, LoadingArea } from '../../../styles/custom_adm';

import { MaskedTextInput } from "react-native-mask-text";

import {UserContext} from '../../../contexts/user';

import { format } from 'cnpj';

import api from '../../../config/api';


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

const [CNPJ, setCnpj] = useState('');
const [CPF, setCpf] = useState('');
const [ID_Cliente, setID_Cliente] = useState('');
const [Cliente, setCliente] = useState('');
const [NomeFantasia, setNomeFantasia] = useState('');
const [Contato1, setNomeContato] = useState('');           
const [CEP, setCep] = useState('');
const [UF, setUF] = useState(''); 
const [Cidade, setCidade] = useState('');
const [Bairro, setBairro] = useState('');
const [Endereco, setEndereco] = useState('');
const [Numero, setNumero] = useState('');
const [Telefone, setTelefone] = useState('');
const [Email, setEmail] = useState('');


const getClient = async () => {


    const { clientId } = route.params;

    await api.get('/clients/ID/' + clientId)
    .then((response) => {
        console.log(response.data.client);
        const formatted = format(response.data.client.CNPJ)
        setCnpj(formatted)            

        setID_Cliente(response.data.client.ID_Cliente)
        setClient(response.data.client);
        setLoading(false);
        setCliente(response.data.client.Cliente);
        setCep(response.data.client.CEP)
        setBairro(response.data.client.Bairro)
        setEndereco(response.data.client.Endereco)
        setNumero(response.data.client.Numero)
        setUF(response.data.client.UF)
        setCidade(response.data.client.Cidade) 
        setEmail(response.data.client.Email)                      
        setTelefone(response.data.client.Telefone)
        setNomeContato(response.data.client.Contato1)


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


    if (!CNPJ) {
        Alert.alert("", "Erro: Necessário preencher o campo CNPJ!");
        return false;
    }
       

    return true;
}


    const addOrder = async () => {
        await api.post('/order', { cliente })
            .then((response) => {
                Alert.alert("", response.data.mensagem);
                navigation.navigate('ListOrders');
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    Alert.alert("", "Erro: Usuário não cadastrado com sucesso, tente mais tarde!");
                }
            });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerEdit>
            <Label>Documento</Label>
                <InputText
                    placeholder="Cnpj"
                    value={CNPJ}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setCnpj(text)}
                />
            <Label>Nome razão social</Label>
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
                    value={NomeFantasia}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setNomeFantasia(text)}
                />

            <Label>Contato do cliente</Label>
                <InputText
                    placeholder="Nome Contato"
                    value={Contato1}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setNomeContato(text)}
                />

                    <Label style={{color: '#800000'}}>Observações</Label>
                    <ViewContent        
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical = 'top'
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
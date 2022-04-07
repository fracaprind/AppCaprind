import React, { useState, useContext,useCallback } from "react";
import { Alert, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Label, ContainerEdit, InputText, BtnEditForm, TxtEditForm, LoadingArea } from '../../../styles/custom_adm';

import {UserContext} from '../../../contexts/user';

import {  format } from 'cnpj';

import api from '../../../config/api';

export default function ViewClient({ route }) {

    const navigation = useNavigation();
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

        if (!Email) {
            Alert.alert("", "Erro: Necessário preencher o campo e-mail!");
            return false;
        }

        if (!CEP) {
            Alert.alert("", "Erro: Necessário preencher o campo CEP!");
            return false;
        }

        if (!Cidade) {
            Alert.alert("", "Erro: Necessário preencher o campo Cidade!");
            return false;
        }

        if (!UF) {
            Alert.alert("", "Erro: Necessário preencher o campo UF!");
            return false;
        }
        
        if (!Telefone) {
            Alert.alert("", "Erro: Necessário preencher o campo Telefone!");
            return false;
        }      

        return true;
    }

    const editClient = async () => {

        if (!validade()) return;

        setLoading(true);

        await api.post('/client/edit', {ID_Cliente, CNPJ_Empresa ,CNPJ ,CPF ,Cliente ,Email ,Telefone ,Vendedor ,NomeFantasia ,Contato1 ,CEP ,UF ,Cidade ,Bairro ,Endereco ,Numero })
            .then((response) => {
                setLoading(false);
                Alert.alert("", response.data.mensagem);
                navigation.navigate('ListClients');
            }).catch((err) => {
               // console.log(err.response.data.mensagem.toString());
                if (err.response) {
                    setLoading(false);
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    setLoading(false);
                    Alert.alert("", "Erro: Tente mais novamente!");
                }
            });
    }

    return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContainerEdit>
             <Label>Cnpj</Label>
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
                
            <Label>Email</Label>
                <InputText
                    placeholder="Email contato"
                    autoCorrect={false}
                    value={Email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setEmail(text)}
                />

            <Label>Telefone</Label>
                <InputText
                    placeholder="Telefone fixo"
                    autoCorrect={false}
                    value={Telefone}
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setTelefone(text)}
                />                

            <Label>CEP</Label>
                <InputText
                    placeholder="CEP"
                    autoCorrect={false}
                    value={CEP}
                    editable={!loading}
                    onChangeText={text => setCep(text)}
                />

            <Label>UF</Label>
                <InputText
                    placeholder="UF"
                    autoCorrect={false}
                    value={UF}
                    editable={!loading}
                    onChangeText={text => setUF(text)}
                />

            <Label>Cidade</Label>
                <InputText
                    placeholder="Cidade"
                    autoCorrect={false}
                    value={Cidade}
                    editable={!loading}
                    onChangeText={text => setCidade(text)}
                />

            <Label>Bairro</Label>
                <InputText
                    placeholder="Bairro"
                    autoCorrect={false}
                    value={Bairro}
                    editable={!loading}
                    onChangeText={text => setBairro(text)}
                />

            <Label>Logradouro</Label>
                <InputText
                    placeholder="Endereço"
                    autoCorrect={false}
                    value={Endereco}
                    editable={!loading}
                    onChangeText={text => setEndereco(text)}
                />

            <Label>Número</Label>
                <InputText
                    placeholder="Numero"
                    autoCorrect={false}
                    value={Numero}
                    editable={!loading}
                    onChangeText={text => setNumero(text)}
                />                   

                <BtnEditForm disabled={loading} onPress={editClient}>
                    <TxtEditForm>
                        Salvar cliente
                    </TxtEditForm>
                </BtnEditForm>

                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color="#fff" />
                    </LoadingArea>
                }
            </ContainerEdit>
        </ScrollView>
    )
}


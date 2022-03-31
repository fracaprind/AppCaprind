import React, { useState, useContext } from "react";
import { Alert, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { BtnEditForm,TxtEditForm, Label, ContainerEdit, InputText, LoadingArea } from '../../../styles/custom_adm';

import { MaskedTextInput } from "react-native-mask-text";

import {UserContext} from '../../../contexts/user';

import { format } from 'cnpj';

import api from '../../../config/api';

export default function NewClient() {

//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
    const {cnpj, vendedor} = useContext(UserContext);
    const [CNPJ_Empresa, setCNPJ_Empresa] = useState(cnpj);
    const [Vendedor, setVendedor] = useState(vendedor);
//=================================================
    const [CNPJ, setCNPJ] = useState('99999999999999');
    const [CPF, setCPF] = useState('');
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

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();


    //const formatted = format(CPF)

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

    const addClient = async () => {

        if (!validade()) return;

        setLoading(true);


        await api.post('/client/add', {CNPJ_Empresa,CPF ,CNPJ ,Cliente ,Email ,Telefone ,Vendedor ,NomeFantasia ,Contato1 ,CEP ,UF ,Cidade ,Bairro ,Endereco ,Numero })
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
            <Label>Nome Cliente</Label>
                <InputText
                    placeholder="Nome cliente"
                    value={Cliente}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setCliente(text)}
                />

            <Label>N° CPF</Label>
                <InputText
                    placeholder="CPF"
                    value={CPF}
                    autoCapitalize="none"
                    keyboardType="number-pad"                                      
                    editable={!loading}
                    onChangeText={text => setCPF(text)}
                />

            <Label>Nome fantasia</Label>
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
                    keyboardType="number-pad"                    
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setTelefone(text)}
                />

            <Label>CEP</Label>
                <InputText
                    placeholder="CEP"
                    autoCorrect={false}
                    value={CEP}
                    keyboardType="number-pad"                    
                    autoCapitalize="none"                    
                    editable={!loading}
                    onChangeText={text => setCep(text)}
                />

            <Label>UF</Label>
                <InputText
                    placeholder="UF"
                    autoCorrect={false}
                    value={UF}
                    autoCapitalize="characters"                     
                    editable={!loading}
                    onChangeText={text => setUF(text)}
                />

            <Label>Cidade</Label>
                <InputText
                    placeholder="Cidade"
                    autoCorrect={false}
                    value={Cidade}
                    autoCapitalize="characters"                       
                    editable={!loading}
                    onChangeText={text => setCidade(text)}
                />

            <Label>Bairro</Label>
                <InputText
                    placeholder="Bairro"
                    autoCorrect={false}
                    value={Bairro}
                    autoCapitalize="characters"                       
                    editable={!loading}
                    onChangeText={text => setBairro(text)}
                />

            <Label>Logradouro</Label>
                <InputText
                    placeholder="Endereço"
                    autoCorrect={false}
                    value={Endereco}
                    autoCapitalize="characters"                       
                    editable={!loading}
                    onChangeText={text => setEndereco(text)}
                />

            <Label>Número</Label>
                <InputText
                    placeholder="Numero"
                    autoCorrect={false}
                    value={Numero}
                    keyboardType="number-pad"                    
                    autoCapitalize="none"                    
                    editable={!loading}
                    onChangeText={text => setNumero(text)}
                />                   

                <BtnEditForm disabled={loading} onPress={addClient} >
                    <TxtEditForm>
                        Cadastrar cliente
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


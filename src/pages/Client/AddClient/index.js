import React, { useState, useContext } from "react";
import {  View, Alert, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import {InputUF, BtnEditForm,TxtEditForm, Label, TxtForm, ButtonMask, ContainerEdit, InputText, LoadingArea } from '../../../styles/custom_adm';

import { MaskedTextInput } from "react-native-mask-text";

import {UserContext} from '../../../contexts/user';

import { format } from 'cnpj';

import styles from '../style';

import api from '../../../config/api';

export default function NewClient() {

//================================================
//Buscar CNPJ da empresa e nome do usuario
//================================================
    const {cnpj, vendedor} = useContext(UserContext);
    const [CNPJ_Empresa, setCNPJ_Empresa] = useState(cnpj);
    const [Vendedor, setVendedor] = useState(vendedor);
//=================================================
    const [data, setData] = useState([]);
    
    const [ufNS, setufNS] = useState('');
    const [cnpjNS, setcnpjNS] = useState('');

    const [CPF, setCPF] = useState('');
    const [CNPJ, setCNPJ] = useState('');
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

/*  const [BCNPJ, setBCNPJ] = useState('');
    const [ACNPJ, setACNPJ] = useState('');
    const tokenNS = 'RkFCSU8gQ0FSRE9TTyBSc2ZGcTI=';
    const enderecoNS = 'https://nfe.ns.eti.br/util/conscad';
    const A = cnpjNS.replace(/[^0-9]/g,'');
    const B = CNPJ_Empresa.replace(/[^0-9]/g,'')
*/ 

    const validadeConsulta=()=>{

        if (!cnpjNS) {
            Alert.alert("", "Erro: Necessário preencher o campo CNPJ para pesquisa!");
            return false;
        }

        if (!ufNS) {
            Alert.alert("", "Erro: Necessário preencher o campo UF para pesquisa!");
            return false;
        }
    
        return true;
    }


const consultarCnpj = async ()=>{

    if (!validadeConsulta ()) return;
//==================================================================
// Variaveis para consulta CNPJ na NS
//==================================================================
    const ACNPJ = CNPJ_Empresa.replace(/[^0-9]/g,'');        
    const BCNPJ = cnpjNS.replace(/[^0-9]/g,'');

    const tokenNS = 'RkFCSU8gQ0FSRE9TTyBSc2ZGcTI=';
    const enderecoNS = 'https://nfe.ns.eti.br/util/conscad';

        console.log('===============================================================')
        console.log('CNPJ empresa: ' + ACNPJ);
        console.log('CNPJ pesquisa: ' + BCNPJ);
        console.log('UF pesquisa: ' + ufNS);
        console.log('tokenNS pesquisa: ' + tokenNS);
        console.log('enderecoNS pesquisa: ' + enderecoNS);                             

        setLoading(true);
        await api.post(enderecoNS,
            {
                "X-AUTH-TOKEN":"" + tokenNS + "",
                "CNPJCont":"" + ACNPJ + "",
                "UF":"" + ufNS + "",
                "CNPJ":""+ BCNPJ +""
            }
        )
        .then((response)=>{
            setLoading(false);
            setData(response.data.retConsCad.infCons.infCad)
            setCliente(response.data.retConsCad.infCons.infCad[0].xNome);
            setCNPJ(response.data.retConsCad.infCons.infCad[0].CNPJ);
            setCep(response.data.retConsCad.infCons.infCad[0].ender.CEP)
            setBairro(response.data.retConsCad.infCons.infCad[0].ender.xBairro)            
            setEndereco(response.data.retConsCad.infCons.infCad[0].ender.xLgr)
            setCidade(response.data.retConsCad.infCons.infCad[0].ender.xMun)
            setNumero(response.data.retConsCad.infCons.infCad[0].ender.nro)                           
            setUF(response.data.retConsCad.infCons.infCad[0].UF)
          Alert.alert("", "CNPJ localizado com sucesso!");
        }).catch((err)=>{
            if (err.response) {
               // Alert.alert("", err.response.data.mensagem.toString());
               Alert.alert("", err.response.toString);
               console.log("Fracasso1!")
            } else {
                console.log(err)
                Alert.alert("", "Erro: CNPJ não localizado, tente novamente!");
                return null;
            }
            console.log("Fracasso3!")
        })
    }

    const formatted = format(CNPJ)

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
            <Label>"Preencha com CNPJ em seguida preencha  UF"</Label>
                <View style={styles.containerMask}>
                    <MaskedTextInput 
                        placeholder="Preencha com CNPJ"
                        mask="99.999.999/9999-99"
                        value= {cnpjNS}
                        onChangeText={text => setcnpjNS(text)}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        style={styles.maskedTextInput}
                    />
                <InputUF
                    placeholder="UF"
                    autoCorrect={false}
                    value={ufNS}
                    editable={!loading}
                    autoCapitalize="characters"                    
                    onChangeText={text => setufNS(text)}
                />
                    <ButtonMask onPress={consultarCnpj}>
                        <TxtForm>
                            Pesquisar na receita federal
                        </TxtForm>
                    </ButtonMask>                
                </View>

      
            <Label>Nome razão social</Label>
                <InputText
                    placeholder="Nome razão social"
                    value={Cliente}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setCliente(text)}
                />

            <Label>CNPJ</Label>
                <InputText
                    placeholder="CNPJ"
                    value={formatted}
                    autoCapitalize="none"
                    keyboardType="number-pad"                                      
                    editable={!loading}
                    onChangeText={text => setCNPJ(text)}
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


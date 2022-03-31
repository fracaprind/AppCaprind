import React, { useState } from "react";
import { View, Alert, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { ContainerLogin, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../../styles/custom_adm';

import { MaskedTextInput, mask, unMask } from "react-native-mask-text";


import styles from './style';

import api from '../../../../src/config/api';

export default function NewUser() {

    const [CNPJ, setCnpj] = useState('');
    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const addUser = async () => {

        if (!validade()) return;

        setLoading(true);


        await api.post('/user/add', { CNPJ, Nome, Email, password })
            .then((response) => {
                setLoading(false);
                Alert.alert("", response.data.mensagem);
                navigation.navigate('Login');
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

    const validade = () => {
        if (!CNPJ) {
            Alert.alert("", "Erro: Necessário preencher o campo CNPJ!");
            return false;
        }        
        if (!Nome) {
            Alert.alert("", "Erro: Necessário preencher o campo nome!");
            return false;
        }
        if (!Email) {
            Alert.alert("", "Erro: Necessário preencher o campo e-mail!");
            return false;
        }
        if (!password) {
            Alert.alert("", "Erro: Necessário preencher o campo senha!");
            return false;
        }

        return true;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerLogin>
                <Logo>
                    <ImageLogo source={require('../../../../assets/logo.png')} />
                </Logo>

                <View style={styles.containerMask}>
                <MaskedTextInput 
                     placeholder="CNPJ da empresa" 
                     mask="99.999.999/9999-99"
                     value={CNPJ}
                     onChangeText={text => setCnpj(text)}
                     keyboardType="number-pad"
                     returnKeyType="done"
                     style={styles.maskedTextInput}
                />
                </View>
                <InputForm
                    placeholder="Seu nome completo"
                    value={Nome}
                    autoCapitalize="characters"                    
                    editable={!loading}
                    onChangeText={text => setNome(text)}
                />

                <InputForm
                    placeholder="Seu melhor e-mail"
                    autoCorrect={false}
                    value={Email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setEmail(text)}
                />

                <InputForm
                    placeholder="Senha"
                    autoCorrect={false}
                    value={password}
                    secureTextEntry={true}
                    editable={!loading}
                    onChangeText={text => setPassword(text)}
                />

                <BtnSubmitForm disabled={loading} onPress={addUser} >
                    <TxtSubmitForm>
                        Cadastrar
                    </TxtSubmitForm>
                </BtnSubmitForm>

                <LinkNewUser onPress={() => { navigation.navigate('Login') }}>
                    Login
                </LinkNewUser>

                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color="#fff" />
                    </LoadingArea>
                }
            </ContainerLogin>
        </ScrollView>
    )
}

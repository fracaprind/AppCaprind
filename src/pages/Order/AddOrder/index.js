import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TitleRequired } from '../../../styles/custom_adm';

import api from '../../../config/api';

export default function AddOrder() {

    const [cliente, setName] = useState('');

    const navigation = useNavigation();

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
            <Container>

                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash
                    placeholder="Nome cliente"
                    autoCorrect={false}
                    value={cliente}
                    onChangeText={text => setName(text)}
                />

                <TitleRequired>* Campo obrigatório</TitleRequired>

                <BtnSubmitFormDash onPress={addOrder}>
                    <TxtSubmitFormDash>Cadastrar pedido</TxtSubmitFormDash>
                </BtnSubmitFormDash>

            </Container>
        </ScrollView>
    )
}
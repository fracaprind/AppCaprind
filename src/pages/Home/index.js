import React, { useContext } from "react";
import { Text } from "react-native";
import { AuthContext } from '../../contexts/auth';

import { Title,SubTitle, ContainerDashboard,Logo, ImageLogo, BtnSubmitForm,TxtSubmitForm } from '../../styles/custom_adm';

export default function Home() {
const { signOut } = useContext(AuthContext);

return (
        <ContainerDashboard>
                <Logo>
                    <ImageLogo source={require('../../../assets/logo.png')} />
                </Logo>
            <Title>CAPRIND</Title>
            <SubTitle>Gestão empresarial</SubTitle>
            <Text>Bem vindo</Text>

  
            <BtnSubmitForm onPress={() => signOut()}>
            <TxtSubmitForm>
            Encerrar
            </TxtSubmitForm>
            </BtnSubmitForm>

        </ContainerDashboard>
    )
}
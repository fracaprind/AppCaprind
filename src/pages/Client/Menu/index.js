import React from 'react';
import {  View, Alert, ScrollView, ActivityIndicator } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {TxtMenuButton,ContainerLogin, ButtonMenu, TxtForm} from '../../../styles/custom_adm';

//import feather from 'react-native-vector-icons/feather'

export default function Menu() {
    
const navigation = useNavigation();

return(


        <ContainerLogin>
            <ButtonMenu onpress={() => navigation.navigate('AddClient')}>
                <TxtMenuButton >
                    Cliente pessoa Jurídica
                </TxtMenuButton>
            </ButtonMenu>
            <ButtonMenu 
            style={{backgroundColor: '#800000'}}
            //icon='edit'
            >
                <TxtMenuButton>
                    Cliente pessoa Física
                </TxtMenuButton>
            </ButtonMenu>
        </ContainerLogin>


)
}


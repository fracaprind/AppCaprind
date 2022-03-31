import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../config/api';

//===================================================
//Busca o cnpj da empresa
//===================================================
export const getValCnpj = async () => {
    const valCnpj = await AsyncStorage.getItem('@cnpj') 
    if(valCnpj!==null ){
        return (
            //console.log(valCnpj)
            valCnpj
            );
    }else{
        return null;
    };
}
//===================================================
//Busca o nome do usuario para vendedor
//===================================================
export const getValUser = async () => {
    const valUser = await AsyncStorage.getItem('@user')    
    if(valUser !==null ){
        return valUser;
    }else{
        return null;
    };
}
//===================================================

export const getValToken = async () => {
    await valUser();
    const valueToken = await AsyncStorage.getItem('@token');

    if (valueToken !== null) {
        return valueToken;
    } else {
        return null;
    }
};

const valUser = async () => {
    const valueToken = await AsyncStorage.getItem('@token');

    const headers = {
        'headers': {
            'Authorization': `Bearer ${valueToken}`
        }
    }

    await api.get('/val-token', headers)
    .then((response) => {
        //console.log(response);
        AsyncStorage.setItem('@name', response.data.user.name);
        AsyncStorage.setItem('@token', response.data.token);
    }).catch((err) => {
        if(err.response){
            AsyncStorage.removeItem('@token');
            AsyncStorage.removeItem('@name');
            //AsyncStorage.removeItem('@image');
            //Alert.alert("", err.response.data.mensagem);
        }else{
            AsyncStorage.removeItem('@token');
            AsyncStorage.removeItem('@name');
           // AsyncStorage.removeItem('@image');
            //Alert.alert("", "Erro: Necessário realizar o login para acessar a página!");
        }
        
    })
}
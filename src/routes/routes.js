import React, { useEffect, useMemo, useState, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getValToken } from "../services/auth";
import { AuthContext  } from '../contexts/auth';
import {  UserProvider  } from '../contexts/user';

const Stack = createNativeStackNavigator();

import Login from "../pages/Login";
import NewUser from "../pages/User/NewUser";
import RecoverPassword from "../pages/RecoverPassword";
import VerifyKey from "../pages/VerifyKey";

export default function Routes() {
    const [userToken, setUserToken] = useState(null);

    const authContext = useMemo(() => {
        return {
        //Buscar token usuario localmente
            signIn: async () => {
                const valToken = AsyncStorage.getItem('@token');               
                setUserToken(valToken);  
            },
            // Ao sair apaga o valor do token
            signOut: async () => {
                AsyncStorage.removeItem('@token');
                AsyncStorage.removeItem('@name');
                AsyncStorage.removeItem('@cnpj');
                setUserToken(null);
            }
        }
    }, []);
    //Busca o valor do token localmente
    const getToken = async () => {
        try {
            const valToken = await getValToken();
            if (valToken !== null) {
                const valToken = AsyncStorage.getItem('@token');
                setUserToken(valToken);
            } else {
                setUserToken(null);
            }
        } catch (err) {
            setUserToken(null);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {userToken ? (
                    //Login com sucesso direciona ao dashboard                
                    <TabNavigator />
                ) : (
                    //Direciona a pagina do login
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="RecoverPassword"
                            component={RecoverPassword}
                            options={{ headerTitle: "Recuperar senha" }} />
                        <Stack.Screen
                            name="VerifyKey"
                            component={VerifyKey}
                            options={{ headerTitle: "Verificar a chave" }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
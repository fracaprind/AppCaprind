import {createContext, useState, useEffect} from 'react';
import { getValCnpj, getValUser} from '../services/auth'

export const UserContext = createContext({});

function UserProvider({children}){
//==============================================
//Busca o CNPJ da empresa
//==============================================
const [cnpj, setCnpj] = useState('');

 const getCnpj = async () => {
        try {
            const valCnpj = await getValCnpj();
            if (valCnpj !== null) {
                setCnpj(valCnpj);
            } else {
                setCnpj(null);
            }
        } catch (err) {
            setCnpj(null);
        }
    }

useEffect(() => {
    getCnpj();
}, []);

//==============================================
//Busca o nome do vendedor da empresa
//==============================================
const [vendedor, setVendedor] = useState('');

 const getvendedor = async () => {
        try {
            const valvendedor = await getValUser();
            if (valvendedor !== null) {
                setVendedor(valvendedor);
            } else {
                setVendedor(null);
            }
        } catch (err) {
            setVendedor(null);
        }
    }

useEffect(() => {
    getvendedor();
}, []);

    return(
        <UserContext.Provider value={{ cnpj, vendedor }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
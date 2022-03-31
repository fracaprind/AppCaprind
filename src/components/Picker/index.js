import React from "react";

import RNPickerSelect from '@react-native-picker/picker';


export default function Picker(){
    return(
        <RNPickerSelect 
        items={[
            {key:'1', label:'Nome',value:'Nome'},
            {key:'2', label:'CNPJ',value:'CNPJ'},
            {key:'3', label:'CPF',value:'CPF'},
        ]}
        onValueChange={(valor)=> console.log(valor)}
        />
    );
}
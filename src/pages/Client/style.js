import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text:{
        backgroundColor: '#fff',
        fontSize:10,
        margin:10,
        padding:10,
        borderWidth:1,
        borderRadius:6,
        borderColor: '#a3a3a3'
    },
   picker: {
    backgroundColor: '#fff',
    marginVertical: 0,
        padding: 5,
        fontSize: 5,
        borderWidth:1,
        borderRadius:6,
        borderColor: '#a3a3a3',        
        color:'#a3a3a3',
        width:120,
    },
    maskedTextInput: {
        flexGrow:1,
        height:50,
        fontSize:14,
        borderColor:'#fff',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:5,
        alignSelf:'flex-start',
        backgroundColor:'#fff',
        padding:10,

    },

    buttonMask:{
        borderRadius:15,
        backgroundColor:'#fff',
    },

    containerMask:{
        flexDirection:'row',
        marginLeft:0,
        marginRight:0,
    },

    ButtonSubmit:{
        marginLeft: 15,
        borderRadius:7,
        width:100
    }
});

export default styles
import styled from 'styled-components/native';

export const ButtonSubmit = styled.Button`
    background-color: #19428f;
    width: 90%;
    height: 55px;
    align-items: center;
    justify-content: center;
    border-radius: 27px;
`;

export const ButtonMask = styled.TouchableOpacity`
    background-color: #19428f;
    width: 90px;
    height: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom:10px;
    margin-left:5px;
`;

export const ButtonMenu = styled.TouchableOpacity`
    background-color: #19428f;
    width: 300px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom:30px;
    margin-left:5px;
`;

export const TxtMenuButton = styled.Text`
    color: #fff;
    font-size: 14px;
`;

export const ContainerLogin = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #DCDCDC;
    padding:20px;
`;

export const ContainerTipo = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #DCDCDC;
    padding:10px;
`;

export const ContainerDashboard = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #DCDCDC;
    padding:20px;
`;

export const Logo = styled.View`
    padding-bottom: 10px;
`;

//==========================================================
// Formulario de edição
//==========================================================
export const ContainerRow = styled.SafeAreaView`
    flex: 1;
    flex-direction:row;
    align-items: flex-start;
    justify-content: center;
    background-color: #DCDCDC;
    padding:20px;
`;
export const ContainerEdit = styled.SafeAreaView`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
    background-color: #DCDCDC;
    padding:20px;
`;

export const Label = styled.Text`
    font-size: 10px;
    color: #4F4F4F;
    margin: 0px 0 2px;
    text-align:left;
`;

export const Label1 = styled.Text`
    font-size: 8px;
    color: #fff;
    margin-right: 0px;
    text-align:right;
`;

export const InputText = styled.TextInput`
    text-align:Left;
    background-color: #fff;
    width: 100%;
    margin-bottom: 10px;
    color: #222;
    font-size: 12px;
    border-radius: 4px;
    padding: 5px;
`;

export const InputUF = styled.TextInput`
    text-align:center;
    background-color: #fff;
    width: 40px;
    margin-bottom: 10px;
    margin-left: 5px;    
    color: #222;
    font-size: 12px;
    border-radius: 4px;
    padding: 5px;
`;

export const BtnEditForm = styled.TouchableOpacity`
    background-color: #19428f;
    width: 100%;
    height: 55px;
    align-items: center;
    justify-content: center;
    border-radius: 27px;
`;

export const TxtEditForm = styled.Text`
    color: #fff;
    font-size: 14px;
`;

//=======================================================

export const Title = styled.Text`
    font-size: 30px;
    color: #000;
    text-align:center;
`;

export const SubTitle = styled.Text`
    font-size: 15px;
    color: #4F4F4F;
    margin: 0px 0 10px;
    text-align:center;
`;



export const InputForm = styled.TextInput`
    text-align:left;
    background-color: #fff;
    width: 90%;
    margin-bottom: 10px;
    color: #222;
    font-size: 14px;
    border-radius: 4px;
    padding: 12px;
`;




export const BtnSubmitForm = styled.TouchableOpacity`
    background-color: #19428f;
    width: 90%;
    height: 55px;
    align-items: center;
    justify-content: center;
    border-radius: 27px;
`;

export const TxtSubmitForm = styled.Text`
    color: #fff;
    font-size: 18px;
`;

export const TxtForm = styled.Text`
    color: #fff;
    font-size: 9px;
    text-align:center;
    padding:3px;
`;

export const LinkNewUser = styled.Text`
    color: #000;
    margin-top: 10px;
    font-size: 14px;
`;

export const ImageLogo = styled.Image`
    width: 120px;
    height: 120px;
`;

export const LoadingArea = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
`;

export const Container = styled.SafeAreaView`
    flex: 1;
    font-size: 11px;
    padding: 30px;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
    align-self: stretch;
`;

export const TitleList = styled.Text`
    color: #111;
    font-size: 22px;
    padding: 10px 0;
`;

export const List = styled.View`
    width: 95%;
    margin:10px;
`;

export const RowData = styled.View`
    background-color: #f5f5f5;
    padding: 5px;
    margin: 5px 0px 0px 0px;
    border-radius: 3px;
    flex-direction: row;
    justify-content: flex-start;
`;

export const InfoData = styled.Text`
    color: #111;
    flex: 1;
    flex-direction: column;
`;

export const ValueData = styled.Text`
    font-size: 16px;
    flex: 0;
`;

export const BtnView = styled.Text`
    justify-content: flex-end;
`;

export const TitleViewContent = styled.Text`
    padding-top: 15px;
    color: #111;
    font-weight: bold;
    font-size: 12px;
`;

export const ViewInputContent = styled.TextInput`
    padding-bottom: 5px;
    color: #111;
    font-size: 12px;
    border-bottom-color: #c0c0c0;
    border-bottom-width: 1px;
`;

export const ViewContent = styled.TextInput`
    padding-bottom: 5px;
    color: #111;
    font-size: 12px;
    border-bottom-color: #c0c0c0;
    border-bottom-width: 1px;
`;

export const BtnActionEdit = styled.TouchableOpacity`
    margin-top: 15px;
    background-color: #19428f;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`;

export const BtnActionDelete = styled.TouchableOpacity`
    margin-top: 15px;
    background-color: #8b0000;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`;

export const TxtBtnAction = styled.Text`
    color: #fff;
    font-size: 14px;
`;

export const TxtListTitle = styled.Text`
    margin-top: 15px;
    background-color: #4682B4;    
    color: #fff;
    width: 100%;
    height: 45px;
    margin-bottom: 15px;
    justify-content: center;
    border-radius: 4px;
    font-size: 14px;
    padding:10px;
    text-align: center;
`;

export const TitleIcon = styled.TouchableOpacity`
    margin: 5px;
    height: 25px;
    padding: 0px;
    border: 1px solid;
    border-color: #fff;
    width:35px;
    border-radius: 3px;
    align-items: center;
    align-content: center;
`;

export const LabelFormDash = styled.Text`
    color: #111;
    font-size: 18px;
`;

export const InputFormDash = styled.TextInput`
    background-color: #fff;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    color: #222;
    font-size: 18px;
    border-radius: 4px;
    border-color: #19428f;
    border-width: 1px;
`;

export const BtnSubmitFormDash = styled.TouchableOpacity`
    background-color: #19428f;
    width: 100%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
`;

export const TxtSubmitFormDash = styled.Text`
    color: #fff;
    font-size: 19px;
`;

export const TitleRequired = styled.Text`
    padding-bottom: 5px;
    color: #111;
    font-size: 12px;
`;





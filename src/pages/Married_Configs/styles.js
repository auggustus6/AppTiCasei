import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const ContainerImage = styled.ImageBackground`
    background:#ddd;
    padding:10px;
    height:200px;
    align-items:center;
    justify-content:center;
`;

export const ButtonChangeImage = styled.TouchableOpacity`
    position:absolute;
    bottom:-25;
    right:10px;
    align-self:flex-end;
    width:60px;
    height:60px;
    background-color:#672F9E;
    border-radius:30px;
    align-items:center;
    justify-content:center;
`;


export const Form = styled.View`
    align-self:stretch;  
    padding:20px;
`;

export const TitleForm = styled.Text`
    align-self:center;
    margin:20px 0px;
    font-size:18px;
    color:#979797;
`;

export const InputForms = styled.TextInput.attrs({
    borderBottomWidth: 1,
    borderBottomColor: '#999',
})`
    padding:20px;
    margin:10px 0px;
    border-radius:100px;
    text-align:center;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    background:#672F9E;
    padding:20px;
    margin:10px 0px;
    border-radius:100px;
`;

export const TextButton = styled.Text`
    color:#fff;
    text-align:center;
`;


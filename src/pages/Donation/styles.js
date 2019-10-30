import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    padding:20px;
    justify-content:flex-end;
`;

export const ContainerScrollView = styled.ScrollView``;

export const ContainerCard = styled.View``;

export const Rules = styled.Text`
    margin:20px 0px;
    font-size:14px;
    color:#979797;
    text-align:center;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    background:#672F9E;
    padding:20px;
    margin:10px 0px;
    align-self:stretch;
    border-radius:100px;
`;

export const TextButton = styled.Text`
    color:#fff;
    text-align:center;
`;

export const FormCard = styled.View`
   margin-top:20px;
`;

export const FormGroup = styled.View``;

export const InputAmount = styled.TextInput.attrs({
    borderRadius: 50,
    borderWidth:1,
    borderColor: '#ddd',
})`
    margin-bottom:10px;
    font-size:14px;
    background:#ddd;
    padding:15px;
`;



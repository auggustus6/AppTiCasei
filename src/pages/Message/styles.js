import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const Form = styled.View`
    align-self:stretch;
`;

export const TitleForm = styled.Text`
    align-self:center;
    margin:20px 0px;
    font-size:18px;
    color:#979797;
`;

export const InputForms = styled.TextInput`
    background:#E8E8E8;
    padding:20px;
    margin:10px 0px;
    border-radius:20px;
    text-align:center;
    height:${props => props.multiline ? '100px' : 'auto'}
  
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

export const SmallRules = styled.Text`
    font-size:9px;
    color:#979797;
    text-align:center;
`;

import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    padding:10px;
`;

export const TitleForm = styled.Text`
    color:#444;
    font-size:18px;
    font-weight:bold;
`;

export const FormContainer = styled.View`
    margin-top:20px;
`;

export const FormGroup = styled.View`
    margin-bottom:40px;
    width: ${props => props.select ? '50%' : 'auto'}
`;

export const Label = styled.Text`
    color:#999;
    font-size:13px;
`;

export const ContainerSelects = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;

export const InputDate = styled.TextInput.attrs({
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
})``;

export const InputText = styled.TextInput.attrs({
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
})``;

export const Select = styled.Picker.attrs({
    borderColor: '#ddd',
    borderWidth: 1
})``;

export const ButtonSubmit = styled.TouchableOpacity.attrs({
    shadowColor: "#000",
    shadowOffset: {
        width: 5,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
})`
    align-self:flex-end;
    background-color:#7230B4;
    padding:15px;
    width:150px;
    border-radius:75px;
`;
export const TextButton = styled.Text`
    color:#fff;
    text-align:center;
`;

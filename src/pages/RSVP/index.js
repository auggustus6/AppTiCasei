import React from 'react';

import {
    Container,
    TitleForm,
    FormContainer,
    FormGroup,
    Label,
    InputDate,
    InputText,
    Select,
    ContainerSelects,
    ButtonSubmit,
    TextButton
} from './styles';


function RSVP() {


    handlePresence = () => console.log('Marcar Presença');

    return (
        <Container>
            <FormContainer>
                <TitleForm>Confirme sua presença</TitleForm>
                <FormGroup>
                    <InputDate
                        placeholder="Data do casamento"
                        placeholderTextColor="#333"
                        editable={false}
                        value="12/10/2022"
                        underlineColorAndroid='transparent'
                    />
                </FormGroup>


                <FormGroup>
                    <Label>Nome do convidado (igual ao convite) </Label>
                    <InputText
                        placeholderTextColor="#333"
                        value="Carlos Augusto"
                        underlineColorAndroid='transparent'
                    />
                </FormGroup>



                <FormGroup>
                    <Label>Telefone para contato</Label>
                    <InputText
                        placeholderTextColor="#333"
                        value="17 98191-4239"
                        underlineColorAndroid='transparent'
                    />
                </FormGroup>

                <ContainerSelects>
                    <FormGroup
                        select={true}>
                        <Label>Você irá ao evento</Label>
                        <Select
                            selectedValue='Evento'
                            onValueChange={(item, itemIndex) => { }}>
                            <Select.Item label="Sim" value="Sim" />
                            <Select.Item label="Não" value="Não" />
                        </Select>
                    </FormGroup>

                    <FormGroup
                        select={true}>
                        <Label>Quantos adultos?</Label>
                        <Select
                            selectedValue='Adultos'
                            onValueChange={(item, itemIndex) => { }}>
                            <Select.Item label="1" value="1" />
                            <Select.Item label="2" value="2" />
                            <Select.Item label="3" value="3" />
                            <Select.Item label="4" value="4" />
                        </Select>
                    </FormGroup>

                </ContainerSelects>

                <ButtonSubmit onPress={handlePresence}>
                    <TextButton>Confirmar</TextButton>
                </ButtonSubmit>

            </FormContainer>
        </Container>
    );
}

RSVP.navigationOptions = ({ navigation }) => {
    return {
        title: 'RSVP',
    }
}

export default RSVP;

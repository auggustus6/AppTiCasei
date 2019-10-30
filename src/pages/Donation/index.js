import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    ContainerScrollView,
    ContainerCard,
    Rules,
    ButtonSubmit,
    TextButton,
    FormCard,
    FormGroup,
    InputAmount
} from './styles';

import IconGravata from '~/assets/svgs/iconGravata.svg';
import Icon from 'react-native-vector-icons/Feather';

import { CreditCardInput } from "react-native-credit-card-input";
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { TextInputMask } from 'react-native-masked-text'

function Donation() {
    const userLogged = useSelector(state => state.user);
    const married = useSelector(state => state.married);
    const [formCard, setFormCard] = useState({
        amount: '',
        card_number: 0,
        card_cvv: 0,
        card_expiration_date: 0,
        card_holder_name: '',
        isValid: false,
    })

    const [customer, setCustomer] = useState({
        external_id: userLogged.idUser,
        name: userLogged.Nome,
        cpf: '',
        phoneNumber: '',
        type: 'individual',
        country: 'br',
        email: userLogged.Email,
    })

    const [item, setItem] = useState({
        id: 'donation#' + married.dataMarried.title.trim(),
        title: 'Doação' + married.dataMarried.title.trim(),
        unit_price: formCard.amount,
        quantity: 1,
        tangible: true
    })

    _onChange = form => {

        const { values, valid } = form;
        setFormCard({
            card_number: values.number,
            card_cvv: values.cvc,
            card_expiration_date: values.expiry,
            card_holder_name: '',
            isValid: valid
        })
    }

    _sendDonation = async () => {
        if (!formCard.isValid) {
            console.log('Cartão invalido')
            return false;
        }
        const idMarrid = await AsyncStorage.getItem('@idMarried');

        const res = await api.post(`married/${idMarrid}/createTransaction`, { ...formCard, ...customer, ...item })

        console.log(res);
    }

    return (
        <Container>
            <ContainerScrollView>
                <ContainerCard>
                    <CreditCardInput
                        inputStyle={{
                            backgroundColor: '#ddd',
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            height: 60
                        }}
                        inputContainerStyle={{
                            borderWidth: 0,
                            flexDirection: 'column',
                        }}
                        labels={{ name: 'Carlos' }}
                        cardScale={1}
                        onChange={_onChange} />
                </ContainerCard>

                <FormCard>
                    <FormGroup>
                        <TextInputMask
                            type={'cpf'}
                            placeholder="CPF"
                            placeholderTextColor="#999"
                            underlineColorAndroid="transparent"
                            value={customer.cpf}
                            onChangeText={cpf => setCustomer({ ...customer, cpf })}
                        />

                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            placeholder="Telefone"
                            placeholderTextColor="#999"
                            underlineColorAndroid="transparent"
                            value={customer.phoneNumber}
                            onChangeText={phoneNumber => setCustomer({ ...customer, phoneNumber })}
                        />
                        <InputAmount
                            placeholder="R$ 0,00"
                            placeholderTextColor="#999"
                            underlineColorAndroid="transparent"
                            value={formCard.amount}
                            onChangeText={amount => setFormCard({ ...formCard, amount })}
                        />
                    </FormGroup>

                    <ButtonSubmit onPress={_sendDonation}>
                        <TextButton>FAZER DOAÇÃO</TextButton>
                    </ButtonSubmit>
                </FormCard>
            </ContainerScrollView>
        </Container>



        // <Container>
        //     <IconGravata 
        //         width={60} height={164} />

        //     <Rules>
        //         Essa é a hora que o casal irá construir sua vida do zero!!
        //         Faça uma doação de qualquer valor ao casal.
        //     </Rules>
        // </Container>
    );
}

Donation.navigationOptions = (navigation) => {
    return {
        title: 'Doação',
        drawerIcon: ({ tintColor }) => (
            <Icon name="credit-card" color={tintColor} size={18} />
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}

export default Donation;
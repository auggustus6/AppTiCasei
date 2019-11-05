import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Alert } from 'react-native';

import { TextInputMask } from 'react-native-masked-text'
import { CreditCardInput } from "react-native-credit-card-input";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import api from '~/services/api';

import {
    Container,
    ContainerScrollView,
    ContainerCard,
    ButtonSubmit,
    TextButton,
    FormCard,
    FormGroup,
} from './styles';
import DonationLogout from './DonationLogout';

function Donation({ navigation }) {
    const userLogged = useSelector(state => state.user);
    const married = useSelector(state => state.married);

    const [loading, setLoading]=useState(false);
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

    const options = {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$',
        suffixUnit: ''
    }

    _onChange = form => {

        const { values, valid } = form;
        setFormCard({
            card_number: values.number,
            card_cvv: values.cvc,
            card_expiration_date: values.expiry,
            card_holder_name: values.name,
            isValid: valid
        })
    }

    _sendDonation = async () => {
        setLoading(true);
        const [precision, number] = formCard.amount.split('R$');
        const numberSplit = number.split(',')
        const pointSplit = numberSplit.join('').split('.');
        const unionNumber = [...pointSplit];
        const amountNumber = parseFloat(unionNumber.join(''));

        if (!formCard.isValid) {
            Alert.alert('Opa', 'Cartão está invalido. Verifique informações');
            setLoading(false);
            return false;
        }

        const idMarrid = await AsyncStorage.getItem('@idMarried');
        const res = await api.post(`married/${idMarrid}/createTransaction`, { ...formCard, amount: amountNumber, ...customer, ...item });

        if (res.status === 200) {
            setLoading(false);
            navigation.navigate('Confirmacoes');
        } else {
            setLoading(false);
            Alert.alert('Opa', 'Tente novamente mais tarde.');
        }

    }

    handleLogin = () => navigation.navigate('Login');

    return (

        <Container>

            {!userLogged.idUser && <DonationLogout handleLogin={handleLogin} />}

            {userLogged.idUser &&
                <ContainerScrollView>
                    <ContainerCard>
                        <CreditCardInput
                            inputStyle={{
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: '#ddd',
                                height: 60
                            }}
                            requiresName={true}
                            addtionalInputsProps={{
                                name: { defaultValue: '' }
                            }}
                            inputContainerStyle={{ borderWidth: 0 }}
                            cardScale={1}
                            onChange={_onChange} />
                    </ContainerCard>

                    <FormCard>
                        <FormGroup>

                            <TextInputMask
                                style={styles.inputMask}
                                type={'cpf'}
                                placeholder="CPF"
                                placeholderTextColor="#999"
                                underlineColorAndroid="transparent"
                                value={customer.cpf}
                                onChangeText={cpf => setCustomer({ ...customer, cpf })}
                            />

                            <TextInputMask
                                style={styles.inputMask}
                                type={'cel-phone'}
                                options={{ maskType: 'BRL', withDDD: true, dddMask: '+55 99 ' }}
                                placeholder="Telefone"
                                placeholderTextColor="#999"
                                underlineColorAndroid="transparent"
                                value={customer.phoneNumber}
                                onChangeText={phoneNumber => setCustomer({ ...customer, phoneNumber })}
                            />
                            <TextInputMask
                                style={[styles.inputMask, styles.inputMoney]}
                                type={'money'}
                                options={options}
                                placeholder="R$ 0,00"
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                value={formCard.amount}
                                onChangeText={amount => setFormCard({ ...formCard, amount })}
                            />
                        </FormGroup>

                        <ButtonSubmit disabled={!formCard.isValid} onPress={_sendDonation}>
                            <TextButton>
                                {loading ? 'ENVIANDO...' : 'FAZER DOAÇÃO'}
                            </TextButton>
                        </ButtonSubmit>
                    </FormCard>
                </ContainerScrollView>
            }
        </Container>
    );
}


const styles = StyleSheet.create({
    inputMask: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        fontSize: 14,
        paddingHorizontal: 15,
        paddingVertical: 15
    },

    inputMoney: {
        backgroundColor: '#672F9E',
        color: '#fff',
        fontSize: 28,
    }
})

Donation.navigationOptions = () => {
    return {
        title: 'Gravata',
        drawerIcon: ({ tintColor }) => (
            <Icon name="credit-card" color={tintColor} size={18} />
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}


export default Donation;
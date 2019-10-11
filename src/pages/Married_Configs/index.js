import React, { useState } from 'react';
import { TouchableOpacity as Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';


import { loggedAccount } from '~/store/actions/userAction';

import {
    Container,
    Form,
    TitleForm,
    InputForms,
    ButtonSubmit,
    TextButton,
    SmallRules
} from './styles';

import IconAccount from '~/assets/svgs/IconAccount.svg';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';



function Married_Configs({ navigation }) {
    const dispatch = useDispatch();
    const [account, setAccount] = useState({
        Email: '',
        Password: ''
    });

    handleLogout = async () => {
        dispatch({
            type: 'LOGOUT_USER'
        })
        await AsyncStorage.multiRemove(['@token','@userLogged'])
        navigation.navigate('Main');
    }


    handleAccount = () => dispatch(loggedAccount(account));

    return (
      
            <Container>
                <IconAccount width={120} height={120} />

                <Form>
                    <TitleForm>CONFIGURACOES</TitleForm>

                    <InputForms
                        placeholder="E-mail de acesso"
                        placeholderTextColor="#B6B3B3"
                        underlineColorAndroid="transparent"
                        onChangeText={email => setAccount({ ...account, Email: email })} />
                    <InputForms
                        placeholder="Senha de acesso"
                        placeholderTextColor="#B6B3B3"
                        underlineColorAndroid="transparent"
                        onChangeText={password => setAccount({ ...account, Password: password })} />


                    <ButtonSubmit onPress={handleAccount}>
                        <TextButton>ENTRAR</TextButton>
                    </ButtonSubmit>

                    <Button onPress={handleLogout}>
                        <Text>Sair</Text>
                    </Button>

                </Form>

                <SmallRules>
                    Após criar sua conta você terá acesso à criar seu casamento
                e enviar para seus amigos o código de acesso.
            </SmallRules>

            </Container>
      
    );
}

Married_Configs.navigationOptions = ({ navigation }) => {

    return {
        headerLeft: (
            <View >
                <Button onPress={() => navigation.navigate('Home')} style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                    <Icon name="chevron-left" size={18} color='#333' />
                    <Text style={{ color: '#333', fontSize: 18 }}>Back</Text>
                </Button>
            </View>
        )
    }
}

export default Married_Configs;

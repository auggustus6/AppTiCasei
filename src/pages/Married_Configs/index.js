import React, { useState } from 'react';
import { TouchableOpacity as Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import { loggedAccount } from '~/store/actions/userAction';

import {
    Container,
    ContainerImage,
    ButtonChangeImage,
    Form,
    InputForms,
    ButtonSubmit,
    TextButton,
} from './styles';

import Follows from './Follows';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';



function Married_Configs({ navigation }) {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.user);
    const [account, setAccount] = useState({
        Email: '',
        Password: ''
    });

    handleLogout = async () => {
        dispatch({
            type: 'LOGOUT_USER'
        })
        await AsyncStorage.multiRemove(['@token', '@userLogged', '@tokenFacebook'])
        navigation.navigate('Main');
    }


    handleAccount = () => dispatch(loggedAccount(account));

    return (

        <Container>
            <ContainerImage>
                <Icon name="image" size={140} color="#eee" />
                <ButtonChangeImage>
                    <Icon name="upload-cloud" size={20} color="#fff" />
                </ButtonChangeImage>
            </ContainerImage>



            <Form>

                <InputForms
                    placeholder="Nome completo"
                    value={userLogged.Nome}
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent" />

                <InputForms
                    placeholder="E-mail de acesso"
                    value={userLogged.Email}
                    editable={false}
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent"
                    onChangeText={email => setAccount({ ...account, Email: email })} />


                <Follows />

                <ButtonSubmit onPress={handleAccount}>
                    <TextButton>Salvar</TextButton>
                </ButtonSubmit>


                <Button style={{ marginVertical: 20 }} onPress={handleLogout}>
                    <Text style={{ textAlign: 'center' }}>Sair</Text>
                </Button>

            </Form>

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

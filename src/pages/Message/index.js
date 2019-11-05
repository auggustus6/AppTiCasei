import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from'react-native';

import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';
import IconMessage from '~/assets/svgs/iconMessage.svg';

import {
    Container,
    Form,
    TitleForm,
    InputForms,
    ButtonSubmit,
    TextButton,
    SmallRules
} from './styles';

function Message() {
    const userLogged = useSelector(state => state.user);
    const [name, setName] = useState(userLogged.Nome ? userLogged.Nome : '');
    const [text, setText] = useState('');


    sendMessage = async () => {
        const idMarried = await AsyncStorage.getItem('@idMarried');
        if(name && text !== ''){
            const res = await api.post(`married/${idMarried}/sendMessages`, {name, text});

            if(res.status === 200){
                Alert.alert('Obrigado', res.data.message);
                clearInputs();
            }else {
                Alert.alert('Opa', res.data.message);
                clearInputs();
            }
        } else {
            Alert.alert('Opa', 'Nome ou Mensagem estão em branco');
        }
    }

    clearInputs = () => {
        setText('');
        setName('');
    }

    return (
        <Container 
        contentContainerStyle={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            padding:20,
        }}>
            <IconMessage width={100} height={100} />

            <Form>
                <TitleForm>Deixe uma mensagem para  os noivos!</TitleForm>

                <InputForms
                    value={userLogged.Nome ? userLogged.Nome : name}
                    placeholder="Seu nome"
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent"
                    onChangeText={name => setName(name)}
                    />
                <InputForms
                    value={text}
                    placeholder="Conte como você conheceu os noivos
                    ou apenas envie boas lembranças."
                    multiline={true}
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent"
                    onChangeText={text => setText(text)}
                    />


                <ButtonSubmit onPress={sendMessage}>
                    <TextButton>ENVIAR MENSAGEM</TextButton>
                </ButtonSubmit>

            </Form>

            <SmallRules>
                Todas as mensagens serão enviadas diretamente aos noivis. Não esqueça de identificar-se.
            </SmallRules>

        </Container>
    )
}


Message.navigationOptions = (navigation) => {
    return {
        title:'Mensagens',
        drawerIcon: ({ tintColor }) => (
                <Icon name="send" color={tintColor} size={18} />
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}



export default Message;
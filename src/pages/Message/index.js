import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {View,  Alert, Animated, Easing} from'react-native';

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
    const opacidade = new Animated.Value(0);
    const posicao = new Animated.ValueXY(0,0);
    const userLogged = useSelector(state => state.user);
    const [name, setName] = useState(userLogged.Nome ? userLogged.Nome : '');
    const [text, setText] = useState('');

    useEffect(()=>{
           Animated.timing(opacidade, {
                toValue: 1,
                duration:1000,
                useNativeDriver:true
            }).start();
    }, [])

    // Animated.loop(
    //     Animated.timing(glass, {
    //       toValue: 1,
    //       duration: 400,
    //       Infinite: true,
    //       useNativeDriver: true
    //     })
    //   ).start();


    sendMessage = async () => {
        const idMarried = await AsyncStorage.getItem('@idMarried');
        if(name && text !== ''){
            const res = await api.post(`married/${idMarried}/sendMessages`, {name, text});

            if(res.status === 200){
                Alert.alert('Obrigado', res.data.message);
                clearInputs();
            }else {
                Alert.alert('Ops, algo aconteceu', res.data.message);
                clearInputs();
            }
        } else {
            Alert.alert('Ops', 'nome e/ou mensagem estão em branco');
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
            <Animated.View style={{
            transform: [
              {
                translateX: opacidade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1000, 0]
                })
              }]
            }}>
                <IconMessage width={100} height={100} />
            </Animated.View>
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
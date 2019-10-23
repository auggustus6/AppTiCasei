import React, { useState } from 'react';
import { TouchableOpacity as Button, Text, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LoginManager } from 'react-native-fbsdk';

import { updateUser } from '~/store/actions/userAction';

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

import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

// const RNFS = require('react-native-fs');


function Married_Configs({ navigation }) {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.user);

    const [account, setAccount] = useState({
        Email: userLogged.Email,
        Nome: userLogged.Nome,
        idUser: userLogged.idUser
    });

    handleLogout = async () => {
        dispatch({ type: 'LOGOUT_USER' });
        await AsyncStorage.multiRemove(['@token', '@userLogged', '@tokenFacebook']);
        LoginManager.logOut();
        navigation.navigate('Main');
    }

    handleAccount = () => dispatch(updateUser(account));

    handleImage = () => {

        const optionsImage = {
            title: 'Selecionar Imagens',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(optionsImage, async (response) => {

            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else {
                // const imageResizer = await ImageResizer.createResizedImage(response.uri, 350, 350, 'JPEG', 100)

              let data = {};

                data.image = {
                    filename: response.fileName,
                    type: response.type,
                    path: response.path,
                    uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", "")
                }


                const dataEnd = {
                    archive: true,
                    idUser: account.idUser,
                    data
                }
                dispatch(updateUser(dataEnd));
            };
        })
    }

    return (

        <Container>
            <ContainerImage source={{ uri: userLogged.image ? userLogged.image : null }}>
                {!userLogged.image && <Icon name="image" size={140} color="#eee" />}

                <ButtonChangeImage onPress={handleImage}>
                    <Icon name="upload-cloud" size={20} color="#fff" />
                </ButtonChangeImage>
            </ContainerImage>



            <Form>

                <InputForms
                    placeholder="Nome completo"
                    value={account.Nome}
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent"
                    onChangeText={Nome => setAccount({ ...account, Nome })} />

                <InputForms
                    placeholder="E-mail de acesso"
                    value={account.Email}
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

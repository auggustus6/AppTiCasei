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


function Married_Configs({ navigation }) {
    const dispatch = useDispatch();
    const userLogged = useSelector(state => state.user);


    const [visibleModal, setVisibleModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);

    const [account, setAccount] = useState({
        Email: userLogged.Email,
        Nome: userLogged.Nome,
        idUser: userLogged.idUser
    });

    function openModal(img) {
        setImageModal(img);
        setVisibleModal(!visibleModal);
    }

    function closeModal() {
        setVisibleModal(!visibleModal);
    }

    handleLogout = async () => {
        dispatch({ type: 'LOGOUT_USER' });
        await AsyncStorage.multiRemove(['@token', '@userLogged', '@tokenFacebook']);
        LoginManager.logOut();
        navigation.navigate('Main');
    }

    handleAccount = () => {
        if (account.Nome !== userLogged.Nome) {
            dispatch(updateUser(account));
        }
    }

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
                const imageResizer = await ImageResizer.createResizedImage(response.uri, 350, 350, 'JPEG', 100);

                let data = {
                    name: imageResizer.name,
                    type: response.type,
                    path: imageResizer.path,
                    uri: Platform.OS === "android" ? imageResizer.uri : imageResizer.uri.replace("file://", "")
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

            <ContainerImage
                source={{ uri: userLogged.image ? userLogged.image : null }}>
                {!userLogged.image && <Icon name="image" size={140} color="#eee" />}

                {userLogged.type !== 'Facebook' &&
                    <ButtonChangeImage onPress={handleImage}>
                        <Icon name="upload-cloud" size={20} color="#fff" />
                    </ButtonChangeImage>
                }
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

                <ButtonSubmit onPress={handleAccount} disabled={userLogged.loading}>
                    <TextButton>{userLogged.loading ? 'Salvando' : 'Salvar'}</TextButton>
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

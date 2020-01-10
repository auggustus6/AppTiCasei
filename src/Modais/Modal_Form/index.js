import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Alert,
    ScrollView,
    View,
    Modal,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TextInput,
    Text,
    TouchableOpacity as Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';


import Icon from 'react-native-vector-icons/Feather';
import api from '~/services/api';
import { createMural } from '~/services/realmDB/muralService.js';

const width = Dimensions.get('window').width;
const noImage = 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg';

export default function Modal_Form({ visible, closeModal }) {

    const userLogged = useSelector(state => state.user);
    const [form, setForm] = useState({
        thumbnail: null,
        userId: userLogged.idUser,
        description: ''
    });

    
    useEffect(() => {
        let mounted = false;
        if(!mounted){
            setForm({
                thumbnail: null,
                description: '',
            })
        }
        return () => {
            mounted = true;
        }
   
    }, [visible])


    handleMural = async () => {
        const idMarried = await AsyncStorage.getItem('@idMarried');
        if (form.thumbnail === null) {
            Alert.alert('Opa!', 'Você precisa enviar alguma imagem')
            return;
        } if (form.description === '') {
            Alert.alert('Opa!', 'Você não enviou nenhuma descrição!')
            return;
        }

        await createMural(form);
    
        const data = new FormData();
        data.append('mural', form.thumbnail);
        data.append('description', form.description);

        const res = await api.post(`married/${idMarried}/newMural`, data);

        if (res.status === 200) {
            closeModal();
            setForm({
                thumbnail: null,
                description: '',
            })
        } else {
            Alert.alert('Opa!', 'Tente novamente mais tarde!');
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
                return;
            } else if (response.error) {
                return;
            } else {
                const imageResizer = await ImageResizer.createResizedImage(response.uri, 350, 350, 'PNG', 70);
                setForm({ ...form, thumbnail: { ...imageResizer, type: response.type } })
            };
        })
    }


    return (
        <ScrollView style={[styles.container, !visible ? { display:"none"} : {display:'flex'} ]}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => closeModal()}>
                <View style={styles.form}>
                    <Image
                        resizeMode='cover'
                        blurRadius={9}
                        source={form.thumbnail === null ? { uri: noImage } : form.thumbnail}
                        style={styles.imageCover} />

                    <ImageBackground
                        resizeMode='contain'
                        source={form.thumbnail === null ? { uri: noImage } : form.thumbnail}
                        style={styles.image}>
                        <Button onPress={handleImage} style={styles.buttonChange}>
                            <Icon name="upload-cloud" size={20} color="#fff" />
                        </Button>
                    </ImageBackground>




                    <View style={styles.formGroup}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Descrição Foto"
                            placeholderTextColor="#333"
                            value={form.description}
                            onChangeText={description => setForm({ ...form, description })}
                        />
                    </View>

                    <Button style={[styles.button,
                    { backgroundColor: form.thumbnail === null ? '#999' : '#7230B4' }]} onPress={handleMural} disabled={form.thumbnail === null ? true : false}
                    >
                        <Text style={styles.buttonText}>Enviar Imagem</Text>
                    </Button>
                </View>
            </Modal>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        height: 380,
    },

    imageCover: {
        position: 'absolute',
        width,
        resizeMode: 'cover',
        height: 380
    },

    buttonChange: {
        position: 'absolute',
        bottom: -25,
        right: 10,
        alignSelf: 'flex-end',
        width: 60,
        height: 60,
        backgroundColor: '#672F9E',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    formGroup: {
        paddingHorizontal: 20,
        marginTop: 20,
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },

    button: {

        marginTop: 20,
        marginHorizontal: 10,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 50,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    }

})
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, Dimensions, TouchableOpacity as Button } from 'react-native';


import {
    Container,
    ContainerCard,
    ContainerMural,
    CardHeader,
    TitleHeader,
    ContainerDate,
    Date,
    CardImage,
    ImageCard,
    Description,
    CardActions,
    Avatar,
    ContainerBadge,
    BadgeModal
} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import SocketIOClient from 'socket.io-client';


import Modal_Image from '~/Modais/Modal_Image';
import Modal_Form from '~/Modais/Modal_Form';
import api from '~/services/api';
import env from '~/config/Environment';
import NoUser from '~/components/NoUser/NoUser';


const width = Dimensions.get('window').width;

function Mural({ navigation }) {
    const married = useSelector(state => state.married);
    const userLogged = useSelector(state => state.user);
    const socket = useMemo(() => SocketIOClient(env.url), [userLogged.idUser]);

    const [murals, setMurals] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleForm, setFormVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false);


    useEffect(() => {
        if (userLogged.idUser) {
            socket.on('muralCreated', newMural => {
                setMurals([newMural, ...murals])

            });
        }
    }, [murals, socket])

    useEffect(() => {
        if (userLogged.idUser) {
            async function getMurals() {
                const idMarried = married.dataMarried.id;
                const res = await api.get(`married/${idMarried}/getMurals`);
                setMurals(res.data);
            }
            getMurals();
        }
    }, [userLogged])

    handleLike = async (idMural) => {
        const idMarried = await AsyncStorage.getItem('@idMarried');
        const res = await api.post(`married/${idMarried}/${idMural}/liked`);
        const muralLiked = res.data;

        const newMurals = murals.map(mural => {
            if (mural._id === muralLiked.id) {
                mural.likes = [...muralLiked.likes]
            }
            return mural;
        })
        setMurals(newMurals)
    }

    showLikes = (likes) => {
        const [filterLiked] = likes.filter(like => like === userLogged.idUser);

        if (filterLiked) {
            return (
                <View>
                    <Icon name="heart" size={24} color='#f1003b' />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Icon name="heart" size={24} color='#999' />
                </View>
            )
        }
    }

    openModal = (img) => {
        setImageModal(img);
        setVisibleModal(!visibleModal);
    }

    openModalForm = () => {
        setFormVisible(!visibleForm);
    }

    closeModal = () => {
        setVisibleModal(!visibleModal);
    }

    formatDate = (data) => {
        const [date, ...rest] = data.split('T');
        const d = date.split('-');
        const newDate = d.reverse().join('/');
        return newDate;
    }

    renderMural = () => {
        if (!userLogged.idUser) {
            return (
                <Container>
                    <NoUser
                        src={require('~/assets/animates/mural.json')}
                        textButton="FAZER LOGIN"
                        handlePress={() => navigation.navigate('Login')} />
                </Container>
            )
        }
        else if (!murals.length) {
            return (

                <Container>
                    <NoUser
                        src={require('~/assets/animates/mural.json')}
                        textButton="COMEÇAR"
                        handlePress={openModalForm} />

                    <Modal_Form
                        closeModal={() => setFormVisible(!visibleForm)}
                        visible={visibleForm}
                    />
                </Container>


            )
        }
        else {
            return (
                <Container>
                    <ContainerMural>
                        {murals.map((feed) => {
                            return (
                                <ContainerMural key={feed.id}>
                                    <ContainerCard>
                                        <CardHeader>
                                            <Avatar source={{ uri: feed.userAssign.image_url }} />
                                            <TitleHeader>{feed.userAssign.Nome}</TitleHeader>
                                            <ContainerDate>
                                                <Date>{formatDate(feed.createdAt)}</Date>
                                            </ContainerDate>
                                        </CardHeader>

                                        <Button onPress={() => openModal(feed)}>
                                            <CardImage style={{ width }}>
                                                <ImageCard source={{ uri: feed.label_url }} />
                                            </CardImage>
                                        </Button>



                                        <CardActions>
                                            <Button onPress={() => handleLike(feed._id)} style={{ marginRight: 10 }}>
                                                {showLikes(feed.likes)}
                                            </Button>
                                        </CardActions>

                                        <Description>{feed.description}</Description>
                                    </ContainerCard>
                                </ContainerMural>
                            )
                        })}
                    </ContainerMural>
                    <ContainerBadge>
                        <BadgeModal onPress={openModalForm}>
                            <Icon name="camera" size={18} color="#fff" />
                        </BadgeModal>
                    </ContainerBadge>

                    <Modal_Form
                        closeModal={() => setFormVisible(!visibleForm)}
                        visible={visibleForm}
                    />

                    {visibleModal &&
                        <Modal_Image
                            image={imageModal}
                            visible={visibleModal}
                            closeModal={closeModal}
                        />
                    }
                </Container>


            )
        }
    }

    return renderMural();
}


Mural.navigationOptions = () => {
    return {
        title: "Mural",
        drawerIcon: ({ tintColor }) => <Icon name="image" color={tintColor} size={18} />
    }
}

export default Mural;

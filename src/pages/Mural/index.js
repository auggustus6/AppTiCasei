import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { View, Dimensions, TouchableOpacity as Button, Alert, Image } from 'react-native';
import Share from 'react-native-share';

import {
    Container,
    ContainerCard,
    CardHeader,
    TitleHeader,
    ContainerDate,
    Date,
    CardImage,
    ImageCard,
    Description,
    CardFooter,
    CardActions,
    CardComments,
    Author,
    Avatar,
    Comment,
    ContainerInput,
    InputCommentaries,
    ContainerBadge,
    BadgeModal
} from './styles';

import avatarBoy from '~/assets/images/avatarBoy.png'
import avatarGirl from '~/assets/images/avatarGirl.png'
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import SocketIOClient from 'socket.io-client';

import { async_postComment, async_like_image } from '~/store/actions/marriedAction';

import Modal_Image from '~/Modais/Modal_Image';
import Modal_Form from '~/Modais/Modal_Form';
import api from '~/services/api';

const width = Dimensions.get('window').width;

function Mural() {
    const married = useSelector(state => state.married);
    const userLogged = useSelector(state => state.user);
    const [murals, setMurals] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleForm, setFormVisible] = useState(false);
    const [imageModal, setImageModal] = useState(false);


    const [comment, setComment] = useState({
        author: '',
        comment: '',
        genre: userLogged.genre,
    })

    const socket = useMemo(() => SocketIOClient('https://powerful-river-29517.herokuapp.com/'),[userLogged.idUser])


    useEffect(() => {
        socket.on('muralCreated', newMural => {
            setMurals([...murals, newMural])
        });
    }, [murals, socket])

    useEffect(() => {
        async function getMurals() {
            const idMarried = married.dataMarried.id;
            const res = await api.get(`married/${idMarried}/getMurals`);
            setMurals(res.data);
        }
        getMurals();
    }, [])






    function openModal(img) {
        setImageModal(img);
        setVisibleModal(!visibleModal);
    }

    function openModalForm() {
        setFormVisible(!visibleForm);
    }

    function closeModal() {
        setVisibleModal(!visibleModal);
    }

    handleLike = async (idImage) => {

    }

    handleShared = async (galeria) => {

    }

    showLikes = (likes) => {
        if (likes.id === userLogged.idUser && likes.id !== undefined) {
            return (
                <View>
                    <Icon name="heart" size={24} color='#f1003b' />
                </View>
            )
        } else {
            return (
                <View>
                    <Icon name="heart" size={24} color='#999' />
                </View>
            )
        }
    }

    submitPost = async (idImage) => {
        if (comment.comment !== '') {
            const idMarried = await AsyncStorage.getItem('@idMarried');

        }
    }

    return (
        <Container>
            {murals.map((feed) => {
                return (
                    <ContainerCard key={feed._id}>
                        <CardHeader>
                            <Avatar source={{ uri: userLogged.image }} />
                            <TitleHeader>{userLogged.Nome}</TitleHeader>
                            <ContainerDate>
                                <Date>Ola</Date>
                            </ContainerDate>
                        </CardHeader>

                        <Button onPress={() => openModal(feed)} >
                            <CardImage style={{ width }}>
                                <ImageCard source={{ uri: `${feed.label_url}` }} />
                            </CardImage>
                        </Button>


                        {visibleModal &&
                            <Modal_Image
                                image={imageModal}
                                visible={visibleModal}
                                closeModal={closeModal}
                            />
                        }


                        <CardActions>
                            <Button onPress={() => handleLike(feed._id)} style={{ marginRight: 10 }}>
                                {showLikes(feed.likes)}
                            </Button>

                            <Button onPress={() => handleShared(feed)}>
                                <Icon name="share" size={24} color='#999' />
                            </Button>
                        </CardActions>

                        <Description>{feed.description}</Description>

                        {/* <CardFooter>
                            {
                                feed.commentaries.map(comment => {
                                    return (
                                        <CardComments key={comment._id}>
                                            <Avatar source={comment.genre === 'Masculino' ? avatarBoy : avatarGirl} />
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                <Author>{comment.author}</Author>
                                                <Comment>{comment.commentarie}</Comment>
                                            </View>
                                        </CardComments>
                                    )
                                })
                            }

                            <ContainerInput>
                                <InputCommentaries
                                    placeholder="Digite seu comentário"
                                    placeholderTextColor="#ddd"
                                    underlineColorAndroid="transparent"
                                    value={comment.comment}
                                    onChangeText={(text) => setComment({ author: userLogged.Nome, comment: text, genre: userLogged.genre })}
                                />
                                <Button onPress={() => submitPost(feed._id)}>
                                    <Icon name="navigation" size={22} color="#333" />
                                </Button>
                            </ContainerInput>
                        </CardFooter> */}
                    </ContainerCard>
                )
            })}

            <ContainerBadge>
                <BadgeModal onPress={openModalForm}>
                    <Icon name="camera" size={18} color="#fff" />
                </BadgeModal>
            </ContainerBadge>

            <Modal_Form
                closeModal={() => setFormVisible(!visibleForm)}
                visible={visibleForm}
            />

        </Container>
    );
}


Mural.navigationOptions = () => {
    return {
        title: "Mural",
        drawerIcon: ({ tintColor }) => (
            <Icon name="image" color={tintColor} size={18} />
        )
    }
}

export default Mural;

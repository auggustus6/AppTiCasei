import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Dimensions, TouchableOpacity as Button, Alert } from 'react-native';
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
    InputCommentaries
} from './styles';

import avatarBoy from '~/assets/images/avatarBoy.png'
import avatarGirl from '~/assets/images/avatarGirl.png'
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { async_postComment, async_like_image } from '~/store/actions/marriedAction';
const width = Dimensions.get('window').width;

function Gallery() {
    const dispatch = useDispatch();
    const married = useSelector(state => state.married);
    const userLogged = useSelector(state => state.user);

    const [comment, setComment] = useState({
        author: '',
        comment: '',
        genre: userLogged.genre,
    })

    handleLike = async (idImage) => {
        if (userLogged.idUser) {
            const idMarried = await AsyncStorage.getItem('@idMarried')
            dispatch(async_like_image(idMarried, idImage))
        } else {
            Alert.alert('Opa!', 'Você precisa estar logado, para curtir uma imagem.');
        }
    }

    handleShared = async (galeria) => {
        try {
            const [findImage] = married.dataMarried.gallery_url.filter(url => url._id === galeria._id);
            const shareOptions = {
                title: married.dataMarried.title,
                message: galeria.description,
                url: findImage.label
            };
            await Share.open(shareOptions);
        } catch (err) {
            console.log(err)
        }
    }

    showLikes = (likes) => {
        if (likes.length) {
            const [userLikes] = likes.filter((user, index) => {
                if (user === userLogged.idUser) return user
            })

            if (userLikes === userLogged.idUser) {
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
        else {
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
            dispatch(async_postComment(idMarried, idImage, comment))
            setComment('');
        }
    }

    return (
        <Container>
            {married.dataMarried.gallery.map((feed) => {
                return (
                    <ContainerCard key={feed._id}>
                        <CardHeader>
                            <Avatar source={{ uri: married.dataMarried.banner_url }} />
                            <TitleHeader>{married.dataMarried.husband} e {married.dataMarried.wife}</TitleHeader>
                            <ContainerDate>
                                <Date>08/10/2019</Date>
                            </ContainerDate>
                        </CardHeader>

                        {married.dataMarried.gallery_url.map(gallery => {
                            if (feed._id === gallery._id) {
                                return (
                                    <CardImage style={{ width }} key={gallery._id}>
                                        <ImageCard source={{ uri: gallery.label }} />
                                    </CardImage>
                                )
                            }
                        })}

                        <CardActions>
                            <Button onPress={() => handleLike(feed._id)} style={{ marginRight: 10 }}>
                                {showLikes(feed.likes)}
                            </Button>

                            <Button onPress={() => handleShared(feed)}>
                                <Icon name="share" size={24} color='#999' />
                            </Button>
                        </CardActions>

                        <Description>{feed.description}</Description>

                        <CardFooter>
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
                                {!userLogged.idUser ?

                                    <TitleHeader>Você precisa estar logado
                                        para fazer comentários.
                                </TitleHeader>
                                    :
                                    <>
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
                                    </>
                                }

                            </ContainerInput>
                        </CardFooter>
                    </ContainerCard>
                )
            })}
        </Container>
    );
}


Gallery.navigationOptions = () => {
    return {
        title: "Galeria",
        drawerIcon: ({ tintColor }) => (
            <Icon name="image" color={tintColor} size={18} />
        )
    }
}

export default Gallery;

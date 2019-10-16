import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Dimensions, TouchableOpacity as Button } from 'react-native';

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
    ShowMore,
    ShowText,
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

import { async_postComment } from '~/store/actions/marriedAction';
const width = Dimensions.get('window').width;

function Gallery() {
    const dispatch = useDispatch();
    const married = useSelector(state => state.married);
    const userLogged = useSelector(state => state.user);

    const [comment, setComment] = useState({
        author: '',
        genre: userLogged.genre,
        comment: ''
    })



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

                        <Description>{feed.description}</Description>

                        <CardFooter>
                            <CardActions></CardActions>

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
                                            onChangeText={(text) => setComment({ author: userLogged.Email, comment: text, genre:userLogged.genre })}
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

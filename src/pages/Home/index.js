import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Container,
    CardWelcome,
    ContainerImage,
    ContentMarried,
    TitleMarried,
    Description,
    ReadMore,
    ReadText,
    CardFeed,
    ContentFeed,
    TitleFeed,
    DescriptionFeed,
    TextMore,
    HorizontalMenu,
    CardPresence,
    TitleIcon
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import IconAccount from '~/assets/svgs/IconAccount.svg';

import Icon from 'react-native-vector-icons/Feather';

function Home(props) {
    const dispatch = useDispatch();
    const married = useSelector(state => state.married);

    useEffect(() => {
        hasToken();
    }, [])

    hasToken = async () => {
        const userAsync = await AsyncStorage.getItem('@userLogged');
        const user = JSON.parse(userAsync);
        const tokenFacebook = await AsyncStorage.getItem('@tokenFacebook');
        const token = await AsyncStorage.getItem('@token');
  
        if (user && token) {
            dispatch({
                type: 'LOGGED_USER',
                payload: { ...user, token }
            })
            props.navigation.setParams({ user });
        } else if (tokenFacebook){
            console.log('Logado com facebook');
        }
        
        else {
            return false;
        }
    }

    return (
        <Container>
            <CardWelcome>
                <ContainerImage source={{ uri: married.dataMarried.banner_url }}>
                </ContainerImage>

                <ContentMarried>
                    <TitleMarried>{married.dataMarried.title}</TitleMarried>
                    <Description numberOfLines={5} ellipsizeMode='tail'>
                        {married.dataMarried.annotations}
                    </Description>
                    <ReadMore onPress={() => props.navigation.navigate('Historia')}>
                        <ReadText>Continuar história</ReadText>
                    </ReadMore>
                </ContentMarried>

            </CardWelcome>

            <CardFeed>
                <Icon name="cast" size={32} color="#fff" />
                <ContentFeed>
                    <TitleFeed>Mural TiCasei</TitleFeed>
                    <DescriptionFeed>Pegue seus celulares, é hora de compartilhar suas fotos em tempo real para que todas possam ver :)</DescriptionFeed>
                </ContentFeed>
            </CardFeed>

            <TextMore>Veja Mais</TextMore>

            <HorizontalMenu
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <CardPresence>
                    <IconAccount width={50} height={50} />
                    <TitleIcon>Marcar Presença</TitleIcon>
                </CardPresence>

                <CardPresence>
                    <IconAccount width={50} height={50} />
                    <TitleIcon>Lista Presentes</TitleIcon>
                </CardPresence>

                <CardPresence>
                    <IconAccount width={50} height={50} />
                    <TitleIcon>Galeria</TitleIcon>
                </CardPresence>

                <CardPresence>
                    <IconAccount width={50} height={50} />
                    <TitleIcon>Mensagens</TitleIcon>
                </CardPresence>
            </HorizontalMenu>
        </Container>
    );
}

Home.navigationOptions = () => {
    return {
        drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} size={18} />,
        iconContainerStyle: {
            opacity: 1
        }
    }
}


export default Home;

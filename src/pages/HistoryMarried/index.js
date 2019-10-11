import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import {
    Container,
    ContainerImage,
    TitleMarried,
    Description,
    ContainerGallerys,
    ClickImage,
    Image
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

function HistoryMarried() {
    const married = useSelector(state => state.married);
    return (
        <Container>
            <ContainerImage source={{ uri: married.dataMarried.banner_url }}></ContainerImage>

            <TitleMarried>{married.dataMarried.title}</TitleMarried>

            <Description>
                {married.dataMarried.annotations}
            </Description>

            <ContainerGallerys horizontal={true} showsHorizontalScrollIndicator={false}>
            
                {
                    married.dataMarried.gallery_url.map((img, index) => {
                        return (
                            <ClickImage key={img._id}>
                                <Image source={{ uri: img.label }} />
                            </ClickImage>
                        )
                    })
                }

            </ContainerGallerys>
        </Container>
    );
}

HistoryMarried.navigationOptions = (navigation) => {
    return {
        title: 'Nossa História',
        drawerIcon: ({ tintColor }) => (

            <Icon name="film" color={tintColor} size={18} />

        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}


export default HistoryMarried;

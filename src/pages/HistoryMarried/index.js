import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
import Modal_Image from '~/Modais/Modal_Image';

function HistoryMarried() {
    const [visibleModal, setVisibleModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const married = useSelector(state => state.married);

    function openModal(img) {
        setImageModal(img);
        setVisibleModal(!visibleModal);

    }

    function closeModal() {
        setVisibleModal(!visibleModal);
    }

    return (
        <Container>
            <ContainerImage
                source={{ uri: married.dataMarried.banner_url }}>
            </ContainerImage>

            <TitleMarried>{married.dataMarried.title}</TitleMarried>

            <Description>
                {married.dataMarried.annotations}
            </Description>

            <ContainerGallerys
                horizontal={true}
                showsHorizontalScrollIndicator={false}>

                {
                    married.dataMarried.gallery_url.map((img) => {
                        return (
                            <ClickImage key={img._id} onPress={() => openModal(img)}>
                                <Image source={{ uri: img.label }} />
                            </ClickImage>

                        )
                    })
                }

                {visibleModal &&
                    <Modal_Image
                        image={imageModal}
                        visible={visibleModal}
                        closeModal={closeModal}
                    />
                }

            </ContainerGallerys>
        </Container>
    );
}

HistoryMarried.navigationOptions = ({ navigation }) => {
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

import React from 'react';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
import {
    Container,
    ContainerHeader,
    ContainerContent,
    Title,
    SmallTitle,
    ListGifts,
    CompanyGift,
    CompanyImage
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

function Gifts() {
    return (
        <Container>
            <ContainerHeader>
                <>
                </>
                <ContainerContent>
                    <Title>Confira  o local onde fizemos nossa lista de presentes.</Title>
                    <SmallTitle>ou se preferir faça uma doação online.</SmallTitle>
                </ContainerContent>
            </ContainerHeader>

            <ListGifts>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map(image => {
                        return (
                            <CompanyGift key={image} style={{ width: width * 0.3 }}>
                                <CompanyImage />
                            </CompanyGift>
                        )
                    })
                }

            </ListGifts>

        </Container>
    );
}

Gifts.navigationOptions = () => {
    return {
        title: 'Lista de Presentes',
        drawerIcon: ({ tintColor }) => (
                <Icon name="gift" color={tintColor} size={18} />
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}

export default Gifts;
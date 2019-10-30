import React from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, View } from 'react-native';

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
    const married = useSelector(state => state.married);
    console.log(married);
    return (
        <Container>
            <ContainerHeader>
                <>
                </>
                <ContainerContent>
                    <Title>Confira  o local onde fizemos nossa lista de presentes.</Title>
                </ContainerContent>
            </ContainerHeader>

            <ListGifts>
                {
                    married.dataMarried.listGifts.map(gift => {
                        return (
                            <View key={gift._id} style={{
                                width: width * 0.3, borderColor: "#ddd",
                                height:100,
                                marginRight:10,
                                borderWidth: 1
                            }}>
                                <CompanyGift>
                                    <CompanyImage source={{ uri: gift.logo }} />
                                </CompanyGift>
                            </View>
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
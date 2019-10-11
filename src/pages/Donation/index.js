import React from 'react';
import { View } from 'react-native';

import {
    Container,
    Rules,
    ButtonSubmit,
    TextButton
} from './styles';

import IconGravata from '~/assets/svgs/iconGravata.svg';
import Icon from 'react-native-vector-icons/Feather';

function Donation() {
    return (
        <Container>
            <IconGravata 
                width={60} height={164} />

            <Rules>
                Essa é a hora que o casal irá construir sua vida do zero!!
                Faça uma doação de qualquer valor ao casal.
            </Rules>

            <ButtonSubmit onPress={() => {}}>
                <TextButton>FAZER DOAÇÃO</TextButton>
            </ButtonSubmit>
            

        </Container>
    );
}

Donation.navigationOptions = (navigation) => {
    return {
        title:'Doação',
        drawerIcon: ({ tintColor }) => (
            <Icon name="credit-card" color={tintColor} size={18} />
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}

export default Donation;
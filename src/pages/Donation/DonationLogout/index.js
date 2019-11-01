import React from 'react';

import { Container, Rules, ButtonSubmit, TextButton } from './styles';

import IconGravata from '~/assets/svgs/iconGravata.svg';

function DonationLogout({handleLogin}) {
    return (
        <Container>
            <IconGravata
                width={60} height={164} />

            <Rules>
            Faça uma doação de qualquer valor ao casal.
            É preciso estar logado para realizar a doação.
            </Rules>

            <ButtonSubmit onPress={handleLogin}>
                <TextButton>FAZER LOGIN</TextButton>
            </ButtonSubmit>
        </Container>
    )
}

export default DonationLogout;


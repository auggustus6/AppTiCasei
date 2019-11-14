import React from 'react';

import { Container, Rules, ButtonSubmit, TextButton } from './styles';

import LottieView from 'lottie-react-native';

export default function NoUser({ handlePress, textButton, src }) {
    return (
        <Container>
            <LottieView style={{ width: 200, height: 200 }}
                source={src} autoPlay loop={true} />

            <Rules>
                A melhor parte da festa começa agora!
                Pegue seus celulares e faça selfies incriveis com os noivos!
            </Rules>

            <ButtonSubmit onPress={handlePress}>
                <TextButton>{textButton}</TextButton>
            </ButtonSubmit>
        </Container>
    );
}

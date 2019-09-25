import React from 'react';
import { useState, useEffect } from 'react-native';

import {
    Container,
    Logo,
    ContainerChoice,
    TitleChoice,
    ContainerInput,
    InputChoice,
    ButtonChoice
} from './styles';

function Main() {
  return (
    <Container>
      <Logo></Logo>

      <ContainerChoice>
        <TitleChoice>Escolha seu Casamento</TitleChoice>

        <ContainerInput>
          <InputChoice />
          <ButtonChoice />
        </ContainerInput>

      </ContainerChoice>

    </Container>
  )
}

export default Main;


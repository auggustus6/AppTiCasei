import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  ImageBackground,
  Logo,
  ContainerChoice,
  TitleChoice,
  ContainerInput,
  InputChoice,
  ButtonChoice,
  SVGButtons
} from './styles';

import logo from '~/assets/images/logotipo.png';
import bgImage from '~/assets/images/backgroundImage.png'


import arrowSVG from '~/assets/images/Arrow.png';

import { async_getMarried } from '~/store/actions/marriedAction';

function Main({ navigation }) {
  const dispatch = useDispatch();
  const married = useSelector(state => state.married);
  const [code, setCode] = useState(0);



  useEffect(() => {
    hasCode();
  }, [])


  hasCode = async () => {
    const code = await AsyncStorage.getItem('@CodeMarried');
    console.log(code);
    if (code) {
      dispatch(async_getMarried(code));
    }
  }

  handleMarried = code => {
    setCode(code);
  }

  handleChoiceMarried = () => {
    dispatch(async_getMarried(code));
  }

  return (
    <Container>
      <ImageBackground source={bgImage} />
      <Logo source={logo}></Logo>

      <ContainerChoice>
        <TitleChoice>Escolha seu Casamento</TitleChoice>

        <ContainerInput>
          <InputChoice
            placeholder="INSIRA O CÓDIGO DO CASAMENTO"
            placeholderTextColor="#DBDBDB"
            onChangeText={handleMarried} />

          <ButtonChoice onPress={handleChoiceMarried}>
            <SVGButtons source={arrowSVG} />
          </ButtonChoice>

        </ContainerInput>

      </ContainerChoice>

    </Container>
  )
}


export default Main;


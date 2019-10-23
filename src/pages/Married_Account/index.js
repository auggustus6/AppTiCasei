import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import { createAccount } from '~/store/actions/userAction';

import {
  ContainerScroll,
  Container,
  Form,
  TitleForm,
  InputForms,
  FormGroup,
  Select,
  ButtonSubmit,
  TextButton,
  SmallRules
} from './styles';

import IconAccount from '~/assets/svgs/IconAccount.svg';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;


function Married_Account({ navigation }) {
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    Nome: '',
    genre: '',
    Email: '',
    type: '',
    Password: ''
  });

  handleAccount = () => {

    if (account.genre !== 999 || account.genre !== '') {
      dispatch(createAccount(account));
    }
  }

  handleLogoutFacebook = async () => {
    dispatch({ type: 'LOGOUT_USER' });
    await AsyncStorage.multiRemove(['@token', '@userLogged', '@tokenFacebook']);
    navigation.navigate('Main');
  }


  loginCallback = async (error, result) => {
    if (error) {
      console.log(error)
    }
    else {
      dispatch(createAccount({
        id: result.id,
        Nome: result.name,
        Image: result.picture.data.url,
        genre: 'Masculino',
        Email: result.email,
        type: 'Facebook',
        Password: ''
      }));

    }
  }

  initUser = (token) => {
    const infoRequest = new GraphRequest('/me', {
      accessToken: token,
      parameters: {
        fields: {
          string: 'id, email, picture.type(large),gender,name'
        }
      }
    }, loginCallback)
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  return (
    <ContainerScroll>
      <Container>
        <IconAccount width={120} height={120} />

        <Form>
          <TitleForm>VAMOS CRIAR SUA CONTA</TitleForm>

          <InputForms
            placeholder="Nome Completo"
            placeholderTextColor="#B6B3B3"
            underlineColorAndroid="transparent"
            onChangeText={nome => setAccount({ ...account, Nome: nome })} />

          <InputForms
            placeholder="E-mail de acesso"
            placeholderTextColor="#B6B3B3"
            underlineColorAndroid="transparent"
            onChangeText={email => setAccount({ ...account, Email: email })} />
          <InputForms
            placeholder="Senha de acesso"
            placeholderTextColor="#B6B3B3"
            underlineColorAndroid="transparent"
            onChangeText={password => setAccount({ ...account, Password: password })} />

          <FormGroup>
            <Select
              selectedValue={account.genre}
              onValueChange={(item, itemIndex) => {
                setAccount({ ...account, genre: item })
              }}>
              <Select.Item label="Selecione seu sexo" value="999" />
              <Select.Item label="Masculino" value="Masculino" />
              <Select.Item label="Feminino" value="Feminino" />
            </Select>
          </FormGroup>

          <LoginButton
            style={{ width: width * 0.9, paddingVertical: 15, marginVertical: 20, alignSelf: 'center', justifyContent: 'center' }}
            permissions={['public_profile']}
            onLoginFinished={
              async (error, result) => {
                if (error) {
                  console.log("login has error: " + result.error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  const data = await AccessToken.getCurrentAccessToken();
                  const token = data.accessToken.toString();

                  if (token) {
                    await AsyncStorage.setItem('@tokenFacebook', token);
                  }
                  initUser(token);
                }
              }
            }
            onLogoutFinished={handleLogoutFacebook} />

          <ButtonSubmit onPress={handleAccount}>
            <TextButton>CRIAR CONTA</TextButton>
          </ButtonSubmit>

        </Form>

        <SmallRules>Após criar sua conta você terá acesso à criar seu casamento
e enviar para seus amigos o código de acesso.</SmallRules>
      </Container>
    </ContainerScroll>
  );
}

export default Married_Account;

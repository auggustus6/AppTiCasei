import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import {
  LoginButton, AccessToken, GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import { createAccount } from '~/store/actions/userAction';

import {
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


function Married_Account() {
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


  loginCallback = (error, result) => {
    if (error) {
      console.log(error);
    } else {
      setAccount({
        Nome: result.name,
        Email: result.email,
        genre: 'Masculino',
        type: 'Facebook',
        Password: ''
      })
      setTimeout(() => {
        dispatch(createAccount(account));
      }, 2000)
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

                // AccessToken.getCurrentAccessToken().then(
                //   async (data) => {
                //     const token = data.accessToken.toString();
                //     if (token) {

                //     }

                //   }
                // )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />

        <ButtonSubmit onPress={handleAccount}>
          <TextButton>CRIAR CONTA</TextButton>
        </ButtonSubmit>


      </Form>

      <SmallRules>Após criar sua conta você terá acesso à criar seu casamento
e enviar para seus amigos o código de acesso.</SmallRules>

    </Container>
  );
}

export default Married_Account;

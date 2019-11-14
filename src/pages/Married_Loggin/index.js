import React, { useState } from 'react';
import { View, TouchableOpacity as Button, Text, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

import { loggedAccount, createAccount } from '~/store/actions/userAction';
import AsyncStorage from '@react-native-community/async-storage';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';

import {
  ContainerScroll,
  Container,
  Form,
  TitleForm,
  InputForms,
  ButtonSubmit,
  TextButton,
  SmallRules
} from './styles';

import IconAccount from '~/assets/svgs/IconAccount.svg';
import Icon from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;

function Married_Login({ navigation }) {
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    Email: '',
    Password: ''
  });

  handleAccount = () => {
    dispatch(loggedAccount(account));
  }

  loginCallback = (error, result) => {
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

  handleLogoutFacebook = async () => {
    dispatch({ type: 'LOGOUT_USER' });
    await AsyncStorage.multiRemove(['@token', '@userLogged', '@tokenFacebook']);
    navigation.navigate('Main');
  }

  return (
    <ContainerScroll>
      <Container>
        <IconAccount width={120} height={120} />

        <Form>
          <TitleForm>FAÇA SEU LOGIN</TitleForm>

          <InputForms
            placeholder="E-mail de acesso"
            placeholderTextColor="#B6B3B3"
            underlineColorAndroid="transparent"
            onChangeText={email => setAccount({ ...account, Email: email })} />
          <InputForms
            placeholder="Senha de acesso"
            placeholderTextColor="#B6B3B3"
            secureTextEntry={true}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={password => setAccount({ ...account, Password: password })} />


          <ButtonSubmit onPress={handleAccount}>
            <TextButton>ENTRAR</TextButton>
          </ButtonSubmit>

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

          <Button style={{ marginVertical: 20 }} onPress={() => navigation.navigate('Conta')}>
            <Text style={{ textAlign: 'center' }}>Não possui conta? Crie sua conta!</Text>
          </Button>
        </Form>

        <SmallRules>Após criar sua conta você poderá interagir com os noivos.</SmallRules>
      </Container>

    </ContainerScroll>
  );
}

Married_Login.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <View>
        <Button onPress={() => navigation.navigate('Home')} style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
          <Icon name="chevron-left" size={18} color='#333' />
          <Text style={{ color: '#333', fontSize: 18 }}>Back</Text>
        </Button>
      </View>
    )
  }
}

export default Married_Login;

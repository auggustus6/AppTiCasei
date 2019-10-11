import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createAccount } from '~/store/actions/userAction';

import {
  Container,
  Form,
  TitleForm,
  InputForms,
  ButtonSubmit,
  TextButton,
  SmallRules
} from './styles';

import IconAccount from '~/assets/svgs/IconAccount.svg';




function Married_Account() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    Email: '',
    Password: ''
  });

  handleAccount = () => {
    dispatch(createAccount(account));
    
  }

  return (
    <Container>
      <IconAccount width={120} height={120} />

      <Form>
        <TitleForm>VAMOS CRIAR SUA CONTA</TitleForm>

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

import React from 'react';
import {
    Container,
    Form,
    TitleForm,
    InputForms,
    ButtonSubmit,
    TextButton,
    SmallRules
} from './styles';

import IconMessage from '~/assets/svgs/iconMessage.svg';
import Icon from 'react-native-vector-icons/Feather';

function Message() {
    return (
        <Container 
        contentContainerStyle={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            padding:20,
        }}>
            <IconMessage width={100} height={100} />

            <Form>
                <TitleForm>Deixe uma mensagem para  os noivos!</TitleForm>

                <InputForms
                    placeholder="Seu nome"
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent" />
                <InputForms
                    placeholder="Conte como você conheceu os noivos
                    ou apenas envie boas lembranças."
                    multiline={true}
                    placeholderTextColor="#B6B3B3"
                    underlineColorAndroid="transparent" />


                <ButtonSubmit onPress={() => {}}>
                    <TextButton>ENVIAR MENSAGEM</TextButton>
                </ButtonSubmit>

            </Form>

            <SmallRules>
                Todas as mensagens serão enviadas diretamente aos noivis. Não esqueça de identificar-se.
            </SmallRules>

        </Container>
    )
}


Message.navigationOptions = (navigation) => {
    return {
        title:'Mensagens',
        drawerIcon: ({ tintColor }) => (
     
                <Icon name="send" color={tintColor} size={18} />
       
        ),
        iconContainerStyle: {
            opacity: 1
        }
    }
}



export default Message;
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity as Button, Text, Animated, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';


import { ContainerScroll } from './styles';

function Modal_Confirmations({ navigation }) {
    const [anima] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(anima, {
            toValue: 1,
            duration: 2000
        }).start();
    }, [])

    return (
        <ContainerScroll>
            <Animated.View style={[styles.container, { opacity: anima }]}>
                <LottieView style={{ width: 200, height: 200 }}
                    source={require('~/assets/animates/success.json')} autoPlay loop={false} />
                <Text style={styles.title}>Transação realizada com sucesso!</Text>
                <Text style={styles.text}>Obrigado por realizar o pagamento, os noivos ficarão muito felizes!</Text>
            </Animated.View>

        </ContainerScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },

    title: {
        textAlign: 'center',

        color: '#27ae60',
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14
    }
})

Modal_Confirmations.navigationOptions = ({ navigation }) => {
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

export default Modal_Confirmations;

import React from 'react';
import { View, TouchableOpacity as Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const optionsTopNavigator = {
    navigationOptions: {
        drawerIcon: ({ tintColor }) => (
            <Icon name="navigation" color={tintColor} size={18} />
        ),
    },
    tabBarOptions: {
        style: {
            backgroundColor: '#7230B4'
        }
    }
}

export const optionsRootScreen = {
    initialRouteName: 'Home',
    contentOptions: {
        activeTintColor: '#7230B4',
        inactiveTintColor: '#999',
        itemsContainerStyle: {
            marginHorizontal: 0,
        }
    }
}

export const optionsModal = {
    navigationOptions: {
        header: null,
        headerBackTitle: 'Voltar',
    },
    headerBackTitleVisible: true,
    mode: 'card',
    headerMode: 'screen',
}

export const optionsRoot = {

    initialRouteName: 'MainScreen',
    defaultNavigationOptions: ({ navigation }) => {
        const userParams = navigation.state.routes[0].params;
        console.log(userParams);
        return {
            title: `${navigation.state.routes[navigation.state.index].routeName}`,
            headerStyle: {
                backgroundColor: '#7230B4',
            },
            headerLeftContainerStyle: {
                marginLeft: 10,
            },
            headerRightContainerStyle: {
                marginRight: 10,
                flex: 1,


            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                fontSize: 16,
            },
            headerLeft: (
                <View>
                    <Button onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" color="#fff" size={18} />
                    </Button>
                </View>
            ),

            headerRight: (

                <View style={{ width: 32, height: 32, backgroundColor: '#fff', alignItems: 'center', borderRadius: 20, padding: 5, borderColor: '#7F32CD', borderWidth: 2 }}>
                    {userParams &&
                        <Button onPress={() => navigation.navigate('Configuracoes')}>
                            <Icon name="user" color="#333" size={18} />
                        </Button>
                    }

                    {!userParams &&
                        <Button onPress={() => navigation.navigate('Login')}>
                            <Icon name="lock" color="#333" size={18} />
                        </Button>
                    }

                </View>
            )
        }
    }
}
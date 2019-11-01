import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Main from '~/pages/Main';
import Home from './pages/Home';
import HistoryMarried from './pages/HistoryMarried';
import Message from './pages/Message';
import Gifts from './pages/Gifts';
import Gallery from './pages/Gallery';
import Donation from './pages/Donation';

// Tabs about page event
import Location from './pages/Location';
import RSVP from './pages/RSVP';

// Pages about login
import Married_Account from '~/pages/Married_Account';
import Married_Loggin from '~/pages/Married_Loggin';
import Married_Configs from '~/pages/Married_Configs';


// Options Navigator
import {
    optionsTopNavigator,
    optionsRootScreen,
    optionsModal,
    optionsRoot
} from './optionsNavigator'


const MainScreen = createSwitchNavigator({
    Main
}, { navigationOptions: { header: null } })

const RootScreen = createDrawerNavigator({
    Home,
    Historia: HistoryMarried,
    Mensagens: Message,
    Presentes: Gifts,
    Gravata: Donation,
    Galeria: Gallery,
    Evento:
        createMaterialTopTabNavigator({
            Location,
            RSVP
        }, optionsTopNavigator)
}, optionsRootScreen)


const ModalAccount = createStackNavigator({
    Configuracoes: { screen: Married_Configs },
    Login: { screen: Married_Loggin },
    Conta: { screen: Married_Account }
}, optionsModal)


const Routes = createAppContainer(
    createStackNavigator({
        ModalAccount,
        MainScreen,
        RootScreen
    }, optionsRoot))

export default Routes;

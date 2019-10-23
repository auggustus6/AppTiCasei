import React from 'react';
import { StatusBar } from 'react-native';

import 'react-native-gesture-handler'
import '~/config/ReactotronConfig';

import { Provider } from 'react-redux';
import storeConfig from './store';

import { navService } from './services';

import Routes from '~/routes';

const App = () => (
  <Provider store={storeConfig}>
    <StatusBar backgroundColor="#672F9E"/>
    <Routes
      ref={nav => navService.setTopLevelNavigator(nav)}
    />
  </Provider>
);

export default App;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import UserReducers from '~/store/reducers/userReducers';
import MarriedReducers from './reducers/marriedReducers';


const sagaMiddleware = createSagaMiddleware();


const reducers = combineReducers({
  user: UserReducers,
  married:MarriedReducers
});

const storeConfig = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default storeConfig;
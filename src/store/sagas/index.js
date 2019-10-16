import { navService } from '~/services/index';
import { all, put, takeLatest, call } from 'redux-saga/effects';

import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

// STORAGES
async function storagedId(keys) {
  await AsyncStorage.setItem('@idMarried', keys);
}

async function storageCode(code) {
  await AsyncStorage.setItem('@CodeMarried', code);
}

async function storagedToken(token) {
  await AsyncStorage.setItem('@token', token);
}

async function storagedUser(user) {
  await AsyncStorage.setItem('@userLogged', user);
}


// REQUEST CASAMENTO
async function callMarried(action) {
  const { code } = action.payload;

  const response = await api.post('married/getMarried', { uniqueCode: code })
  return response
}

function* requestMarried(action) {
  yield put({ type: 'REQUEST_MARRIED' })

  try {
    const resp = yield call(callMarried, action);
    yield put({
      type: 'SUCCESS_GET_MARRIED', payload: { data: resp.data }
    })

    yield call(storagedId, resp.data._id);
    yield call(storageCode, resp.data.uniqueCode);

    yield put(navService.navigate('Home'))
  }
  catch (error) {
    yield put({
      type: 'ERR_GET_MARRIED', payload: error.response
    })

  }
}

// ADD POST CASAMENTO
async function callComment(action) {

  const { idImage, idMarried, comment } = action.payload;

  const response = await api.post(`married/${idMarried}/${idImage}/comments`, { commentarie: comment.comment })
  return response;
}

function* postComment(action) {
  yield put({ type: 'REQUEST_MARRIED' })

  try {
    const resp = yield call(callComment, action);


    yield put({
      type: 'POST_COMMENT', payload: {
        message: resp.data.message,
        idImage: action.payload.idImage,
        comment: action.payload.comment.comment,
        author: action.payload.comment.author,
        genre:action.payload.comment.genre
      }
    })


  } catch (err) {
    console.log(err);
  }
}


async function callUserCreate(action) {
  const { Email, Password, Nome, genre, type } = action.payload.user;

  const response = await api.post('account/register', { Email, Password, Nome, genre, type })
  return response;
}

async function callLoggedUser(action) {
  const { Email, Password } = action.payload.user;

  const response = await api.post('account/authenticate', { Email, Password })
  return response;
}

function* createUser(action) {

  try {
    const response = yield call(callUserCreate, action)

    yield put({
      type: 'CREATE_USER',
      payload: {
        Nome: response.data.Nome,
        genre: response.data.genre,
        Email: response.data.Email,
        token: response.data.token,
        id: response.data.id,
      }
    })

    yield call(storagedToken, response.data.token);
    yield call(storagedUser, JSON.stringify(response.data));
    yield put(navService.navigate('Home', {
      user: response.data
    }))

  } catch (error) {
    console.log(error);
  }

}

function* loggedUser(action) {

  try {
    const response = yield call(callLoggedUser, action)

    yield put({
      type: 'AUTH_LOGGED',
      payload: {
        Nome: response.data.Nome,
        genre: response.data.genre,
        Email: response.data.Email,
        id: response.data.id,
        assignedTo: response.data.assignedTo,
        token: response.data.token
      }
    })
    yield call(storagedToken, response.data.token);
    yield call(storagedUser, JSON.stringify(response.data));
    yield put(navService.navigate('Home', {
      user: response.data
    }))

  } catch (error) {
    console.log(error);
  }

}

export default function* rootSaga() {
  yield all([
    takeLatest('ASYNC_CREATE_ACCOUNT', createUser),
    takeLatest('ASYNC_LOGGED_USER', loggedUser),

    takeLatest('ASYNC_GET_MARRIED', requestMarried),
    takeLatest('ASYNC_POST_COMMENT', postComment)
  ]);
}

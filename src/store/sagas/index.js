import { navService } from '~/services/index';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

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

// ADD LIKE IMAGE
async function callLikes(action) {
  const { idImage, idMarried } = action.payload;

  const response = await api.post(`married/${idMarried}/${idImage}/like`);
  return response;
}

function* likeImage(action) {
  yield put({ type: 'REQUEST_MARRIED' })

  try {
    const resp = yield call(callLikes, action);

    yield put({
      type: 'LIKE_IMAGE', payload: resp.data
    })

  } catch (err) {
    console.log(err);
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
        genre: action.payload.comment.genre
      }
    })


  } catch (err) {
    console.log(err);
  }
}


async function followMarriedUser(action) {
  const { idMarried } = action.payload;

  const response = await api.post(`married/${idMarried}/followMarried`, null)
  return response;
}

async function callUserCreate(action) {
  const { Email, Password, Nome, genre, type, Image } = action.payload.user;

  let dadosCriar = {};

  if (type === 'Facebook') {
    dadosCriar = {
      Email, Password, Nome, genre, type, Image
    }
  } else {
    dadosCriar = {
      Email, Password, Nome, genre, type
    }
  }

  const response = await api.post('account/register', dadosCriar)
  return response;
}

async function callUpdateUser(action) {
  const { idUser, archive, ...user } = action.payload.user;
  let response;

  if (archive) {
    const formData = new FormData();
    formData.append('image', user.data);
    response = await api.put(`user/updateImage/${idUser}`, formData)
  } else {
    response = await api.put(`user/update/${idUser}`, user)
  }
  return response;
}

async function callLoggedUser(action) {
  const { Email, Password } = action.payload.user;

  const response = await api.post('account/authenticate', { Email, Password })
  return response;
}

function* followMarried(action) {

  try {
    const response = yield call(followMarriedUser, action)

    yield put({
      type: 'FOLLOW_MARRIED',
      payload: response.data,
    })

    yield call(storagedUser, JSON.stringify(response.data));

  } catch (err) {
    console.log(err);
  }

}


function* createUser(action) {

  try {
    const response = yield call(callUserCreate, action)
    yield put({
      type: 'CREATE_USER',
      payload: {
        followMarrieds: response.data.followMarrieds,
        type:action.payload.user.type,
        Nome: response.data.Nome,
        image: action.payload.user.Image,
        genre: response.data.genre,
        Email: response.data.Email,
        token: response.data.token,
        id: response.data.id,
      }
    })

    yield call(storagedToken, response.data.token);
    yield call(storagedUser, JSON.stringify({ ...response.data, image: action.payload ? action.payload.user.Image : null }));
    yield put(navService.navigate('Home', { user: response.data }));

  } catch (error) {
    console.log(error);
  }
}

function* updateUser(action) {

  yield put({
    type: 'REQUEST_USERS'
  })

  try {
    const response = yield call(callUpdateUser, action)

    if (action.payload.user.archive) {
      yield put({
        type: 'UPDATE_IMAGE_USER',
        payload: response.data,
      })

    } else {
      yield put({
        type: 'UPDATE_USER',
        payload: {
          ...response.data,
          image: response.data.image_url
        }
      })
    }
    yield call(storagedUser, JSON.stringify({ ...response.data, image: response.data.image_url }));
    yield put(navService.navigate('Home', { user: response.data }));


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
        followMarrieds: response.data.followMarrieds,
        Nome: response.data.Nome,
        genre: response.data.genre,
        Email: response.data.Email,
        image: response.data.image_url ? response.data.image_url : null,
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
    takeLatest('ASYNC_UPDATE_USER', updateUser),
    takeLatest('ASYNC_LIKE_IMAGE', likeImage),
    takeLatest('ASYNC_FOLLOW_MARRIED', followMarried),

    takeLatest('ASYNC_GET_MARRIED', requestMarried),
    takeLatest('ASYNC_POST_COMMENT', postComment)
  ]);
}

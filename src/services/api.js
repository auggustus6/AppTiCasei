import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://fae4afa1.ngrok.io/',
});


api.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = 'bearer ' + getToken() ;
    return config
  },
  error => {
    Promise.reject(error)
  }
)


getToken = async() => {
  const token = AsyncStorage.getItem('@token');
  if(token === null){
    return;
  }
  return token;
}


export default api;

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://762f3461.ngrok.io/',
});


api.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = 'bearer ' + await getToken() ;
    return config
  },
  error => {
    Promise.reject(error)
  }
)


getToken = async() => {
  const token = await AsyncStorage.getItem('@token');
  if(token === null){
    return;
  }
  return token;
}


export default api;

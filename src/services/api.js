import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://d47ba2fb.ngrok.io/',
  // baseURL:'10.0.2.2:3333/'
  // baseURL:'192.168.0.6:3333/'
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

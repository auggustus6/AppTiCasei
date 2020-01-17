import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import env from '~/config/Environment';

const api = axios.create({
  baseURL:`${env.url}`
  // baseURL:'http://192.168.15.16:3333/'
  // baseURL: 'https://powerful-river-29517.herokuapp.com/',

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

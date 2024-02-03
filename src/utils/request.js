import axios from "axios";
import {baseURL} from '../config'

var instance = axios.create({
  baseURL,
  timeout: 20000,
});

// Add request interceptors
instance.interceptors.request.use(function (config) {
  config.headers.token = '123'
  console.log(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});


// Add response interceptors
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {  
  return Promise.reject(error);
});

export default instance

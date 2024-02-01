import axios from "axios";

var instance = axios.create({
  baseURL: 'https://bingjs.com:8003/', 
  timeout: 20000,
});

// Add request interceptors
instance.interceptors.request.use(function (config) {
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

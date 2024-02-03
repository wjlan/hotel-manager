import axios from '../utils/request';
import md5 from 'md5';

// Login function
export const $login = async (params) => {
  params.loginPwd = md5(md5(params.loginPwd).split('').reverse().join(''))
  let {data} = await axios.get('Admin/Login', {params})
  if (data.success){
    // store token in session storage
    sessionStorage.setItem('token', data.token)
  }
  return data
}
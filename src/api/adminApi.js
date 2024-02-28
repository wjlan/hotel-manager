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

// Admin account list
export const $list = async (params)=>{
  let {data} = await axios.get('Admin/List',{params})
  return data
}

// Get a specific admin account
export const $getOne = async (params)=>{
  let {data} = await axios.get('Admin/GetOne',{params})
  return data
}

// Add admin account
export const $add = async (params)=>{
  let {data} = await axios.post('Admin/Add',params)
  return data
}

// Update admin account
export const $update = async (params)=>{
  let {data} = await axios.post('Admin/Update',params)
  return data
}

// delete admin account
export const $del = async (params)=>{
  let {data} = await axios.post('Admin/Delete',params)
  return data
}

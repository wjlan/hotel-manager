import axios from '../utils/request';

// Get role list
export const $list = async () =>{
  let {data} = await axios.get('Role/list')
  return data
}

// Get single one role 
export const $getOne = async(params)=>{
  let {data} = await axios.get('Role/GetOne',{params})
  return data
}

// Add role
export const $add = async (params)=>{
  let{data} = await axios.post('Role/Add', params)
  return data
}

// Delete role
export const $del = async (params)=>{
  let{data} = await axios.post('Role/Delete', params)
  return data
}

// Edit role
export const $update = async (params)=>{
  let {data} = await axios.post('Role/Update',params)
  return data
}



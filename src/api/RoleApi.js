import axios from '../utils/request';

// Get role list
export const $list = async () =>{
  let {data} = await axios.get('Role/list')
  return data
}

// Add role
export const $add = async (params)=>{
  let{data} = await axios.post('Role/Add', params)
  return data
}
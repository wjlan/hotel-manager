import axios from '../utils/request';

// Room list
export const $list = async (params)=>{
  let {data} = await axios.get('Room/List',{params})
  return data
}

// Get a single room
export const $getOne = async(params)=>{
  let {data} = await axios.get('Room/GetOne',{params})
  return data
}

// Add room
export const $add = async (params)=>{
  let {data} = await axios.post('Room/Add',params)
  return data
}

// Edit room
export const $update = async (params)=>{
  let {data} = await axios.post('Room/Update',params)
  return data
}

// Delete room
export const $del = async (params)=>{
  let {data} = await axios.post('Room/Delete',params)
  return data
}
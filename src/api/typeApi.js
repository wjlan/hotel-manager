import axios from '../utils/request'

// Room type list
export const $list = async ()=>{
  let {data} = await axios.get('RoomType/List')
  return data
}

// Get single one room type
export const $getOne = async(params)=>{
  let {data} = await axios.get('RoomType/GetOne',{params})
  return data
}

// Add room type
export const $add = async (params)=>{
  let {data} = await axios.post('RoomType/Add',params)
  return data
}

// Delete room type
export const $del = async (params)=>{
  let {data} = await axios.post('RoomType/Delete',params)
  return data
}

// Edit roomt type
export const $update = async (params)=>{
  let {data} = await axios.post('RoomType/Update',params)
  return data
}

// Total type price
export const $totalPrice = async ()=>{
  let {data} = await axios.get('RoomType/TotalTypePrice')
  return data
}
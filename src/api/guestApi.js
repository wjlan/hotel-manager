import axios from '../utils/request'

// Guest list
export const $list = async (params)=>{
  let {data} = await axios.get('GuestRecord/List',{params})
  return data
}

// Get single one guest
export const $getOne = async(params)=>{
  let {data} = await axios.get('GuestRecord/GetOne',{params})
  return data
}

// Add guest
export const $add = async (params)=>{
  let {data} = await axios.post('GuestRecord/Add',params)
  return data
}

// Edit guest
export const $update = async (params)=>{
  let {data} = await axios.post('GuestRecord/Update',params)
  return data
}

// Delete guest
export const $del = async (params)=>{
  let {data} = await axios.post('GuestRecord/Delete',params)
  return data
}

// guest checkout
export const $checkout = async (params)=>{
  let {data} = await axios.post('GuestRecord/Checkout',params)
  return data
}
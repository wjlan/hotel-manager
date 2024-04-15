import axios from '../utils/request'

// Room State list
export const $list = async ()=>{
  let {data} = await axios.get('RoomState/List')
  return data
}

// Room State list（no occupied state）
export const $listToUpdate = async ()=>{
  let {data} = await axios.get('RoomState/ListToUpdate')
  return data
}
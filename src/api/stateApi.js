import axios from '../utils/request'

// Room State list
export const $list = async ()=>{
  let {data} = await axios.get('RoomState/List')
  return data
}
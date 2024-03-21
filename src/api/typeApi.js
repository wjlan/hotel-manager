import axios from '../utils/request'

// Room type list
export const $list = async ()=>{
  let {data} = await axios.get('RoomType/List')
  return data
}
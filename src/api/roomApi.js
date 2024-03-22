import axios from '../utils/request';

// Room list
export const $list = async (params)=>{
  let {data} = await axios.get('Room/List',{params})
  return data
}
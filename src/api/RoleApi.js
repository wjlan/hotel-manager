import axios from '../utils/request';

// Get role list
export const $list = async () =>{
  let {data} = await axios.get('Role/list')
  return data
}

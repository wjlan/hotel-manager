import axios from '../utils/request'

// Checkout State list
export const $list = async ()=>{
  let {data} = await axios.get('ResideState/List')
  return data
}
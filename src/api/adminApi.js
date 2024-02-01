import axios from '../utils/request'

// Login function
export const $login = async (params) => {
  let {data} = await axios.get('Admin/Login', {params})
  console.log(data);
}
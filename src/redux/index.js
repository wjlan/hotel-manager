import {createSlice,configureStore} from '@reduxjs/toolkit'

// 创建子模块
export const adminSlice = createSlice({
  name:'adminSlice',
  // 初始化状态
  initialState:{
    admin:{
      id:'',
      loginId:'',
      name:'',
      phone:'',
      photo:'',
      roleName:''
    }
  },
  // 整合器
  reducers:{
    setAdmin(state, action){
      state.admin = {
        ...action.payload
      }
    }
  }
})


// 创建store，合并所有子模块
const store = configureStore({
  reducer:{
    adminSlice:adminSlice.reducer
  }
})

export default store
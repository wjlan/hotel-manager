import {createSlice,configureStore} from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name:'adminSlice',
  // initial status
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
  
  reducers:{
    setAdmin(state, action){
      state.admin = {
        ...action.payload
      }
    }
  }
})


// create store
const store = configureStore({
  reducer:{
    adminSlice:adminSlice.reducer
  }
})

export default store
import {createSlice,configureStore} from '@reduxjs/toolkit'

const loginAdmin = createSlice({
  name: 'loginAdmin',
  // initial status
  initialState: {
    admin:{
      name:'Wanjun',
      age:30
    }
  },
  // integrator
  reducers:{
    setAdmin(state, action){
      state.admin = action.payload 
    }
  }
})

// 
const store = configureStore({
  reducer:{
    loginAdmin:loginAdmin.reducer
  }
})


export default store
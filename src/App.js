import {useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {adminSlice} from './redux'
import {$getOne} from './api/adminApi'
// import components Login and Layout
import Login from "./views/Login/Login";
import Layout from "./views/Layout/Layout";
import Role from './views/Role/Role';
import Admin from './views/Admin/Admin';
import Mine from './views/Admin/Mine';
import UpdatePwd from './views/Admin/UpdatePwd'

function App() {
  useEffect(()=>{
    // create a redux dispatch
    const dispatch = useDispatch()
    let {setAdmin} = adminSlice.actions
    // check the login status
    if(sessionStorage.getItem('loginId')){
      // get login Id
      let loginId = sessionStorage.getItem('loginId')
      // get account information based on login Id
      $getOne({loginId}).then(admin=>{
        // store the current account info in redux
        dispatch(setAdmin(admin))
      })
    }
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/layout' element={<Layout/>}>
          <Route path='role' element={<Role/>}/>
          <Route path='admin' element={<Admin/>}/>
          <Route path='mine' element={<Mine/>}/>
          <Route path='pwd' element={<UpdatePwd/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

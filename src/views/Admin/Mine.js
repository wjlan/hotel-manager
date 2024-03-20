import React from 'react'
import {useSelector} from 'react-redux'
import {baseURL} from '../../config'

export default function Mine() {
  // aquire login information
  const {adminSlice} = useSelector(state=>state)
  const {admin} = adminSlice
  return (
    <div style={{display:'flex',}}>
      <img style={{width:'200px'}} src={baseURL+'upload/admin/'+admin.photo} />
      <div style={{marginLeft:'10px',fontSize:'20px'}}>
        <p>Login Id:{admin.loginId}</p>
        <p>Name:{admin.name}</p>
        <p>Phone:{admin.phone}</p>
        <p>Role:{admin.role?.roleName}</p>
      </div>
    </div>
  )
}

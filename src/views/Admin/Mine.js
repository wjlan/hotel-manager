import React from 'react'
import {useSelector} from 'react-redux'

export default function Mine() {
  const loginAdmin = useSelector(state=>state.loginAdmin)
  console.log(loginAdmin);
  return (
    <div>Mine</div>
  )
}
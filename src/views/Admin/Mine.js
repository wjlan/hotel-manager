import React from 'react'
import {useSelector} from 'react-redux'

export default function Mine() {
  const adminSlice = useSelector(state=>state.adminSlice)
  console.log(adminSlice.admin);
  return (
    <div>Mine</div>
  )
}
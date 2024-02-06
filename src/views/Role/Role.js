import React, {useEffect, useState} from 'react'
import {Table} from 'antd'
import {$list} from '../../api/RoleApi'

export default function Role() {
  // roleList data
  let [roleList, setRoleList] = useState([])
  useEffect(()=>{
    $list().then(data=>{
      data = data.map(r=>{
        return {
          ...r, 
          key:r.roleId
        }
      })
      setRoleList(data)
    })
  }, [])
  const columns = [
    {
      title: 'Role Id',
      dataIndex: 'roldId',
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
    },
  ];
  return (
    <>
      <Table size='small' dataSource={roleList} columns={columns} />
    </>
  )
}

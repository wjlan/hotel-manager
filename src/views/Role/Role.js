import React, {useEffect, useState} from 'react'
import {Table, Button, Drawer} from 'antd'
import {$list} from '../../api/RoleApi'

export default function Role() {
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // close drawer function
  const onClose = () => {
    setOpen(false)
  }
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
      <div className='search'>
      <Button
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table size='small' dataSource={roleList} columns={columns} />
      <Drawer title="Add Role" width={500} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

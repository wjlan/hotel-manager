import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
import {$list} from '../../api/adminApi'

export default function Admin() {
  // adminList data
  let [adminList, setAdminList] = useState([]);
  // table 
  const columns = [
    {
      title: "Admin Id",
      dataIndex: "id",
      width: "100px",
    },
    {
      title: "Login Id",
      dataIndex: "loginId",
      width: "100px",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "100px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "100px",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "100px",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      width: "100px",
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (ret) => (
    //     <>
    //       <Button
    //         size="small"
    //         style={{ borderColor: "orange", color: "orange" }}
    //         onClick={() => {
    //           edit(ret.roleId);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       <Popconfirm
    //         title="Notion"
    //         description="Are you sure to delete"
    //         onConfirm={() => {
    //           del(ret.roleId);
    //         }}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button style={{ marginLeft: "5px" }} danger size="small">
    //           Cancel
    //         </Button>
    //       </Popconfirm>
    //     </>
    //   ),
    // },
  ];
  // Load admin list
  const loadlist = () => {
    $list().then(({data, count}) => {
      console.log(data)
      data = data.map((r) => {
        return {
          ...r,
          key: r.loginId,
        };
      });
      setAdminList(data);
    });
  };
  useEffect(()=>{
    loadlist();
  }, []);
  return (
    <>
    <Table size="small" dataSource={adminList} columns={columns} />
    </>
  )
}
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Pagination, Select } from "antd";
import { $list, $del } from "../../api/adminApi";
import { $list as $roleList } from '../../api/RoleApi'
import AddAdmin from "./AddAdmin";
import MyNotification from "../../components/MyNotification/MyNotification";
import {baseURL} from '../../config'

export default function Admin() {
  // role list
  let [roleList, setRoleList] = useState([]);
  // load role list 
  const loadRoleList = () => {
    $roleList().then((data) => {
      data = data.map((r) => {
        return {
          value:r.roleId,
          label:r.roleName
        };
      });
      data.unshift({value:0,label:'Please Select a Role'})
      setRoleList(data);
    });
  };
  // role Id, for filtering list data
  let [roleId,setRoleId] = useState(0)
  // count data rows
  let [count,setCount] = useState(1)
  // Page
  let [pageIndex,setPageIndex] = useState(1)
  // notification
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // loginId editing status
  let [loginId,setLoginId] = useState(0)
  // check drawer open or not
  const [open, setOpen] = useState(false);
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
      width: "150px",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "150px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "150px",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "150px",
      render:(ret)=>(
        <img style={{width:'50px'}} src={baseURL+'upload/admin/'+ret} />
      )
    },
    {
      title: "Role",
      dataIndex: "roleName",
      width: "150px",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ borderColor: "orange", color: "orange" }}
            onClick={()=>{
              edit(ret.loginId)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Notion"
            description="Are you sure to delete"
            onConfirm={() => {
              del(ret.id, ret.photo);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: "5px" }} danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  // edit admin function
  const edit = (loginId)=>{
    setOpen(true)  
    setLoginId(loginId)  
  }
  // delete admin function
  const del = (id,photo) => {
    $del({ id,photo }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList(); 
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
  // Load admin list
  const loadList = () => {
    $list({roleId,pageSize:8,pageIndex}).then(({ data, count }) => {
      // console.log(data);
      data = data.map((r) => {
        return {
          ...r,
          key: r.loginId,
          roleName:r.role.roleName
        };
      });
      setAdminList(data);
      setCount(count)
    });
  };
  useEffect(() => {
    loadRoleList() // load role list data
    loadList();  // load list data
  }, [pageIndex]);
  return (
    <>
      <div className="search">
      <span>Role：</span>
      <Select size='small' style={{width:'200px'}} options={roleList} defaultValue={0} onSelect={(value)=>{
          setRoleId(value)
        }}></Select>
      <Button type="primary" style={{marginLeft:'5px'}} size='small' onClick={()=>{loadList()}}>Search</Button>
      <Button
        style={{marginLeft:'5px'}}
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </Button>
      </div>
      <Table size="small" dataSource={adminList} columns={columns} pagination={false} />
      <Pagination size='small' defaultCurrent={pageIndex} total={count} pageSize={8} />
      <AddAdmin open={open} setOpen={setOpen} loadList={loadList} loginId={loginId} setLoginId={setLoginId} onChange={(page)=>{setPageIndex(page)}} />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}

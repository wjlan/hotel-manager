import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { $list, $del } from "../../api/adminApi";
import AddAdmin from "./AddAdmin";
import MyNotification from "../../components/MyNotification/MyNotification";
import {baseURL} from '../../config'

export default function Admin() {
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
      render:(ret)=>(
        <img style={{width:'50px'}} src={baseURL+'upload/admin/'+ret} />
      )
    },
    {
      title: "Role",
      dataIndex: "roleName",
      width: "100px",
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
    setOpen(true)  //打开抽屉
    setLoginId(loginId)  
  }
  // delete admin function
  const del = (id,photo) => {
    $del({ id,photo }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList(); //重新加载列表
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
  // Load admin list
  const loadlist = () => {
    $list().then(({ data, count }) => {
      // console.log(data);
      data = data.map((r) => {
        return {
          ...r,
          key: r.loginId,
        };
      });
      setAdminList(data);
    });
  };
  useEffect(() => {
    loadlist();
  }, []);
  return (
    <>
      <div className="search">
        <Button
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table size="small" dataSource={adminList} columns={columns} />
      <AddAdmin open={open} setOpen={setOpen} loadlist={loadlist} loginId={loginId} setLoginId={setLoginId} />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}

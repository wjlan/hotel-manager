import React, { useEffect, useState } from "react";
import { Table, Button, Drawer, Form, Input } from "antd";
import { $list, $add } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function Role() {
  // notification box status
  let [notiMsg, setNotiMsg] = useState({type:'', description:''})
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // close drawer function
  const onClose = () => {
    setOpen(false);
  };
  // form submit function
  const onFinish = (values) => {
    $add(values).then(({success,message})=>{
      if(success){
        setNotiMsg({type:'success', description:message})
        loadlist()
      }else{
        setNotiMsg({type:'error', description:message})
      }
    })
  };
  // roleList data
  let [roleList, setRoleList] = useState([]);
  useEffect(() => {
    loadlist()
  }, []);
  // Load role list
  const loadlist=()=>{
    $list().then((data) => {
      data = data.map((r) => {
        return {
          ...r,
          key: r.roleId,
        };
      });
      setRoleList(data);
  });
}
  const columns = [
    {
      title: "Role Id",
      dataIndex: "roleId",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
    },
  ];
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
      <Table size="small" dataSource={roleList} columns={columns} />
      <Drawer
        title="Add Role"
        width={500}
        onClose={onClose}
        open={open}
      >
        <Form
    name="basic"
    labelCol={{
      span: 5,
    }}
    wrapperCol={{
      span: 18,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Role Name"
      name="roleName"
      rules={[
        {
          required: true,
          message: 'Please input role name',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 5,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Add
      </Button>
      <Button style={{marginLeft:'10px'}}>
        Cancel
      </Button>
    </Form.Item>
  </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />  
    </>
  );
}

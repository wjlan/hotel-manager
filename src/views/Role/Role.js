import React, { useEffect, useState } from "react";
import { Table, Button, Drawer, Form, Input } from "antd";
import { $list } from "../../api/RoleApi";

export default function Role() {
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // close drawer function
  const onClose = () => {
    setOpen(false);
  };
  // form submit function
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  // roleList data
  let [roleList, setRoleList] = useState([]);
  useEffect(() => {
    $list().then((data) => {
      data = data.map((r) => {
        return {
          ...r,
          key: r.roleId,
        };
      });
      setRoleList(data);
    });
  }, []);
  const columns = [
    {
      title: "Role Id",
      dataIndex: "roldId",
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
      span: 8,
    }}
    wrapperCol={{
      span: 16,
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
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Drawer>
    </>
  );
}

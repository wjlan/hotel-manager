import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import {  } from "../../api/adminApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddAdmin({
  open,
  setOpen,
  loadlist,
  loginId,
  setLoginId,
}) {
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // close drawer function
  const onClose = () => {
    clear(); // clear form
    // setLoginId(0); // Cancel editing status
    setOpen(false); // close drawer
  };
  // form submit function
  const onFinish = (values) => {
    // if(roleId){
    //   $update(values).then(({success,message})=>{
    //     if(success){
    //       setNotiMsg({type:'success',description:message})
    //       loadlist()  // load role list
    //     }else{
    //       setNotiMsg({type:'error',description:message})
    //     }
    //   })
    // }else{
    //   $add(values).then(({success, message}) => {
    //     if (success) {
    //       setNotiMsg({ type: "success", description: message });
    //       clear(); // clear form
    //       loadlist(); // load role list
    //     } else {
    //       setNotiMsg({type: "error", description: message});
    //     }
    //   });
    // } 
  };
  // form clearance function
  const clear = () => {
    form.setFieldsValue({});
  };
  useEffect(() => {
    // if (roleId !== 0) {
    //   $getOne({ roleId }).then((data) => {
    //     form.setFieldsValue(data);
    //   });
    // }
  }, []);
  return (
    <>
      <Drawer
        title={loginId?'Edit Admin Account':'Add Admin Account'}
        width={500}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Id"
            name="id"
            hidden 
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Login Id"
            name="loginId"
            rules={[
              {
                required: true,
                message: "Please input Login Id",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="loginPWD"
            rules={[
              {
                required: true,
                message: "Please input Login Password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Login Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input Phone",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Photo"
            name="photo"
            rules={[
              {
                required: true,
                message: "Please input Photo",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roleId"
            rules={[
              {
                required: true,
                message: "Please input Role",
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
              {loginId?'Edit':'Add'}
            </Button>
            <Button onClick={clear} style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
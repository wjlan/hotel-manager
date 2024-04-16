import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { $add, $getOne, $update } from "../../api/adminApi";
import { $list } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import UploadImg from "./UploadImg";

export default function AddAdmin({
  open,
  setOpen,
  loadList,
  loginId,
  setLoginId,
}) {
  // role list
  let [roleList, setRoleList] = useState([]);
  // load role list 
  const loadRoleList = () => {
    $list().then((data) => {
      data = data.map((r) => {
        return {
          value:r.roleId,
          label:r.roleName
        };
      });
      setRoleList(data);
    });
  };
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // close drawer function
  const onClose = () => {
    clear(); // clear form
    setLoginId(0)  // cancel editing status
    setOpen(false); // close drawer
  };
  // form submit function
  const onFinish = (values) => {
    if (loginId) {
      // edit
      $update(values).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:'Edited Successfully'})
          loadList()  // load role list
        }else{
          setNotiMsg({type:'error',description:'Edit Error'})
        }
      })
    } else {
      // add
      $add(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: 'Added Successfully' });
          clear(); // clear form
          loadList(); // load role list
        } else {
          setNotiMsg({ type: "error", description: 'Add Error' });
        }
      });
    }
  };
  // form clearance function
  const clear = () => {
    form.resetFields()
  };
  useEffect(() => {
    loadRoleList(); // load role list
    if(loginId!==0){
      $getOne({loginId}).then(data=>{
        form.setFieldsValue(data)
      })
    }
  }, [loginId]);
  return (
    <>
      <Drawer
        title={loginId ? "Edit Admin Account" : "Add Admin Account"}
        width={500}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 4,
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
          <Form.Item label="Id" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Login Id"
            name="loginId"
            rules={[
              {
                required: true,
                message: "Please Input login Id",
              },
            ]}
            hidden={loginId}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "Please input login password",
              },
            ]}
            hidden={loginId}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name",
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
                message: "Please input phone number",
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
                message: "Please choose a photo",
              },
            ]}
          >
            <UploadImg form={form} />
          </Form.Item>
          <Form.Item
            label="Role"
            name="roleId"
            rules={[
              {
                required: true,
                message: "Please input role",
              },
            ]}
          >
            <Select options={roleList}></Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {loginId ? "Edit" : "Add"}
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

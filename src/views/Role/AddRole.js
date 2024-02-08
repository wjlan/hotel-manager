import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { $add, $getOne, $update } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddRole({
  open,
  setOpen,
  loadlist,
  roleId,
  setRoleId,
}) {
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  useEffect(() => {
    if (roleId !== 0) {
      $getOne({ roleId }).then((data) => {
        form.setFieldsValue(data);
      });
    }
  }, [roleId]);
  // close drawer function
  const onClose = () => {
    clear(); // clear form
    setRoleId(0); // Cancel editing status
    setOpen(false); // close drawer
  };
  // form submit function
  const onFinish = (values) => {
    if(roleId){
      $update(values).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:message})
          loadlist()  // load role list
        }else{
          setNotiMsg({type:'error',description:message})
        }
      })
    }else{
      $add(values).then(({success, message}) => {
        if (success) {
          setNotiMsg({ type: "success", description: message });
          clear(); // clear form
          loadlist(); // load role list
        } else {
          setNotiMsg({type: "error", description: message});
        }
      });
    } 
  };
  // form clearance function
  const clear = () => {
    form.setFieldsValue({ roleName: "" });
  };
  return (
    <>
      <Drawer
        title={roleId?'Edit Role':'Add Role'}
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
            label="Role Id"
            name="roleId"
            hidden 
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={[
              {
                required: true,
                message: "Please input role name",
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
              {roleId?'Edit':'Add'}
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

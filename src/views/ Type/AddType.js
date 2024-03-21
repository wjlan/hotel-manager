import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { $add, $getOne, $update } from "../../api/typeApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import ReactQuill from 'react-quill'

export default function AddType({
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
    if(roomTypeId){
      // Update - Edit
      $update(values).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:message})
          loadlist()  // load role list
        }else{
          setNotiMsg({type:'error',description:message})
        }
      })
    }else{
      // Add 
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
    form.resetFields();
  };
  return (
    <>
      <Drawer
        title={roomTypeId?'Edit Room Type':'Add Room Type'}
        width={600}
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
            label="Room Type Id"
            name="roomTypeId"
            hidden 
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Type Name"
            name="roomTypeName"
            rules={[
              {
                required: true,
                message: "Please input room type name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Type Price"
            name="roomTypePrice"
            rules={[
              {
                required: true,
                message: "Please input room type price",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bed Number"
            name="bedNum"
            rules={[
              {
                required: true,
                message: "Please input bed number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type Description"
            name="typeDescription"
            rules={[
              {
                required: true,
                message: "Please input type description",
              },
            ]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please input type description"
            />
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

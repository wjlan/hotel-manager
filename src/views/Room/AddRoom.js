import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { $add, $getOne, $update } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddRoom({
  open,
  setOpen,
  loadlist,
  roomId,
  setRoomId,
}) {
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  useEffect(() => {
    if (roomId !== 0) {
      // $getOne({roleId}).then((data) => {
      //   form.setFieldsValue(data);
      // });
    }
  }, [roomId]);
  // close drawer function
  const onClose = () => {
    clear(); // clear form
    setRoomId(0); // Cancel editing status
    setOpen(false); // close drawer
  };
  // form submit function
  const onFinish = (values) => {
    if(roomId){
      // edit
      $update(values).then(({success,message})=>{
        if(success){
          setNotiMsg({type:'success',description:message})
          loadlist()  // load role list
        }else{
          setNotiMsg({type:'error',description:message})
        }
      })
    }else{
      // add
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
        title={roomId?'Edit Room':'Add Room'}
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
            label="Room Id"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Id"
            name="roomId"
            rules={[
              {
                required: true,
                message: "Please input room Id",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input room description",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Type"
            name="roomTypeId"
            rules={[
              {
                required: true,
                message: "Please input room type",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room State"
            name="roomStateId"
            rules={[
              {
                required: true,
                message: "Please input room state",
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
              {roomId?'Edit':'Add'}
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

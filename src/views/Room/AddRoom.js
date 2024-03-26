import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { $add, $getOne, $update } from "../../api/roomApi";
import {$list as $typeList} from '../../api/typeApi'
import {$list as $stateList} from '../../api/stateApi'
import MyNotification from "../../components/MyNotification/MyNotification";
import ReactQuill from 'react-quill'

export default function AddRoom({
  open,
  setOpen,
  loadlist,
  roomId,
  setRoomId,
}) {
  // room type list
  let [typeList, setTypeList] = useState([]);
  // room state list
  let [stateList, setStateList] = useState([]);
  // load room type list 
  const loadTypeList = () => {
    $typeList().then((data) => {
      data = data.map((r) => {
        return {
          value:r.roomTypeId,
          label:r.roomTypeName
        };
      });
      setTypeList(data);
    });
  };
  // load room state list
  const loadStateList = ()=>{
    $stateList().then((data)=>{
      data = data.map((r) => {
        return {
          value:r.roomStateId,
          label:r.roomStateName
        };
      });
      setStateList(data);
    })
  }
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  useEffect(() => {
    loadTypeList()  // load room type list data
    loadStateList()   // load room state list data
    if (roomId !== 0) {
      $getOne({roomId}).then((data) => {
        // copy roomId to id, because roomId can also be edited
        data.id = data.roomId
        form.setFieldsValue(data);
      });
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
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please input room description"
            />
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
            <Select size='small' style={{width:'200px'}} options={typeList}></Select>
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
            <Select size='small' style={{width:'200px'}} options={stateList}></Select>
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

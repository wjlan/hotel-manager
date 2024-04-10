import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { $add,$getOne,$update } from "../../api/guestApi";
import {$list as $typeList} from '../../api/typeApi'
import {$list as $roomList} from '../../api/roomApi'
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddGuest({
  open,
  setOpen,
  loadlist,
  guestId,
  setGuestId,
}) {
  // room type list
  let [typeList, setTypeList] = useState([]);
  // room list
  let [roomList,setRoomList] = useState([])
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
  // load room list
  const loadRoomList = (roomTypeId)=>{
    $roomList({roomTypeId,roomStateId:1,pageSize:99,guestId}).then(({data})=>{
      data = data.map((r) => {
        return {
          value:r.roomId,
          label:r.roomId
        };
      });
      setRoomList(data);
    })
  }
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  useEffect(() => {
    loadTypeList()  // load room type list data
    if (guestId !== 0) {
      $getOne({guestId}).then((data) => {
        form.setFieldsValue(data);
      });
    }
  }, [guestId]);
  // close drawer function
  const onClose = () => {
    clear(); // clear form
    setGuestId(0); // Cancel editing status
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
        title={guestId?'Edit Guest':'Add Guest'}
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
            label="Guest Id"
            name="guestId"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Guest Name"
            name="guestName"
            rules={[
              {
                required: true,
                message: "Please input guest name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Identity Id"
            name="identityId"
            rules={[
              {
                required: true,
                message: "Please input identity Id",
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
            label="Room Type"
            name="roomTypeId"
            rules={[
              {
                required: true,
                message: "Please choose a room type",
              },
            ]}
          >
            <Select size='small' style={{width:'200px'}} options={typeList} onSelect={(roomTypeId)=>{
              form.setFieldValue('roomId','')
              loadRoomList(roomTypeId)
            }}></Select>
          </Form.Item>
          <Form.Item
            label="Room"
            name="roomId"
            rules={[
              {
                required: true,
                message: "Please choose a room",
              },
            ]}
          >
            <Select size='small' style={{width:'200px'}} options={roomList}></Select>
          </Form.Item>
          <Form.Item
            label="Reside Date"
            name="resideDate"
            rules={[
              {
                required: true,
                message: "Please input reside date",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Deposit"
            name="deposit"
            rules={[
              {
                required: true,
                message: "Please input deposit",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Guest Number"
            name="guestNum"
            rules={[
              {
                required: true,
                message: "Please input guest number",
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
              {guestId?'Edit':'Add'}
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

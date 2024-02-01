import React from "react";
import "./Login.scss";
import { Button, Form, Input, notification } from "antd";
// import MyNotification from "../../components/MyNotification/MyNotification";
import {$login} from '../../api/adminApi'; 
export default function Login() {
  // notification 
  const [api, contextHolder] = notification.useNotification();
  // open notification
  const openNotification = (type, description) => {
    api[type]({
      message: 'System notification',
      description
    });
  };
  // form
  let [form] = Form.useForm()
  // submit callback function
  const onFinish = async (values) => {
    let {message, success} = await $login(values)
    if(success) {
      openNotification('success', message)
    }else{
      openNotification('error', message)
    }
  };
  return (
    <div className="login">
      <div className="content">
      <h2>Hotel Management System</h2>
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}      
          initialValues={{
            loginId: '',
            loginPwd: ''
          }}
          onFinish={onFinish}
          autoComplete="off"
        >    
          <Form.Item
            label="Username"
            name="loginId"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={()=>{
              form.resetFields()
            }} style={{marginLeft:'10px'}}>Cancel</Button>
          </Form.Item>
        </Form>

      </div>
      {contextHolder}      
    </div>
  );
}

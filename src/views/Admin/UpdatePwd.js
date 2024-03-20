import React from "react";
import { Button, Form, Input } from "antd";

export default function UpdatePwd() {
  // Create a form object
  let [form] = Form.useForm();
  // form submit function
  const onFinish = (values) => {}
  // form clear function
  const clear = () => {
    form.resetFields()
  };
  return (
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
      <Form.Item label="Id" name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Old Password"
        name="oldLoginPwd"
        rules={[
          {
            required: true,
            message: "Please input Login Password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newLoginPwd"
        rules={[
          {
            required: true,
            message: "Please input Login Password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirmed Password"
        name="newLoginPwd2"
        rules={[
          {
            required: true,
            message: "Please input Login Password",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Reset
        </Button>
        <Button onClick={clear} style={{ marginLeft: "10px" }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

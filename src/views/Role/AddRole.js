import React, {useState} from 'react'
import { Button, Drawer, Form, Input } from "antd";
import { $add } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddRole({open, setOpen, loadlist}) {
  // create a form object
  let [form] = Form.useForm();
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // close drawer function
  const onClose = () => {
    clear();
    setOpen(false);
  };
  // form submit function
  const onFinish = (values) => {
    $add(values).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        clear(); // clear form
        loadlist(); // load role list
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
  // form clearance function
  const clear = () => {
    form.setFieldsValue({ roleName: "" });
  };
  return (
    <>
    <Drawer title="Add Role" width={500} onClose={onClose} open={open}>
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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
              Add
            </Button>
            <Button onClick={clear} style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />   
    </>
  )
}
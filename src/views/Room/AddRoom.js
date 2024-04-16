import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import { $add, $getOne, $update } from "../../api/roomApi";
import { $list as $typeList } from "../../api/typeApi";
import { $listToUpdate as $stateList } from "../../api/stateApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import ReactQuill from "react-quill";

export default function AddRoom({ open, setOpen, loadList, roomId, setRoomId }) {
  // room type list
  const [typeList, setTypeList] = useState([]);
  // room state list
  const [stateList, setStateList] = useState([]);
  // create a form object
  const [form] = Form.useForm();
  // notification box status
  const [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  // load room type list
  const loadTypeList = () => {
    $typeList().then((data) => {
      data = data.map((r) => {
        return {
          value: r.roomTypeId,
          label: r.roomTypeName,
        };
      });
      setTypeList(data);
    });
  };

  // load room state list
  const loadStateList = () => {
    $stateList().then((data) => {
      data = data.map((r) => {
        let englishLabel = ""; // English label for room state
        switch (r.roomStateName) {
          case "空闲":
            englishLabel = "Empty";
            break;
          case "维修":
            englishLabel = "Maintenance";
            break;
          default:
            englishLabel = r.roomStateName; // Keep the original label if not translated
        }
        return {
          value: r.roomStateId,
          label: englishLabel,
        };
      });
      setStateList(data);
    });
  };

  useEffect(() => {
    loadTypeList(); // load room type list data
    loadStateList(); // load room state list data
    if (roomId !== 0) {
      $getOne({ roomId }).then((data) => {
        // copy roomId to id, because roomId can also be edited
        data.id = data.roomId;
        form.setFieldsValue(data);
      });
    }
  }, [roomId]);

  // close drawer function
  const onClose = () => {
    clear(); // clear form
    setRoomId(0); // cancel editing status
    setOpen(false); // close drawer
  };

  // form submit function
  const onFinish = (values) => {
    if (roomId) {
      // edit
      $update(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: 'Edited Successfully' });
          loadList(); // load role list
        } else {
          setNotiMsg({ type: "error", description: 'Edit Error' });
        }
      });
    } else {
      // add
      $add(values).then(({ success, message }) => {
        if (success) {
          setNotiMsg({ type: "success", description: 'Added Successfully'});
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
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title={roomId ? "Edit Room" : "Add Room"}
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
          <Form.Item label="Id" name="id" hidden>
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
            <Select size="small" style={{ width: "200px" }} options={typeList} />
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
            <Select size="small" style={{ width: "200px" }} options={stateList} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {roomId ? "Edit" : "Add"}
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

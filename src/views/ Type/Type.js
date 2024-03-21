import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { $list } from "../../api/typeApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import AddType from "./AddType";

export default function Type() {
  // // roleId editing status
  // let [roleId,setRoleId] = useState(0)
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // room type list data
  let [typeList, setTypeList] = useState([]);
  useEffect(() => {
    loadlist();
  }, []);
  // Load role list
  const loadlist = () => {
    $list().then((data) => {
      data = data.map((r) => {
        return {
          ...r,
          key: r.roomTypeId,
        };
      });
      setTypeList(data);
    });
  };
  // // edit role function
  // const edit = (roleId)=>{
  //   setOpen(true)   // open drawer
  //   setRoleId(roleId)  // set roldId to be editing status
  // }
  // // del role function
  // const del = (roleId) => {
  //   $del({ roleId }).then(({ success, message }) => {
  //     if (success) {
  //       setNotiMsg({ type: "success", description: message });
  //       loadlist();
  //     } else {
  //       setNotiMsg({ type: "error", description: message });
  //     }
  //   });
  // };
  const columns = [
    {
      title: "Room Type Id",
      dataIndex: "roomTypeId",
      width: "100px",
    },
    {
      title: "Room Type Name",
      dataIndex: "roomTypeName",
      width: "200px",
    },
    {
      title: "Room Type Price",
      dataIndex: "roomTypePrice",
      width: "200px",
    },
    {
      title: "Bed Number",
      dataIndex: "bedNum",
      width: "100px",
    },
    {
      title: "Action",
      key: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ borderColor: "orange", color: "orange" }}
            onClick={() => {
              edit(ret.roleId);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Notion"
            description="Are you sure to delete"
            onConfirm={() => {
              del(ret.roleId);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: "5px" }} danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="search">
        <Button
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table size="small" dataSource={typeList} columns={columns} />
      <AddType open={open} setOpen={setOpen} loadList={loadList} roomTypeId={roomTypeId} setRoomTypeId={setRoomTypeId} />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
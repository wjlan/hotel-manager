import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { $list,$del } from "../../api/typeApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import AddType from "./AddType";

export default function Type() {
  // // room type Id editing status
  let [roomTypeId,setRoomTypeId] = useState(0)
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // room type list data
  let [typeList, setTypeList] = useState([]);
  useEffect(() => {
    loadList();
  }, []);
  // Load room type list
  const loadList = () => {
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
  // edit room type function
  const edit = (roomTypeId)=>{
    setOpen(true)   // open drawer
    setRoomTypeId(roomTypeId)  // set roomTypeId to be editing status
  }
  // del room type function
  const del = (roomTypeId) => {
    $del({ roomTypeId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList(); 
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
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
              edit(ret.roomTypeId);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Notion"
            description="Are you sure to delete"
            onConfirm={() => {
              del(ret.roomTypeId);
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
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { $list, $del } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";
import AddRole from "./AddRole";

export default function Role() {
  // roleId editing status
  let [roleId,setRoleId] = useState(0)
  // notification box status
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // roleList data
  let [roleList, setRoleList] = useState([]);
  useEffect(() => {
    loadlist();
  }, []);
  // Load role list
  const loadlist = () => {
    $list().then((data) => {
      data = data.map((r) => {
        return {
          ...r,
          key: r.roleId,
        };
      });
      setRoleList(data);
    });
  };
  // edit role function
  const edit = (roleId)=>{
    setOpen(true)   // open drawer
    setRoleId(roleId)  // set roldId to be editing status
  }
  // del role function
  const del = (roleId) => {
    $del({ roleId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadlist();
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
  const columns = [
    {
      title: "Role Id",
      dataIndex: "roleId",
      width: "100px",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      width: "200px",
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
            编辑
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
              Cancel
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
      <Table size="small" dataSource={roleList} columns={columns} />
      <AddRole open={open} setOpen={setOpen} loadlist={loadlist} roleId={roleId} setRoleId={setRoleId}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}

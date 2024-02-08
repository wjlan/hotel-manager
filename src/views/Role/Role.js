import React, { useEffect, useState } from "react";
import { Table, Button, Drawer, Form, Input } from "antd";
import { $list } from "../../api/RoleApi";
import AddRole from "./AddRole";

export default function Role() {
  
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
  const columns = [
    {
      title: "Role Id",
      dataIndex: "roleId",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
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
      <AddRole open={open} setOpen={setOpen} loadlist={loadlist}/>
    </>
  );
}

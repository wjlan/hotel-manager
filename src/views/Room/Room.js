import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Pagination, Select, Tag } from "antd";
import { $list } from "../../api/roomApi";
import {$list as $typeList} from '../../api/typeApi'
import {$listToUpdate as $stateList} from '../../api/stateApi'
import MyNotification from "../../components/MyNotification/MyNotification";
import AddRoom from './AddRoom'

export default function Room() {
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
      data.unshift({value:0,label:'Please Select a Room Type'})
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
      data.unshift({value:0,label:'Please Select Room State'})
      setStateList(data);
    })
  }
  // room type id for filtering list data
  let [roomTypeId,setRoomTypeId] = useState(0)
  // room state id for filtering list data
  let [roomStateId,setRoomStateId] = useState(0)
  // count data rows
  let [count,setCount] = useState(1)
  // Page
  let [pageIndex,setPageIndex] = useState(1)
  // notification
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  // loginId editing status
  let [roomId,setRoomId] = useState(0)
  // check drawer open or not
  const [open, setOpen] = useState(false);
  // room list data
  let [roomList, setRoomList] = useState([]);
  // table
  const columns = [
    {
      title: "Room Id",
      dataIndex: "roomId",
      width: "100px",
    },
    {
      title: "Room Type",
      dataIndex: "roomTypeName",
      width: "150px",
    },
    {
      title: "Roome Price",
      dataIndex: "roomTypePrice",
      width: "150px",
    },
    {
      title: "Bed Number",
      dataIndex: "bedNum",
      width: "150px",
    },
    {
      title: "Room State",
      dataIndex: "roomStateName",
      width: "150px",
      render: (roomStateName) => (
        <Tag color={roomStateName==='Empty'?'lightgreen':(roomStateName==='Maitenance'?'lightsalmon':'lightcoral')}>
          {roomStateName}
        </Tag>
      )
    },
   
    {
      title: "Action",
      dataIndex: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ borderColor: "orange", color: "orange" }}
            onClick={()=>{
              edit(ret.loginId)
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Notion"
            description="Are you sure to delete"
            onConfirm={() => {
              del(ret.id, ret.photo);
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
  // // edit admin function
  // const edit = (loginId)=>{
  //   setOpen(true)  
  //   setLoginId(loginId)  
  // }
  // // delete admin function
  // const del = (id,photo) => {
  //   $del({ id,photo }).then(({ success, message }) => {
  //     if (success) {
  //       setNotiMsg({ type: "success", description: message });
  //       loadList(); 
  //     } else {
  //       setNotiMsg({ type: "error", description: message });
  //     }
  //   });
  // };
  // Load admin list
  const loadList = () => {
    $list({roomTypeId,roomStateId,pageSize:10,pageIndex}).then(({data,count}) => {
      data = data.map((r) => {
        return {
          key: r.roomId,
          roomId:r.roomId,
          roomTypeName:r.roomType.roomTypeName,
          roomTypePrice:r.roomType.roomTypePrice,
          bedNum:r.roomType.bedNum,
          roomStateName:r.roomState.roomStateName,
        };
      });
      setRoomList(data);
      setCount(count)
    });
  };
  useEffect(() => {
    loadTypeList()  // load room type list data
    loadStateList()   // load room state list data
    loadList();   
  }, [pageIndex]);
  return (
    <>
      <div className="search">
      <span>Type:</span>
      <Select size='small' style={{width:'200px'}} options={typeList} defaultValue={0} onSelect={(value)=>{
          setRoomTypeId(value)
        }}></Select>
      <span style={{marginLeft:'5px'}}>State:</span>
        <Select size='small' style={{width:'200px'}} options={stateList} defaultValue={0} onSelect={(value)=>{
          setRoomStateId(value)
        }}></Select>
      <Button type="primary" style={{marginLeft:'5px'}} size='small' onClick={loadList}>Search</Button>
      <Button
        style={{marginLeft:'5px'}}
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </Button>
      </div>
      <Table size="small" dataSource={roomList} columns={columns} pagination={false} />
      <Pagination style={{marginTop:'5px'}} size='small' defaultCurrent={pageIndex} 
      total={count} pageSize={10} onChange={(page)=>{setPageIndex(page)}}/>
      <AddRoom open={open} setOpen={setOpen} loadList={loadList} roomId={roomId} setRoomId={setRoomId}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}

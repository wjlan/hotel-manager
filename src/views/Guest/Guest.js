import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Pagination, Select, Tag, Input } from "antd";
import { $list, $del } from "../../api/guestApi";
import { $list as $resideList } from '../../api/resideApi'
import MyNotification from "../../components/MyNotification/MyNotification";
// import AddRoom from './AddRoom'

export default function Guest() {
  // reside state list
  let [resideList, setResideList] = useState([]);
  // load reside state list
  const loadStateList = ()=>{
    $resideList().then((data)=>{
      data = data.map((r) => {
        return {
          value:r.resideStateId,
          label:r.resideStateName
        };
      });
      data.unshift({value:0,label:'Please Select Reside State'})
      setResideList(data);
    })
  }
  // guest name for filtering list data
  let [guestName,setGuestName] = useState(null)
  // reside state id for filtering list data
  let [resideStateId,setResideStateId] = useState(0)
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
  // guest list data
  let [guestList, setGuestList] = useState([]);
  // table
  const columns = [
    {
      title: "Name",
      dataIndex: "guestName",
      width: "80px",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "100px",
    },
    {
      title: "Identity Id",
      dataIndex: "identityId",
      width: "120px",
    },
    {
      title: "Room Id",
      dataIndex: "roomId",
      width: "80px",
    },
    {
      title: "Room Type",
      dataIndex: "roomTypeName",
      width: "100px",
    },
    {
      title: "Room Price",
      dataIndex: "roomTypePrice",
      width: "80px",
    },
    {
      title: "Bed Number",
      dataIndex: "bedNum",
      width: "80px",
    },
    {
      title: "Reside Date",
      dataIndex: "resideDate",
      width: "100px",
    },
    {
      title: "Leave Date",
      dataIndex: "leaveDate",
      width: "100px",
    },
    {
      title: "Deposit",
      dataIndex: "deposit",
      width: "80px",
    },
    {
      title: "Total Price",
      dataIndex: "totalMoney",
      width: "80px",
    },
    {
      title: "Guest Number",
      dataIndex: "guestNum",
      width: "80px",
    },
    {
      title: "Reside State",
      dataIndex: "resideStateName",
      width: "80px",
      render: (resideStateName) => (
        <Tag color={resideStateName==='Checked Out'?'lightgreen':'lightcoral'}>
          {resideStateName}
        </Tag>
      )
    },
   
    {
      title: "Action",
      dataIndex: "action",
      render: (ret) => {
        return (
          ret.resideStateName==='Checked Out'?
          <Popconfirm
              title="Notion"
              description="Are you sure to delete"
              onConfirm={() => {
                del(ret.roomId);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: "5px" }} danger size="small">
                Delete
              </Button>
            </Popconfirm>
          :
          <>
            <Button
              size="small"
              style={{ borderColor: "orange", color: "orange" }}
              onClick={()=>{
                edit(ret.roomId)
              }}
            >
              Edit
            </Button>
            <Button size="small" style={{marginLeft:'5px',borderColor:'lightseagreen',color:'lightseagreen'}}>Checkout</Button>
          </>
        )
      },
    },
  ];
  // edit admin function
  const edit = (roomId)=>{
    setOpen(true)  
    setRoomId(roomId)  
  }
  // delete admin function
  const del = (roomId) => {
    $del({ roomId }).then(({ success, message }) => {
      if (success) {
        setNotiMsg({ type: "success", description: message });
        loadList(); 
      } else {
        setNotiMsg({ type: "error", description: message });
      }
    });
  };
  // Load guest list
  const loadList = () => {
    $list({pageSize:10,pageIndex,guestName,resideStateId}).then(({data,count}) => {
      // console.log(data)
      data = data.map((r) => {
        return {
          key: r.guestId,
          guestId:r.guestId,
          identityId:r.identityId,
          guestName:r.guestName,
          phone:r.phone,
          roomId:r.roomId,
          roomTypeName:r.room.roomType.roomTypeName,
          roomTypePrice:r.room.roomType.roomTypePrice,
          bedNum:r.room.roomType.bedNum,
          resideDate:r.resideDate,
          leaveDate:r.leaveDate,
          deposit:r.deposit,
          totalMoney:r.totalMoney,
          guestNum:r.guestNum,
          resideStateName:r.resideState.resideStateName
        };
      });
      setGuestList(data);
      setCount(count)
    });
  };
  useEffect(() => {
    loadStateList()   // load room state list data
    loadList();   
  }, [pageIndex]);
  return (
    <>
      <div className="search">
      <span>Guest Name:</span>
      <Input value={guestName} onChange={(e)=>{setGuestName(e.target.value)}} size='small' style={{width:'200px'}}/>
      <span style={{marginLeft:'5px'}}>Reside State:</span>
      <Select size='small' style={{width:'200px'}} options={resideList} defaultValue={0} onSelect={(value)=>{
          setResideStateId(value)
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
      <Table size="small" dataSource={guestList} columns={columns} pagination={false} />
      <Pagination style={{marginTop:'5px'}} size='small' defaultCurrent={pageIndex} 
      total={count} pageSize={10} onChange={(page)=>{setPageIndex(page)}}/>
      {/* <AddRoom open={open} setOpen={setOpen} loadList={loadList} roomId={roomId} setRoomId={setRoomId}/> */}
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
